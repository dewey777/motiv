from fastapi import APIRouter, HTTPException
from app.models.anonymous_note import AnonymousNote, NoteReply, NoteReaction
from app.core.ipfs import upload_to_ipfs
from app.core.icp import upload_to_icp
from datetime import datetime
from typing import List

router = APIRouter(prefix="/anonymous_note", tags=["anonymous_note"])

notes = []
replies = []
reactions = []

@router.post("/send", response_model=AnonymousNote)
def send_note(note: AnonymousNote):
    ipfs_hash = upload_to_ipfs(note.dict())
    icp_tx = upload_to_icp(ipfs_hash)
    note.ipfs_hash = ipfs_hash
    note.icp_tx = icp_tx
    notes.append(note)
    return note

@router.get("/recent", response_model=List[AnonymousNote])
def get_recent():
    return notes[-10:][::-1]

@router.post("/{note_id}/reply", response_model=NoteReply)
def reply_note(note_id: int, reply: NoteReply):
    ipfs_hash = upload_to_ipfs(reply.dict())
    icp_tx = upload_to_icp(ipfs_hash)
    reply.ipfs_hash = ipfs_hash
    reply.icp_tx = icp_tx
    replies.append(reply)
    return reply

@router.post("/{note_id}/react", response_model=NoteReaction)
def react_note(note_id: int, reaction: NoteReaction):
    reactions.append(reaction)
    return reaction 