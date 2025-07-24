from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class PostBase(BaseModel):
    title: str
    content: str
    is_anonymous: bool = True
    category: Optional[str] = None  # 카테고리 추가

class PostCreate(PostBase):
    pass

class Post(PostBase):
    id: int
    author_id: Optional[int] = None
    author_wallet: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    view_count: int = 0
    like_count: int = 0
    ipfs_hash: Optional[str] = None  # IPFS 해시
    icp_tx: Optional[str] = None     # ICP 트랜잭션 정보

    class Config:
        from_attributes = True

class CommentBase(BaseModel):
    content: str
    is_anonymous: bool = True

class CommentCreate(CommentBase):
    pass

class Comment(CommentBase):
    id: int
    post_id: int
    author_id: Optional[int] = None
    author_wallet: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    like_count: int = 0
    ipfs_hash: Optional[str] = None  # IPFS 해시
    icp_tx: Optional[str] = None     # ICP 트랜잭션 정보

    class Config:
        from_attributes = True 