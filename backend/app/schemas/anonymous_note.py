from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class AnonymousNote(BaseModel):
    id: int
    sender_id: Optional[int] = None
    content: str
    created_at: datetime
    ipfs_hash: Optional[str] = None
    icp_tx: Optional[str] = None
    reactions: List[str] = []

    class Config:
        orm_mode = True

class NoteReply(BaseModel):
    id: int
    note_id: int
    sender_id: Optional[int] = None
    content: str
    created_at: datetime
    ipfs_hash: Optional[str] = None
    icp_tx: Optional[str] = None

    class Config:
        orm_mode = True

class NoteReaction(BaseModel):
    id: int
    note_id: int
    user_id: int
    reaction: str
    created_at: datetime

    class Config:
        orm_mode = True 