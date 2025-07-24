# 에이전트 라우터
from fastapi import APIRouter, HTTPException
from app.models.consultation import Consultation, ConsultationCreate
from app.core.ipfs import upload_to_ipfs
from app.core.icp import upload_to_icp
from datetime import datetime

router = APIRouter(prefix="/agent", tags=["agent"])

consultations = []

@router.post("/ask", response_model=Consultation)
def ask_agent(consult: ConsultationCreate):
    # 실제로는 AI 모델 호출 및 응답 생성 필요
    ai_response = "AI 답변 예시"
    ipfs_hash = upload_to_ipfs(consult.dict())
    icp_tx = upload_to_icp(ipfs_hash)
    new_consult = Consultation(
        id=len(consultations)+1,
        user_id=consult.user_id,
        message=consult.message,
        created_at=datetime.utcnow(),
        ai_response=ai_response,
        swarm_agents_used=[],
        risk_level=None,
        ipfs_hash=ipfs_hash,
        icp_tx=icp_tx
    )
    consultations.append(new_consult)
    return new_consult 