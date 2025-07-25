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
    ipfs_hash: Optional[str] = None  # IPFS 해시
    icp_tx: Optional[str] = None     # ICP 트랜잭션 정보

    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    wallet_address: str
    signature: str
    message: str 