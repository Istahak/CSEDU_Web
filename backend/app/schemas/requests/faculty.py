from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from uuid import UUID

class FacultyCreate(BaseModel):
    user_id: UUID
    office_room_id: Optional[UUID] = None
    full_name: str
    email: EmailStr
    phone_number: Optional[str] = None
    specialization: Optional[str] = None
    research_areas: Optional[str] = None
    employment_status: Optional[str] = "Active"
    designation: str
    department: str
    experience: Optional[str] = None
    number_of_publications: Optional[int] = 0
    qualifications: Optional[str] = None
    profile_photo_url: Optional[str] = None

class FacultyUpdate(BaseModel):
    office_room_id: Optional[UUID] = None
    full_name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone_number: Optional[str] = None
    specialization: Optional[str] = None
    research_areas: Optional[str] = None
    employment_status: Optional[str] = None
    designation: Optional[str] = None
    department: Optional[str] = None
    experience: Optional[str] = None
    number_of_publications: Optional[int] = None
    qualifications: Optional[str] = None
    profile_photo_url: Optional[str] = None
