# 익명 쪽지 라우터
from fastapi import APIRouter, HTTPException
from app.models.anonymous_note import AnonymousNote, NoteReply, NoteReaction
from app.core.ipfs import upload_to_ipfs
from app.core.icp import upload_to_icp
from app.core.logging import log_user_action
from datetime import datetime
from typing import List

router = APIRouter(prefix="/anonymous_note", tags=["anonymous_note"])

notes = []
replies = []
reactions = []

@router.post("/send", response_model=AnonymousNote)
def send_note(note: AnonymousNote):
    try:
        log_user_action("anonymous_note_send", wallet_address="unknown", details={"content": note.content})
        ipfs_hash = upload_to_ipfs(note.dict())
        log_user_action("ipfs_upload", wallet_address="unknown", details={"ipfs_hash": ipfs_hash})
        icp_tx = upload_to_icp(ipfs_hash)
        log_user_action("icp_upload", wallet_address="unknown", details={"icp_tx": icp_tx})
        note.ipfs_hash = ipfs_hash
        note.icp_tx = icp_tx
        notes.append(note)
        log_user_action("anonymous_note_saved", wallet_address="unknown", details={"note_id": note.id})
        return note
    except Exception as e:
        log_user_action("anonymous_note_error", wallet_address="unknown", details={"error": str(e)})
        raise HTTPException(status_code=500, detail=f"쪽지 전송 중 오류 발생: {str(e)}")

@router.get("/recent", response_model=List[AnonymousNote])
def get_recent():
    log_user_action("anonymous_note_recent", wallet_address="unknown", details={"count": len(notes)})
    return notes[-10:][::-1]

@router.post("/{note_id}/reply", response_model=NoteReply)
def reply_note(note_id: int, reply: NoteReply):
    try:
        log_user_action("anonymous_note_reply", wallet_address="unknown", details={"note_id": note_id, "content": reply.content})
        ipfs_hash = upload_to_ipfs(reply.dict())
        log_user_action("ipfs_upload", wallet_address="unknown", details={"ipfs_hash": ipfs_hash})
        icp_tx = upload_to_icp(ipfs_hash)
        log_user_action("icp_upload", wallet_address="unknown", details={"icp_tx": icp_tx})
        reply.ipfs_hash = ipfs_hash
        reply.icp_tx = icp_tx
        replies.append(reply)
        log_user_action("anonymous_note_reply_saved", wallet_address="unknown", details={"reply_id": reply.id})
        return reply
    except Exception as e:
        log_user_action("anonymous_note_reply_error", wallet_address="unknown", details={"error": str(e)})
        raise HTTPException(status_code=500, detail=f"쪽지 답글 중 오류 발생: {str(e)}")

@router.post("/{note_id}/react", response_model=NoteReaction)
def react_note(note_id: int, reaction: NoteReaction):
    try:
        log_user_action("anonymous_note_react", wallet_address="unknown", details={"note_id": note_id, "reaction": reaction.reaction})
        reactions.append(reaction)
        log_user_action("anonymous_note_react_saved", wallet_address="unknown", details={"note_id": note_id, "reaction_id": reaction.id})
        return reaction
    except Exception as e:
        log_user_action("anonymous_note_react_error", wallet_address="unknown", details={"error": str(e)})
        raise HTTPException(status_code=500, detail=f"쪽지 반응 중 오류 발생: {str(e)}") 