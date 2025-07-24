# 채팅 라우터
from fastapi import APIRouter, HTTPException, Depends
from app.models.consultation import ChatMessage, PersonalInfo
from app.core.ipfs import upload_to_ipfs
from app.core.icp import upload_to_icp
from datetime import datetime
from typing import List

router = APIRouter(prefix="/chat", tags=["chat"])

chat_messages = []
personal_infos = {}

@router.post("/start")
def start_chat(info: PersonalInfo):
    ipfs_hash = upload_to_ipfs(info.dict())
    icp_tx = upload_to_icp(ipfs_hash)
    personal_infos[info.user_id] = info.dict() | {"ipfs_hash": ipfs_hash, "icp_tx": icp_tx}
    return {"result": "ok", "ipfs_hash": ipfs_hash, "icp_tx": icp_tx}

@router.post("/message", response_model=ChatMessage)
def send_message(msg: ChatMessage):
    ipfs_hash = upload_to_ipfs(msg.dict())
    icp_tx = upload_to_icp(ipfs_hash)
    msg.ipfs_hash = ipfs_hash
    msg.icp_tx = icp_tx
    chat_messages.append(msg)
    return msg

@router.get("/history", response_model=List[ChatMessage])
def get_history(user_id: int):
    return [m for m in chat_messages if m.user_id == user_id] 