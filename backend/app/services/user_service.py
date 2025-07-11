import base64
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from models.user import User
from schemas.responses.user import UserResponse

def get_user(db: Session, user_id: str) -> UserResponse:
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    # Convert image blob to base64 string
    image_b64 = base64.b64encode(user.image).decode('utf-8') if user.image else None
    return UserResponse(
        id=user.id,
        user_name=user.user_name,
        email=user.email,
        image=image_b64
    )
