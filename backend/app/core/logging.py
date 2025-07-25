import logging
import json

# 로깅 설정 (콘솔에 출력, 필요시 파일로도 가능)
logging.basicConfig(level=logging.INFO, format='%(asctime)s %(levelname)s %(message)s')
logger = logging.getLogger("motiv")

def log_user_action(action: str, wallet_address: str, details: dict = None):
    """
    사용자 액션 및 에러 로깅 함수
    """
    log_msg = {
        "action": action,
        "wallet_address": wallet_address,
        "details": details or {}
    }
    logger.info(json.dumps(log_msg, ensure_ascii=False)) 