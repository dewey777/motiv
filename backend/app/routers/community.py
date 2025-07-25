# 커뮤니티 라우터
from fastapi import APIRouter, Depends, HTTPException, status, Body
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.schemas.community import PostCreate, PostResponse, CommentCreate, CommentResponse
from app.crud.community import create_post, get_post, get_posts, create_comment, get_comments, update_post, delete_post, like_post, update_comment, delete_comment, like_comment
from app.core.ipfs import upload_to_ipfs
from app.core.icp import upload_to_icp
from app.core.logging import log_user_action
from typing import List
from app.core.auth import get_current_user

router = APIRouter(prefix="/community", tags=["community"])

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
    try:
        log_user_action("community_post_create", wallet_address="unknown", details={"title": post.title, "content": post.content})
        author_id = 1
        author_wallet = "0x123..."
        try:
            ipfs_hash = upload_to_ipfs(post.dict())
        except Exception:
            ipfs_hash = None
        try:
            icp_tx = upload_to_icp(ipfs_hash)
        except Exception:
            icp_tx = None
        db_post = create_post(db, post, author_id, author_wallet, ipfs_hash, icp_tx)
        log_user_action("community_post_saved", wallet_address="unknown", details={"post_id": db_post.id})
        return db_post
    except Exception as e:
        log_user_action("community_post_error", wallet_address="unknown", details={"error": str(e)})
        raise HTTPException(status_code=500, detail=f"게시글 생성 중 오류 발생: {str(e)}")

@router.get("/posts/{post_id}", response_model=PostResponse)
def read_post(post_id: int, db: Session = Depends(get_db)):
    db_post = get_post(db, post_id)
    if not db_post:
        log_user_action("community_post_not_found", wallet_address="unknown", details={"post_id": post_id})
        raise HTTPException(status_code=404, detail="해당 게시글을 찾을 수 없습니다.")
    log_user_action("community_post_read", wallet_address="unknown", details={"post_id": post_id})
    return db_post

@router.get("/posts", response_model=List[PostResponse])
def list_posts(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    try:
        posts = get_posts(db, skip=skip, limit=limit)
        log_user_action("community_post_list", wallet_address="unknown", details={"count": len(posts)})
        return posts
    except Exception as e:
        log_user_action("community_post_list_error", wallet_address="unknown", details={"error": str(e)})
        raise HTTPException(status_code=500, detail=f"게시글 목록 조회 중 오류 발생: {str(e)}")

@router.post("/posts/{post_id}/comments", response_model=CommentResponse)
def create_post_comment(post_id: int, comment: CommentCreate, db: Session = Depends(get_db)):
    try:
        log_user_action("community_comment_create", wallet_address="unknown", details={"post_id": post_id, "content": comment.content})
        author_id = 1
        author_wallet = "0x123..."
        try:
            ipfs_hash = upload_to_ipfs(comment.dict())
        except Exception:
            ipfs_hash = None
        try:
            icp_tx = upload_to_icp(ipfs_hash)
        except Exception:
            icp_tx = None
        db_comment = create_comment(db, post_id, comment, author_id, author_wallet, ipfs_hash, icp_tx)
        log_user_action("community_comment_saved", wallet_address="unknown", details={"comment_id": db_comment.id})
        return db_comment
    except Exception as e:
        log_user_action("community_comment_error", wallet_address="unknown", details={"error": str(e)})
        raise HTTPException(status_code=500, detail=f"댓글 생성 중 오류 발생: {str(e)}")

@router.get("/posts/{post_id}/comments", response_model=List[CommentResponse])
def list_post_comments(post_id: int, db: Session = Depends(get_db)):
    try:
        comments = get_comments(db, post_id)
        log_user_action("community_comment_list", wallet_address="unknown", details={"post_id": post_id, "count": len(comments)})
        return comments
    except Exception as e:
        log_user_action("community_comment_list_error", wallet_address="unknown", details={"error": str(e)})
        raise HTTPException(status_code=500, detail=f"댓글 목록 조회 중 오류 발생: {str(e)}")

@router.put("/posts/{post_id}", response_model=PostResponse)
def update_community_post(post_id: int, data: dict = Body(...), db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    post = update_post(db, post_id, data)
    if not post:
        log_user_action("community_post_update_not_found", wallet_address="unknown", details={"post_id": post_id})
        raise HTTPException(status_code=404, detail="해당 게시글을 찾을 수 없습니다.")
    log_user_action("community_post_updated", wallet_address="unknown", details={"post_id": post_id})
    return post

@router.delete("/posts/{post_id}")
def delete_community_post(post_id: int, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    result = delete_post(db, post_id)
    if not result:
        log_user_action("community_post_delete_not_found", wallet_address="unknown", details={"post_id": post_id})
        raise HTTPException(status_code=404, detail="해당 게시글을 찾을 수 없습니다.")
    log_user_action("community_post_deleted", wallet_address="unknown", details={"post_id": post_id})
    return {"result": "success"}

@router.post("/posts/{post_id}/like", response_model=PostResponse)
def like_community_post(post_id: int, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    post = like_post(db, post_id)
    if not post:
        log_user_action("community_post_like_not_found", wallet_address="unknown", details={"post_id": post_id})
        raise HTTPException(status_code=404, detail="해당 게시글을 찾을 수 없습니다.")
    log_user_action("community_post_liked", wallet_address="unknown", details={"post_id": post_id})
    return post

@router.put("/comments/{comment_id}", response_model=CommentResponse)
def update_post_comment(comment_id: int, data: dict = Body(...), db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    comment = update_comment(db, comment_id, data)
    if not comment:
        log_user_action("community_comment_update_not_found", wallet_address="unknown", details={"comment_id": comment_id})
        raise HTTPException(status_code=404, detail="해당 댓글을 찾을 수 없습니다.")
    log_user_action("community_comment_updated", wallet_address="unknown", details={"comment_id": comment_id})
    return comment

@router.delete("/comments/{comment_id}")
def delete_post_comment(comment_id: int, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    result = delete_comment(db, comment_id)
    if not result:
        log_user_action("community_comment_delete_not_found", wallet_address="unknown", details={"comment_id": comment_id})
        raise HTTPException(status_code=404, detail="해당 댓글을 찾을 수 없습니다.")
    log_user_action("community_comment_deleted", wallet_address="unknown", details={"comment_id": comment_id})
    return {"result": "success"}

@router.post("/comments/{comment_id}/like", response_model=CommentResponse)
def like_post_comment(comment_id: int, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    comment = like_comment(db, comment_id)
    if not comment:
        log_user_action("community_comment_like_not_found", wallet_address="unknown", details={"comment_id": comment_id})
        raise HTTPException(status_code=404, detail="해당 댓글을 찾을 수 없습니다.")
    log_user_action("community_comment_liked", wallet_address="unknown", details={"comment_id": comment_id})
    return comment 