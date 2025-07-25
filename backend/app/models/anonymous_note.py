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

class NoteReply(BaseModel):
    id: int
    note_id: int
    sender_id: Optional[int] = None
    content: str
    created_at: datetime
    ipfs_hash: Optional[str] = None
    icp_tx: Optional[str] = None

class NoteReaction(BaseModel):
    id: int
    note_id: int
    user_id: int
    reaction: str
    created_at: datetime 