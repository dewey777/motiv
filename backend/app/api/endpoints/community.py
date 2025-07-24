from fastapi import APIRouter, HTTPException, Depends
from app.models.community import PostCreate, Post, CommentCreate, Comment
from app.core.logging import log_user_action
from app.core.auth import get_current_user
from typing import List, Dict
from datetime import datetime

router = APIRouter(prefix="/community", tags=["community"])

# 임시 데이터 저장소 (실제로는 데이터베이스 사용)
posts_db: Dict[int, Post] = {}
comments_db: Dict[int, Comment] = {}
post_counter = 0
comment_counter = 0

@router.post("/posts", response_model=Post)
async def create_post(post: PostCreate, current_user: dict = Depends(get_current_user)):
    """익명 게시글 작성"""
    try:
        global post_counter
        post_counter += 1
        
        new_post = Post(
            id=post_counter,
            title=post.title,
            content=post.content,
            is_anonymous=post.is_anonymous,
            author_id=current_user["id"] if not post.is_anonymous else None,
            author_wallet=current_user["wallet_address"] if not post.is_anonymous else None,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        
        posts_db[post_counter] = new_post
        
        # 로그 기록
        log_user_action(
            action="post_create",
            wallet_address=current_user["wallet_address"],
            details={
                "post_id": post_counter,
                "is_anonymous": post.is_anonymous,
                "title": post.title[:50]  # 제목 일부만 로그
            }
        )
        
        return new_post
        
    except Exception as e:
        log_user_action(
            action="post_create_error",
            wallet_address=current_user["wallet_address"],
            details={"error": str(e)}
        )
        raise HTTPException(status_code=500, detail="Failed to create post")

@router.get("/posts", response_model=List[Post])
async def get_posts(skip: int = 0, limit: int = 10):
    """게시글 목록 조회"""
    try:
        posts = list(posts_db.values())
        posts.sort(key=lambda x: x.created_at, reverse=True)
        return posts[skip:skip + limit]
        
    except Exception as e:
        log_user_action(
            action="posts_list_error",
            wallet_address="anonymous",
            details={"error": str(e)}
        )
        raise HTTPException(status_code=500, detail="Failed to fetch posts")

@router.get("/posts/{post_id}", response_model=Post)
async def get_post(post_id: int):
    """특정 게시글 조회"""
    try:
        post = posts_db.get(post_id)
        if not post:
            raise HTTPException(status_code=404, detail="Post not found")
        
        # 조회수 증가
        post.view_count += 1
        
        log_user_action(
            action="post_view",
            wallet_address="anonymous",
            details={"post_id": post_id}
        )
        
        return post
        
    except Exception as e:
        log_user_action(
            action="post_view_error",
            wallet_address="anonymous",
            details={"error": str(e), "post_id": post_id}
        )
        raise HTTPException(status_code=500, detail="Failed to fetch post")

@router.post("/posts/{post_id}/comments", response_model=Comment)
async def create_comment(
    post_id: int, 
    comment: CommentCreate, 
    current_user: dict = Depends(get_current_user)
):
    """댓글 작성"""
    try:
        # 게시글 존재 확인
        if post_id not in posts_db:
            raise HTTPException(status_code=404, detail="Post not found")
        
        global comment_counter
        comment_counter += 1
        
        new_comment = Comment(
            id=comment_counter,
            post_id=post_id,
            content=comment.content,
            is_anonymous=comment.is_anonymous,
            author_id=current_user["id"] if not comment.is_anonymous else None,
            author_wallet=current_user["wallet_address"] if not comment.is_anonymous else None,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        
        comments_db[comment_counter] = new_comment
        
        # 로그 기록
        log_user_action(
            action="comment_create",
            wallet_address=current_user["wallet_address"],
            details={
                "comment_id": comment_counter,
                "post_id": post_id,
                "is_anonymous": comment.is_anonymous
            }
        )
        
        return new_comment
        
    except Exception as e:
        log_user_action(
            action="comment_create_error",
            wallet_address=current_user["wallet_address"],
            details={"error": str(e), "post_id": post_id}
        )
        raise HTTPException(status_code=500, detail="Failed to create comment")

@router.get("/posts/{post_id}/comments", response_model=List[Comment])
async def get_comments(post_id: int):
    """게시글의 댓글 목록 조회"""
    try:
        comments = [comment for comment in comments_db.values() if comment.post_id == post_id]
        comments.sort(key=lambda x: x.created_at)
        
        log_user_action(
            action="comments_list",
            wallet_address="anonymous",
            details={"post_id": post_id, "count": len(comments)}
        )
        
        return comments
        
    except Exception as e:
        log_user_action(
            action="comments_list_error",
            wallet_address="anonymous",
            details={"error": str(e), "post_id": post_id}
        )
        raise HTTPException(status_code=500, detail="Failed to fetch comments")