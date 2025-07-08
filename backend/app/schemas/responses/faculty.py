from typing import Optional
from pydantic import BaseModel
from datetime import datetime


class FacultyResponse(BaseModel):
    """Schema for faculty response data"""
    id: int
    full_name: str
    email: str
    phone_number: Optional[str] = None
    office_room: Optional[str] = None
    specialization: Optional[str] = None
    research_areas: Optional[str] = None
    employment_status: str = "Active"
    designation: str
    department: str
    experience: Optional[str] = None
    number_of_publications: int = 0
    qualifications: Optional[str] = None
    profile_photo_url: Optional[str] = None
    is_active: bool = True
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True
        from_attributes = True  # For newer Pydantic versions
