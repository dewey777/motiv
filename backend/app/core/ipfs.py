# IPFS 연동 스켈레톤
from typing import Any

def upload_to_ipfs(data: Any) -> str:
    """
    data(dict 또는 str 등)을 IPFS에 업로드하고 해시값을 반환합니다.
    실제 구현은 IPFS HTTP API, py-ipfs-http-client 등 사용 필요.
    IPFS 연동이 실패하거나 주석처리되어도 API는 정상 동작합니다.
    """
    try:
        # 실제 연동 코드 예시 (주석처리해도 무방)
        # import ipfshttpclient
        # client = ipfshttpclient.connect('/dns/localhost/tcp/5001/http')
        # res = client.add_json(data)
        # return res
        ipfs_hash = "Qm..."  # 실제 해시로 대체
        return ipfs_hash
    except Exception as e:
        # IPFS 연동 실패 시 None 반환
        return None 