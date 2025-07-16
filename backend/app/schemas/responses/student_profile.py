from pydantic import BaseModel, EmailStr
from typing import Optional
from uuid import UUID

class StudentProfileResponse(BaseModel):
    id: Optional[UUID]
    user_id: Optional[UUID]
    student_id: Optional[str]
    email: Optional[str]
    full_name: Optional[str]
    phone: Optional[str] = None
    batch: Optional[str] = None
    semester: Optional[str] = None
    dept: Optional[str] = None
    cgpa: Optional[float] = None
    image: Optional[str] = None  # base64 encoded user image

    class Config:
        orm_mode = True
