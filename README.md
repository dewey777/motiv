# MOTIV 프로젝트 통합 README

## 프로젝트 개요

Motiv는 커뮤니티, 상담, 채팅, 익명 노트 등 다양한 기능을 제공하며, 데이터의 신뢰성과 투명성을 위해 IPFS 및 ICP(Internet Computer Protocol)와 연동되는 Web3 기반 서비스입니다.

---

## 폴더 구조

```
motiv/
├── backend/                # FastAPI 기반 백엔드
│   ├── app/
│   │   ├── routers/        # 주요 API 라우터 (community, chat, agent, anonymous_note, auth)
│   │   ├── api/endpoints/  # 실제 엔드포인트 구현
│   │   ├── core/           # 인증, IPFS, ICP, 로깅 등 핵심 모듈
│   │   ├── models/         # ORM 및 데이터 모델
│   │   ├── schemas/        # Pydantic 스키마
│   │   └── ...             
│   ├── contracts/          # Solidity 스마트 컨트랙트
│   └── requirements.txt    # Python 의존성
├── frontend/               # Next.js 기반 프론트엔드
│   ├── app/                # 페이지 및 라우팅
│   ├── components/         # UI 컴포넌트
│   ├── context/            # 전역 상태 관리
│   ├── hooks/              # 커스텀 훅
│   ├── public/             # 정적 파일
│   └── package.json        # JS 의존성
└── ...
```

---

## 프론트엔드 (Next.js)

- **주요 기술**: Next.js, React 19, TailwindCSS, Dfinity SDK
- **실행 방법**:
  ```bash
  cd frontend
  npm install
  npm run dev
  ```
- **주요 의존성**:  
  - `@dfinity/agent`, `@dfinity/auth-client` 등(ICP 연동)
  - `framer-motion`, `lottie-react` 등(애니메이션)
  - `tailwindcss` (스타일링)
- **기능**:
  - 커뮤니티 게시글/댓글 작성 및 조회
  - 실시간 채팅
  - AI 상담 요청
  - 익명 노트 작성/반응/답글
  - Web3 인증 및 ICP 연동

---

## 백엔드 (FastAPI)

- **주요 기술**: FastAPI, SQLAlchemy, Pydantic, IPFS, ICP 연동
- **실행 방법**:
  ```bash
  cd backend
  pip install -r requirements.txt
  uvicorn app.main:app --reload
  ```
- **주요 의존성**:  
  - `fastapi`, `uvicorn`
- **핵심 기능**:
  - 커뮤니티(게시글/댓글/좋아요)
  - 실시간 채팅
  - AI 상담
  - 익명 노트
  - Web3 인증(JWT, 서명 검증)
  - IPFS/ICP 연동(데이터 해시 및 트랜잭션 기록)

---

## 백엔드 API 엔드포인트 요약

### 인증
- `POST /auth/login` : Web3 지갑 서명 기반 로그인(JWT 발급)

### 커뮤니티
- `POST /community/posts` : 게시글 생성
- `GET /community/posts` : 게시글 목록 조회
- `GET /community/posts/{post_id}` : 게시글 단건 조회
- `PUT /community/posts/{post_id}` : 게시글 수정
- `DELETE /community/posts/{post_id}` : 게시글 삭제
- `POST /community/posts/{post_id}/like` : 게시글 좋아요
- `POST /community/posts/{post_id}/comments` : 댓글 작성
- `GET /community/posts/{post_id}/comments` : 댓글 목록 조회
- `PUT /community/comments/{comment_id}` : 댓글 수정
- `DELETE /community/comments/{comment_id}` : 댓글 삭제
- `POST /community/comments/{comment_id}/like` : 댓글 좋아요

### 채팅
- `POST /chat/start` : 채팅 세션 시작(개인정보 IPFS/ICP 기록)
- `POST /chat/message` : 메시지 전송(IPFS/ICP 기록)
- `GET /chat/history?user_id={id}` : 채팅 내역 조회

### AI 상담
- `POST /agent/ask` : AI 상담 요청(IPFS/ICP 기록)

### 익명 노트
- `POST /anonymous_note/send` : 익명 노트 전송(IPFS/ICP 기록)
- `GET /anonymous_note/recent` : 최근 익명 노트 조회
- `POST /anonymous_note/{note_id}/reply` : 노트에 답글 작성
- `POST /anonymous_note/{note_id}/react` : 노트에 반응(이모지 등)

---

## 스마트 컨트랙트

- **위치**: `backend/contracts/`
- **IpfsStorage.sol**  
  - IPFS 해시를 블록체인에 저장/관리하는 Solidity 스마트 컨트랙트
  - 함수: `addFile(string ipfsHash)`, `getFile(uint fileId)`

---

## 기타

- IPFS/ICP 연동은 각 API에서 데이터 해시 및 트랜잭션을 기록하여 투명성 보장
- Web3 인증은 지갑 서명 기반(JWT 발급)
- 추가 컨트랙트 및 기능은 `backend/contracts/`에 확장 가능