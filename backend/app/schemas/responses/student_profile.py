from pydantic import BaseModel, EmailStr
from typing import Optional
from uuid import UUID

class StudentProfileResponse(BaseModel):
    id: UUID
    user_id: UUID
    student_id: str
    email: EmailStr
    phone: Optional[str] = None
    batch: Optional[str] = None
    semester: Optional[str] = None
    dept: Optional[str] = None
    cgpa: float
    image: Optional[str] = None  # base64 encoded user image

    class Config:
        orm_mode = True
