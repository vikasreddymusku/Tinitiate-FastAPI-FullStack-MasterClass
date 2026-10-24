"""Demonstration-grade user auth: Argon2 hash, JWT access, opaque rotating refresh."""
import hashlib
import os
import secrets
from datetime import datetime, timedelta, timezone
import jwt
from argon2 import PasswordHasher
from argon2.exceptions import VerificationError
from fastapi import Depends, HTTPException, Security, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy import select
from sqlalchemy.orm import Session
from .db import get_db
from .models import RefreshToken, User

ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
SECRET_KEY = os.getenv("JWT_SECRET", "LOCAL-DEVELOPMENT-ONLY-CHANGE-ME")
if ENVIRONMENT == "production" and SECRET_KEY == "LOCAL-DEVELOPMENT-ONLY-CHANGE-ME":
    raise RuntimeError("Set a secure JWT_SECRET before starting production")
ALGORITHM = "HS256"  # server-enforced allowlist; never trust JWT alg header as source of truth
ISSUER = "tinitiate-fastapi-example"
AUDIENCE = "tinitiate-fullstack-frontend"
ACCESS_MINUTES = 15
REFRESH_DAYS = 7
ph = PasswordHasher()
oauth2 = OAuth2PasswordBearer(tokenUrl="/auth/token")


def password_hash(plain: str) -> str:
    return ph.hash(plain)


def verify_password(plain: str, hashed: str) -> bool:
    try:
        return ph.verify(hashed, plain)
    except VerificationError:
        return False


def new_access_token(user: User) -> str:
    now = datetime.now(timezone.utc)
    claims = {
        "sub": str(user.id), "role": user.role, "iss": ISSUER, "aud": AUDIENCE,
        "iat": now, "nbf": now, "exp": now + timedelta(minutes=ACCESS_MINUTES),
    }
    return jwt.encode(claims, SECRET_KEY, algorithm=ALGORITHM)


def refresh_hash(value: str) -> str:
    return hashlib.sha256(value.encode("utf-8")).hexdigest()


def create_refresh_token(db: Session, user: User) -> str:
    value = secrets.token_urlsafe(48)
    expires = datetime.now(timezone.utc).replace(tzinfo=None) + timedelta(days=REFRESH_DAYS)
    db.add(RefreshToken(token_hash=refresh_hash(value), user_id=user.id, expires_at=expires))
    return value


def get_current_user(token: str = Depends(oauth2), db: Session = Depends(get_db)) -> User:
    challenge = {"WWW-Authenticate": "Bearer"}
    try:
        claims = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM], issuer=ISSUER, audience=AUDIENCE,
                            options={"require": ["sub", "exp", "iat", "nbf", "iss", "aud"]})
        user_id = int(claims["sub"])
    except (jwt.PyJWTError, ValueError, KeyError, TypeError):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Invalid or expired access token", headers=challenge)
    user = db.get(User, user_id)
    if user is None:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Account no longer exists", headers=challenge)
    return user


def require_admin(user: User = Depends(get_current_user)) -> User:
    if user.role != "admin":
        raise HTTPException(status.HTTP_403_FORBIDDEN, "Admin role required")
    return user
