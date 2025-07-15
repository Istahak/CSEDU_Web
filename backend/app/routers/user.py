from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from schemas.responses.user import UserResponse
from services.user_service import get_user
from db import get_db

router = APIRouter(
    prefix="/user",
    tags=["user"]
)

@router.get("/{user_id}", response_model=UserResponse)
def get_user_endpoint(user_id: str, db: Session = Depends(get_db)):
    return get_user(db, user_id)
