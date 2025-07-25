from fastapi import FastAPI
from app.routers import community, auth, chat, anonymous_note, agent

app = FastAPI()

# 각 도메인별 라우터 등록
app.include_router(community.router)
app.include_router(auth.router)
app.include_router(chat.router)
app.include_router(anonymous_note.router)
app.include_router(agent.router)

@app.get("/")
def read_root():
    """
    헬스 체크 및 안내 메시지
    """
    return {"message": "Motiv API 서버입니다. /docs에서 API 문서를 확인하세요."} 