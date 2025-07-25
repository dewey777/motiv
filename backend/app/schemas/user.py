from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    wallet_address: str
    username: Optional[str] = None

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int
    created_at: datetime
    is_active: bool = True
    ipfs_hash: Optional[str] = None
    icp_tx: Optional[str] = None

    class Config:
        orm_mode = True

class UserLogin(BaseModel):
    wallet_address: str
    signature: str
    message: str 