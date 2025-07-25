from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class ConsultationBase(BaseModel):
    user_id: int
    message: str

class ConsultationCreate(ConsultationBase):
    pass

class Consultation(ConsultationBase):
    id: int
    created_at: datetime
    ai_response: Optional[str] = None
    swarm_agents_used: List[str] = []
    risk_level: Optional[str] = None
    ipfs_hash: Optional[str] = None  # IPFS 해시
    icp_tx: Optional[str] = None     # ICP 트랜잭션 정보

    class Config:
        from_attributes = True

class SwarmAgentResponse(BaseModel):
    agent_id: str
    agent_type: str
    response: str
    confidence: float
    risk_assessment: Optional[str] = None

class SwarmFinalResponse(BaseModel):
    final_response: str
    agent_responses: List[SwarmAgentResponse]
    consensus_score: float
    risk_level: str 

# 채팅 메시지 모델
class ChatMessage(BaseModel):
    id: int
    user_id: int
    content: str
    created_at: datetime
    ipfs_hash: Optional[str] = None
    icp_tx: Optional[str] = None

# 개인정보 입력 모델
class PersonalInfo(BaseModel):
    user_id: int
    nickname: Optional[str] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    etc: Optional[str] = None 