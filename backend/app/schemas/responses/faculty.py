from pydantic import BaseModel, EmailStr
from typing import Optional
from uuid import UUID

class FacultyResponse(BaseModel):
    id: UUID
    user_id: UUID
    office_room_id: Optional[UUID] = None
    full_name: Optional[str] = None
    email: Optional[str] = None
    phone_number: Optional[str] = None
    specialization: Optional[str] = None
    research_areas: Optional[str] = None
    employment_status: Optional[str] = None
    designation: Optional[str] = None
    department: Optional[str] = None
    experience: Optional[str] = None
    number_of_publications: Optional[int] = None
    qualifications: Optional[str] = None
    image: Optional[str] = None  # base64 encoded user image

    class Config:
        orm_mode = True
