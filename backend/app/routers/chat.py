# 채팅 라우터
from fastapi import APIRouter, HTTPException, Depends
from app.models.consultation import ChatMessage, PersonalInfo
from app.core.ipfs import upload_to_ipfs
from app.core.icp import upload_to_icp
from app.core.logging import log_user_action
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
    log_user_action("chat_start", wallet_address="unknown", details={"user_id": info.user_id, "ipfs_hash": ipfs_hash, "icp_tx": icp_tx})
    return {"result": "ok", "ipfs_hash": ipfs_hash, "icp_tx": icp_tx}

@router.post("/message", response_model=ChatMessage)
def send_message(msg: ChatMessage):
    """
    채팅 메시지 전송: 메시지를 IPFS/ICP에 기록하고 모든 주요 단계에 로그를 남김
    """
    try:
        log_user_action("chat_message_send", wallet_address="unknown", details={"user_id": msg.user_id, "content": msg.content})
        ipfs_hash = upload_to_ipfs(msg.dict())
        log_user_action("ipfs_upload", wallet_address="unknown", details={"ipfs_hash": ipfs_hash})
        icp_tx = upload_to_icp(ipfs_hash)
        log_user_action("icp_upload", wallet_address="unknown", details={"icp_tx": icp_tx})
        msg.ipfs_hash = ipfs_hash
        msg.icp_tx = icp_tx
        chat_messages.append(msg)
        log_user_action("chat_message_saved", wallet_address="unknown", details={"user_id": msg.user_id, "msg_id": msg.id})
        return msg
    except Exception as e:
        log_user_action("chat_message_error", wallet_address="unknown", details={"error": str(e)})
        raise HTTPException(status_code=500, detail=f"채팅 메시지 처리 중 오류 발생: {str(e)}")

@router.get("/history", response_model=List[ChatMessage])
def get_history(user_id: int):
    return [m for m in chat_messages if m.user_id == user_id] 