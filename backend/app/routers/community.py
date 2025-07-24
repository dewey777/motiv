# 커뮤니티 라우터
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

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ... (all route functions from endpoints/community.py) ... 