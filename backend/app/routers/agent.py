# 에이전트 라우터
from fastapi import APIRouter, HTTPException
from app.models.consultation import Consultation, ConsultationCreate
from app.core.ipfs import upload_to_ipfs
from app.core.icp import upload_to_icp
from app.core.logging import log_user_action
from datetime import datetime

router = APIRouter(prefix="/agent", tags=["agent"])

consultations = []

@router.post("/ask", response_model=Consultation)
def ask_agent(consult: ConsultationCreate):
    """
    상담 요청: 사용자의 질문을 IPFS/ICP에 기록하고 모든 주요 단계에 로그를 남김
    """
    try:
        log_user_action("consultation_request", wallet_address="unknown", details={"user_id": consult.user_id, "message": consult.message})
        ipfs_hash = upload_to_ipfs(consult.dict())
        log_user_action("ipfs_upload", wallet_address="unknown", details={"ipfs_hash": ipfs_hash})
        icp_tx = upload_to_icp(ipfs_hash)
        log_user_action("icp_upload", wallet_address="unknown", details={"icp_tx": icp_tx})
        new_consult = Consultation(
            id=len(consultations)+1,
            user_id=consult.user_id,
            message=consult.message,
            created_at=datetime.utcnow(),
            ai_response=None,  # AI 응답 없음
            swarm_agents_used=[],
            risk_level=None,
            ipfs_hash=ipfs_hash,
            icp_tx=icp_tx
        )
        consultations.append(new_consult)
        log_user_action("consultation_saved", wallet_address="unknown", details={"consultation_id": new_consult.id})
        return new_consult
    except Exception as e:
        log_user_action("consultation_error", wallet_address="unknown", details={"error": str(e)})
        raise HTTPException(status_code=500, detail=f"상담 요청 처리 중 오류 발생: {str(e)}") 