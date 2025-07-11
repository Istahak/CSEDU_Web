from uuid import UUID
from pydantic import BaseModel
from typing import Optional

class TokenBasic(BaseModel):
    access_token: str
    token_type: str

    class Config:
        from_attributes = True

class UserResponse(BaseModel):
    id: UUID
    user_name: str
    email: str
    image: Optional[str] = None  # base64 encoded user image

    class Config:
        from_attributes = True

class UserSessionResponse(BaseModel):
    id: UUID
    user_id: UUID
    os: Optional[str] = None
    device: Optional[str] = None
    browser: Optional[str] = None

    class Config:
        from_attributes = True

class ProfileResponse(BaseModel):
    user: Optional[UserResponse] = None
    full_name: Optional[str] = None
    contact_number: Optional[str] = None
    reg_no: Optional[str] = None
    bio: Optional[str] = None

    class Config:
        from_attributes = True