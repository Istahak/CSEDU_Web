from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

from app.models.user import UserRole


class UserBase(BaseModel):
    """Base user schema with common attributes"""
    email: EmailStr
    username: str
    full_name: Optional[str] = None
    role: Optional[UserRole] = UserRole.STUDENT


class UserCreate(UserBase):
    """Schema for user creation"""
    password: str = Field(..., min_length=8)
    confirm_password: str


class UserUpdate(BaseModel):
    """Schema for user update"""
    email: Optional[EmailStr] = None
    username: Optional[str] = None
    full_name: Optional[str] = None
    password: Optional[str] = None


class UserInDBBase(UserBase):
    """Base schema for users in DB"""
    id: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class User(UserInDBBase):
    """Schema for returning user data"""
    pass


class UserInDB(UserInDBBase):
    """Schema for user in DB with hashed password"""
    hashed_password: str
