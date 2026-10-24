"""A runnable React ↔ FastAPI ↔ SQLAlchemy full-stack learning example."""
import os
from contextlib import asynccontextmanager
from datetime import datetime, timezone
from fastapi import Depends, FastAPI, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy import select, text
from sqlalchemy.orm import Session
from .db import Base, engine, get_db
from . import models  # noqa: F401: register models before metadata create
from .models import Item, RefreshToken, User
from .schemas import RegisterIn, UserOut, TokenOut, RefreshIn, ItemCreate, ItemPatch, ItemOut
from .security import (get_current_user, require_admin, password_hash, verify_password,
                       new_access_token, create_refresh_token, refresh_hash, ACCESS_MINUTES)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Teaching convenience; for production, use Alembic migrations instead.
    Base.metadata.create_all(bind=engine)
    yield

app = FastAPI(title="Tinitiate FastAPI Full-Stack Example", version="1.0", lifespan=lifespan)
allowed_origins = [x.strip() for x in os.getenv("FRONTEND_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173").split(",") if x.strip()]
app.add_middleware(CORSMiddleware, allow_origins=allowed_origins, allow_credentials=False,
                   allow_methods=["GET", "POST", "PATCH", "DELETE"], allow_headers=["Authorization", "Content-Type"])

@app.get("/health", tags=["Operations"])
def health():
    return {"status": "ok"}

@app.get("/ready", tags=["Operations"])
def ready(db: Session = Depends(get_db)):
    try:
        db.execute(text("SELECT 1"))
    except Exception:
        raise HTTPException(503, "Database unavailable")
    return {"status": "ready"}

@app.post("/auth/register", response_model=UserOut, status_code=201, tags=["Authentication"])
def register(payload: RegisterIn, db: Session = Depends(get_db)):
    username = payload.username.lower()
    if db.scalar(select(User).where(User.username == username)):
        raise HTTPException(409, "Username is already taken")
    user = User(username=username, password_hash=password_hash(payload.password), role="viewer")
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

@app.post("/auth/token", response_model=TokenOut, tags=["Authentication"])
def login(form: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.scalar(select(User).where(User.username == form.username.lower()))
    if user is None or not verify_password(form.password, user.password_hash):
        raise HTTPException(401, "Incorrect username or password", headers={"WWW-Authenticate": "Bearer"})
    refresh = create_refresh_token(db, user)
    db.commit()
    return TokenOut(access_token=new_access_token(user), refresh_token=refresh, expires_in=ACCESS_MINUTES*60)

@app.post("/auth/refresh", response_model=TokenOut, tags=["Authentication"])
def rotate_refresh(payload: RefreshIn, db: Session = Depends(get_db)):
    now = datetime.now(timezone.utc).replace(tzinfo=None)
    record = db.scalar(select(RefreshToken).where(RefreshToken.token_hash == refresh_hash(payload.refresh_token)))
    if record is None or record.revoked or record.expires_at <= now:
        raise HTTPException(401, "Invalid, expired, revoked or reused refresh token")
    user = db.get(User, record.user_id)
    if user is None:
        raise HTTPException(401, "Account no longer exists")
    record.revoked = True
    new_refresh = create_refresh_token(db, user)
    db.commit()
    return TokenOut(access_token=new_access_token(user), refresh_token=new_refresh, expires_in=ACCESS_MINUTES*60)

@app.post("/auth/logout", status_code=204, tags=["Authentication"])
def logout(payload: RefreshIn, db: Session = Depends(get_db)):
    record = db.scalar(select(RefreshToken).where(RefreshToken.token_hash == refresh_hash(payload.refresh_token)))
    if record is not None:
        record.revoked = True
        db.commit()
    return None

@app.get("/auth/me", response_model=UserOut, tags=["Authentication"])
def me(user: User = Depends(get_current_user)):
    return user

@app.get("/api/items", response_model=list[ItemOut], tags=["Items"])
def list_items(limit: int = Query(default=50, ge=1, le=100), offset: int = Query(default=0, ge=0),
               user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # Every query is constrained to the authenticated owner; no IDOR/BOLA.
    return db.scalars(select(Item).where(Item.owner_id == user.id).order_by(Item.id).limit(limit).offset(offset)).all()

@app.post("/api/items", response_model=ItemOut, status_code=201, tags=["Items"])
def create_item(payload: ItemCreate, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    item = Item(name=payload.name, price=payload.price, owner_id=user.id)
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

def _owned_item(db: Session, item_id: int, owner_id: int) -> Item:
    item = db.get(Item, item_id)
    # Keep status 404 to avoid revealing another user's object IDs.
    if item is None or item.owner_id != owner_id:
        raise HTTPException(404, "Item not found")
    return item

@app.get("/api/items/{item_id}", response_model=ItemOut, tags=["Items"])
def get_item(item_id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return _owned_item(db, item_id, user.id)

@app.patch("/api/items/{item_id}", response_model=ItemOut, tags=["Items"])
def update_item(item_id: int, payload: ItemPatch, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    item = _owned_item(db, item_id, user.id)
    for key, value in payload.model_dump(exclude_unset=True).items():
        if value is None:
            raise HTTPException(422, f"{key} cannot be null")
        setattr(item, key, value)
    db.commit()
    db.refresh(item)
    return item

@app.delete("/api/items/{item_id}", status_code=204, tags=["Items"])
def delete_item(item_id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    db.delete(_owned_item(db, item_id, user.id))
    db.commit()
    return None

@app.get("/api/admin/users", response_model=list[UserOut], tags=["Admin"])
def list_users(admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    return db.scalars(select(User).order_by(User.id)).all()
