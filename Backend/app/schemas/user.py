"""
User Pydantic schemas
"""
from typing import Optional
from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    """Base user schema"""
    email: EmailStr
    full_name: Optional[str] = None
    is_active: bool = True


class UserCreate(UserBase):
    """Schema for creating a user"""
    password: str


class UserUpdate(UserBase):
    """Schema for updating a user"""
    password: Optional[str] = None


class UserInDB(UserBase):
    """Schema for user as stored in database"""
    id: int
    hashed_password: str
    
    class Config:
        from_attributes = True


class User(UserBase):
    """Schema for user as returned by API"""
    id: int
    
    class Config:
        from_attributes = True
