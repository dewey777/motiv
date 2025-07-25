from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException, status
from jose import JWTError, jwt
import time

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"


def verify_signature(wallet_address: str, signature: str, message: str) -> bool:
    """
    실제로는 지갑 서명 검증 로직 필요.
    여기서는 항상 True 반환 (테스트용)
    """
    return True


def create_access_token(data: dict, expires_delta: int = 3600):
    """
    JWT 액세스 토큰 생성
    """
    to_encode = data.copy()
    expire = int(time.time()) + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def get_current_user(token: str = Depends(oauth2_scheme)):
    """
    JWT 토큰에서 사용자 정보 추출
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="인증 정보가 유효하지 않습니다.")
        return {"id": user_id, "wallet_address": payload.get("wallet_address")}
    except JWTError:
        raise HTTPException(status_code=401, detail="토큰이 유효하지 않습니다.") 