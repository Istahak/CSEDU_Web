from pydantic import BaseModel, Field, EmailStr, field_validator
from uuid import UUID
from typing import Optional, Literal

class UserSignUp(BaseModel):
    user_name: Optional[str] = Field(...)
    email: Optional[EmailStr] = Field(...)
    password: Optional[str] = Field(...)
    full_name: Optional[str] = Field(...)
    role: Optional[Literal["student", "faculty", "admin"]] = Field("student")
    image: Optional[str] = Field(None, description="Base64 encoded user image")

    @field_validator('user_name')
    def user_name_must_not_be_empty(cls, v):
        if v is None or not v.strip():
            raise ValueError('User name must not be empty')
        return v

    @field_validator('email')
    def email_must_not_be_empty(cls, v):
        if v is None or not v.strip():
            raise ValueError('Email must not be empty')
        return v

    @field_validator('password')
    def password_must_not_be_empty(cls, v):
        if v is None or not v.strip():
            raise ValueError('Password must not be empty')
        return v

    @field_validator('full_name')
    def full_name_must_not_be_empty(cls, v):
        if v is None or not v.strip():
            raise ValueError('Full name must not be empty')
        return v

    class Config:
        from_attributes = True

    
class UserSignIn(BaseModel):
    email: Optional[EmailStr] = Field(None)
    password: Optional[str] = Field(None, min_length=8)

    @field_validator('email')
    def email_must_not_be_empty(cls, v):
        if v is None or not v.strip():
            raise ValueError('Email must not be empty')
        return v

    @field_validator('password')
    def password_must_not_be_empty(cls, v):
        if v is None or not v.strip():
            raise ValueError('Password must not be empty')
        return v

    class Config:
        from_attributes = True

    

class ProfileUpdateRequest(BaseModel):
    full_name: Optional[str] = Field(None, min_length=1)
    contact_number: Optional[str] = Field(None, min_length=1)
    reg_no: Optional[str] = Field(None, min_length=1)
    bio: Optional[str] = Field(None, min_length=1)
    

    class Config:
        from_attributes = True
