from pydantic import BaseModel, ConfigDict, Field

class RegisterIn(BaseModel):
    username: str = Field(min_length=3, max_length=80, pattern=r"^[a-zA-Z0-9_-]+$")
    password: str = Field(min_length=10, max_length=128)

class UserOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    username: str
    role: str

class TokenOut(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int = 900

class RefreshIn(BaseModel):
    refresh_token: str = Field(min_length=32)

class ItemCreate(BaseModel):
    name: str = Field(min_length=2, max_length=160)
    price: float = Field(gt=0, allow_inf_nan=False)

class ItemPatch(BaseModel):
    name: str | None = Field(default=None, min_length=2, max_length=160)
    price: float | None = Field(default=None, gt=0, allow_inf_nan=False)

class ItemOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str
    price: float
    owner_id: int
