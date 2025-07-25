# 인증 라우터
from fastapi import APIRouter, HTTPException
from app.models.user import UserLogin
from app.core.logging import log_user_action
from app.core.auth import verify_signature, create_access_token
from datetime import datetime

router = APIRouter(prefix="/auth", tags=["authentication"])

@router.post("/login")
async def login_user(login_data: UserLogin):
    """
    ICP 지갑 로그인: 서명 검증 후 JWT 발급 (회원가입 불필요)
    """
    try:
        log_user_action("user_login_attempt", wallet_address=login_data.wallet_address, details={})
        if not verify_signature(login_data.wallet_address, login_data.signature, login_data.message):
            log_user_action("user_login_invalid_signature", wallet_address=login_data.wallet_address, details={})
            raise HTTPException(status_code=401, detail="Invalid signature")
        # Principal ID(지갑 주소)만 JWT에 포함
        access_token = create_access_token(data={"sub": login_data.wallet_address})
        log_user_action("user_login_success", wallet_address=login_data.wallet_address, details={})
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "wallet_address": login_data.wallet_address
        }
    except Exception as e:
        log_user_action("user_login_error", wallet_address=login_data.wallet_address, details={"error": str(e)})
        raise HTTPException(status_code=500, detail="Login failed") 