from sqlalchemy.orm import Session
from app.models.db_community import Post, Comment
from app.schemas.community import PostCreate, CommentCreate
from typing import List

def create_post(db: Session, post: PostCreate, author_id: int, author_wallet: str, ipfs_hash: str, icp_tx: str):
    """
    게시글 생성 함수
    """
    db_post = Post(
        title=post.title,
        content=post.content,
        category=post.category,
        author_id=author_id,
        author_wallet=author_wallet,
        ipfs_hash=ipfs_hash,
        icp_tx=icp_tx
    )
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

def get_post(db: Session, post_id: int):
    """
    게시글 단건 조회 함수
    """
    return db.query(Post).filter(Post.id == post_id).first()

def get_posts(db: Session, skip: int = 0, limit: int = 10) -> List[Post]:
    """
    게시글 목록 조회 함수
    """
    return db.query(Post).order_by(Post.created_at.desc()).offset(skip).limit(limit).all()

def create_comment(db: Session, post_id: int, comment: CommentCreate, author_id: int, author_wallet: str, ipfs_hash: str, icp_tx: str):
    """
    댓글 생성 함수
    """
    db_comment = Comment(
        post_id=post_id,
        content=comment.content,
        author_id=author_id,
        author_wallet=author_wallet,
        ipfs_hash=ipfs_hash,
        icp_tx=icp_tx
    )
    db.add(db_comment)
    db.commit()
    db.refresh(db_comment)
    return db_comment

def get_comments(db: Session, post_id: int) -> List[Comment]:
    """
    댓글 목록 조회 함수
    """
    return db.query(Comment).filter(Comment.post_id == post_id).order_by(Comment.created_at).all()

def update_post(db: Session, post_id: int, data: dict):
    """
    게시글 수정 함수
    """
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        return None
    for key, value in data.items():
        setattr(post, key, value)
    db.commit()
    db.refresh(post)
    return post

def delete_post(db: Session, post_id: int):
    """
    게시글 삭제 함수
    """
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        return False
    db.delete(post)
    db.commit()
    return True

def like_post(db: Session, post_id: int):
    """
    게시글 좋아요 함수
    """
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        return None
    post.like_count += 1
    db.commit()
    db.refresh(post)
    return post

def update_comment(db: Session, comment_id: int, data: dict):
    """
    댓글 수정 함수
    """
    comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if not comment:
        return None
    for key, value in data.items():
        setattr(comment, key, value)
    db.commit()
    db.refresh(comment)
    return comment

def delete_comment(db: Session, comment_id: int):
    """
    댓글 삭제 함수
    """
    comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if not comment:
        return False
    db.delete(comment)
    db.commit()
    return True

def like_comment(db: Session, comment_id: int):
    """
    댓글 좋아요 함수
    """
    comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if not comment:
        return None
    comment.like_count += 1
    db.commit()
    db.refresh(comment)
    return comment 