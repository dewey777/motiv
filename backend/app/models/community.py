from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class PostBase(BaseModel):
    title: str
    content: str
    is_anonymous: bool = True

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

    class Config:
        from_attributes = True

class CommentBase(BaseModel):
    content: str
    is_anonymous: bool = True

class CommentCreate(CommentBase):
    post_id: int

class Comment(CommentBase):
    id: int
    post_id: int
    author_id: Optional[int] = None
    author_wallet: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    like_count: int = 0

    class Config:
        from_attributes = True 