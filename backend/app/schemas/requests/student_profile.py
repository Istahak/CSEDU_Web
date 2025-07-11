from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from uuid import UUID

class StudentProfileCreate(BaseModel):
    user_id: UUID
    student_id: str
    email: EmailStr
    phone: Optional[str] = None
    batch: Optional[str] = None
    semester: Optional[str] = None
    dept: Optional[str] = None
    image: Optional[str] = Field(None, description="Base64 encoded user image")

class StudentProfileUpdate(BaseModel):
    phone: Optional[str] = None
    batch: Optional[str] = None
    semester: Optional[str] = None
    dept: Optional[str] = None

class StudentProfileImageUpdate(BaseModel):
    image: str = Field(..., description="Base64 encoded user image")
