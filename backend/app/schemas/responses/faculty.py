from pydantic import BaseModel, EmailStr
from typing import Optional
from uuid import UUID

class FacultyResponse(BaseModel):
    id: UUID
    user_id: UUID
    office_room_id: Optional[UUID] = None
    full_name: str
    email: EmailStr
    phone_number: Optional[str] = None
    specialization: Optional[str] = None
    research_areas: Optional[str] = None
    employment_status: Optional[str] = None
    designation: str
    department: str
    experience: Optional[str] = None
    number_of_publications: Optional[int] = None
    qualifications: Optional[str] = None
    profile_photo_url: Optional[str] = None

    class Config:
        orm_mode = True
