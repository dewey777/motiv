from fastapi import APIRouter, Depends, HTTPException, status, Body
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.schemas.community import PostCreate, PostResponse, CommentCreate, CommentResponse
from app.crud.community import create_post, get_post, get_posts, create_comment, get_comments, update_post, delete_post, like_post, update_comment, delete_comment, like_comment
from app.core.ipfs import upload_to_ipfs
from app.core.icp import upload_to_icp
from typing import List
from app.core.auth import get_current_user

router = APIRouter(prefix="/community", tags=["community"])

# DB 세션 의존성
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/posts", response_model=PostResponse)
def create_community_post(
    post: PostCreate,
    db: Session = Depends(get_db),
):
    """
    커뮤니티 게시글 생성 엔드포인트
    """
    try:
        author_id = 1  # 실제 서비스에서는 인증 정보 사용
        author_wallet = "0x123..."
        # IPFS/ICP 연동 (주석처리해도 API 정상 동작)
        try:
            ipfs_hash = upload_to_ipfs(post.dict())
        except Exception:
            ipfs_hash = None
        try:
            icp_tx = upload_to_icp(ipfs_hash)
        except Exception:
            icp_tx = None
        db_post = create_post(db, post, author_id, author_wallet, ipfs_hash, icp_tx)
        return db_post
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"게시글 생성 중 오류 발생: {str(e)}")

@router.get("/posts/{post_id}", response_model=PostResponse)
def read_post(post_id: int, db: Session = Depends(get_db)):
    """
    게시글 단건 조회 엔드포인트
    """
    db_post = get_post(db, post_id)
    if not db_post:
        raise HTTPException(status_code=404, detail="해당 게시글을 찾을 수 없습니다.")
    return db_post

@router.get("/posts", response_model=List[PostResponse])
def list_posts(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    """
    게시글 목록 조회 엔드포인트
    """
    try:
        posts = get_posts(db, skip=skip, limit=limit)
        return posts
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"게시글 목록 조회 중 오류 발생: {str(e)}")

@router.post("/posts/{post_id}/comments", response_model=CommentResponse)
def create_post_comment(post_id: int, comment: CommentCreate, db: Session = Depends(get_db)):
    """
    게시글에 댓글 작성 엔드포인트
    """
    try:
        author_id = 1  # 실제 서비스에서는 인증 정보 사용
        author_wallet = "0x123..."
        # IPFS/ICP 연동 (주석처리해도 API 정상 동작)
        try:
            ipfs_hash = upload_to_ipfs(comment.dict())
        except Exception:
            ipfs_hash = None
        try:
            icp_tx = upload_to_icp(ipfs_hash)
        except Exception:
            icp_tx = None
        db_comment = create_comment(db, post_id, comment, author_id, author_wallet, ipfs_hash, icp_tx)
        return db_comment
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"댓글 생성 중 오류 발생: {str(e)}")

@router.get("/posts/{post_id}/comments", response_model=List[CommentResponse])
def list_post_comments(post_id: int, db: Session = Depends(get_db)):
    """
    게시글의 댓글 목록 조회 엔드포인트
    """
    try:
        comments = get_comments(db, post_id)
        return comments
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"댓글 목록 조회 중 오류 발생: {str(e)}")

@router.put("/posts/{post_id}", response_model=PostResponse)
def update_community_post(post_id: int, data: dict = Body(...), db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    """
    게시글 수정 엔드포인트
    """
    post = update_post(db, post_id, data)
    if not post:
        raise HTTPException(status_code=404, detail="해당 게시글을 찾을 수 없습니다.")
    return post

@router.delete("/posts/{post_id}")
def delete_community_post(post_id: int, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    """
    게시글 삭제 엔드포인트
    """
    result = delete_post(db, post_id)
    if not result:
        raise HTTPException(status_code=404, detail="해당 게시글을 찾을 수 없습니다.")
    return {"result": "success"}

@router.post("/posts/{post_id}/like", response_model=PostResponse)
def like_community_post(post_id: int, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    """
    게시글 좋아요 엔드포인트
    """
    post = like_post(db, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="해당 게시글을 찾을 수 없습니다.")
    return post

@router.put("/comments/{comment_id}", response_model=CommentResponse)
def update_post_comment(comment_id: int, data: dict = Body(...), db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    """
    댓글 수정 엔드포인트
    """
    comment = update_comment(db, comment_id, data)
    if not comment:
        raise HTTPException(status_code=404, detail="해당 댓글을 찾을 수 없습니다.")
    return comment

@router.delete("/comments/{comment_id}")
def delete_post_comment(comment_id: int, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    """
    댓글 삭제 엔드포인트
    """
    result = delete_comment(db, comment_id)
    if not result:
        raise HTTPException(status_code=404, detail="해당 댓글을 찾을 수 없습니다.")
    return {"result": "success"}

@router.post("/comments/{comment_id}/like", response_model=CommentResponse)
def like_post_comment(comment_id: int, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    """
    댓글 좋아요 엔드포인트
    """
    comment = like_comment(db, comment_id)
    if not comment:
        raise HTTPException(status_code=404, detail="해당 댓글을 찾을 수 없습니다.")
    return comment