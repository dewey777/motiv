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