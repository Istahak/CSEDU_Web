from pydantic import BaseModel
from typing import Optional

from app.models.user import UserRole


class Token(BaseModel):
    """Token schema"""
    access_token: str
    token_type: str


class TokenPayload(BaseModel):
    """Token payload schema"""
    sub: Optional[str] = None


class TokenData(BaseModel):
    """Token data schema"""
    user_id: int
    username: str
    email: str
    role: UserRole
