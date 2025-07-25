from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class PostBase(BaseModel):
    title: str
    content: str
    category: Optional[str] = None

class PostCreate(PostBase):
    pass

class PostResponse(PostBase):
    id: int
    author_id: Optional[int]
    author_wallet: Optional[str]
    created_at: datetime
    updated_at: datetime
    ipfs_hash: Optional[str]
    icp_tx: Optional[str]
    comments: Optional[List['CommentResponse']] = []
    like_count: int

    class Config:
        orm_mode = True

class CommentBase(BaseModel):
    content: str

class CommentCreate(CommentBase):
    pass

class CommentResponse(CommentBase):
    id: int
    post_id: int
    author_id: Optional[int]
    author_wallet: Optional[str]
    created_at: datetime
    updated_at: datetime
    ipfs_hash: Optional[str]
    icp_tx: Optional[str]
    like_count: int

    class Config:
        orm_mode = True

PostResponse.update_forward_refs() 