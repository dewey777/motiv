from fastapi import APIRouter, HTTPException, Depends
from app.models.user import UserCreate, User, UserLogin
from app.core.logging import log_user_action
from app.core.auth import verify_signature, create_access_token
from typing import Dict
import json
from datetime import datetime

router = APIRouter(prefix="/auth", tags=["authentication"])

# 임시 사용자 저장소 (실제로는 데이터베이스 사용)
users_db: Dict[str, User] = {}

@router.post("/register", response_model=User)
async def register_user(user: UserCreate):
    """메타마스크 주소로 사용자 회원가입"""
    try:
        # 지갑 주소 중복 확인
        if user.wallet_address in users_db:
            raise HTTPException(status_code=400, detail="Wallet address already registered")
        
        # 새 사용자 생성
        new_user = User(
            id=len(users_db) + 1,
            wallet_address=user.wallet_address,
            username=user.username,
            created_at=datetime.utcnow()
        )
        
        users_db[user.wallet_address] = new_user
        
        # 로그 기록
        log_user_action(
            action="user_register",
            wallet_address=user.wallet_address,
            details={"username": user.username}
        )
        
        return new_user
        
    except Exception as e:
        log_user_action(
            action="user_register_error",
            wallet_address=user.wallet_address,
            details={"error": str(e)}
        )
        raise HTTPException(status_code=500, detail="Registration failed")

@router.post("/login")
async def login_user(login_data: UserLogin):
    """메타마스크 서명으로 로그인"""
    try:
        # 서명 검증
        if not verify_signature(login_data.wallet_address, login_data.signature, login_data.message):
            raise HTTPException(status_code=401, detail="Invalid signature")
        
        # 사용자 확인
        user = users_db.get(login_data.wallet_address)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        # 액세스 토큰 생성
        access_token = create_access_token(data={"sub": login_data.wallet_address})
        
        # 로그 기록
        log_user_action(
            action="user_login",
            wallet_address=login_data.wallet_address,
            details={"success": True}
        )
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": user
        }
        
    except Exception as e:
        log_user_action(
            action="user_login_error",
            wallet_address=login_data.wallet_address,
            details={"error": str(e)}
        )
        raise HTTPException(status_code=500, detail="Login failed") 