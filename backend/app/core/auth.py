from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException, status
from jose import JWTError, jwt

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"

def get_current_user(token: str = Depends(oauth2_scheme)):
    """
    JWT 토큰에서 사용자 정보 추출
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="인증 정보가 유효하지 않습니다.")
        # 실제로는 DB에서 사용자 조회
        return {"id": user_id, "wallet_address": payload.get("wallet_address")}
    except JWTError:
        raise HTTPException(status_code=401, detail="토큰이 유효하지 않습니다.") 