from typing import Optional
from pydantic import BaseModel, EmailStr, Field


class FacultyCreate(BaseModel):
    """Schema for creating a new faculty member"""
    full_name: str = Field(..., min_length=2, max_length=100, description="Full name of the faculty member")
    email: EmailStr = Field(..., description="Email address of the faculty member")
    phone_number: Optional[str] = Field(None, max_length=20, description="Contact phone number")
    office_room: Optional[str] = Field(None, max_length=50, description="Office room number/location")
    specialization: Optional[str] = Field(None, description="Area of specialization")
    research_areas: Optional[str] = Field(None, description="Comma-separated research areas")
    employment_status: Optional[str] = Field("Active", description="Employment status (e.g., Active, On Leave)")
    designation: str = Field(..., min_length=2, max_length=50, description="Academic designation")
    department: str = Field(..., min_length=2, max_length=50, description="Department name")
    experience: Optional[str] = Field(None, max_length=50, description="Years of experience")
    number_of_publications: Optional[int] = Field(0, ge=0, description="Number of publications")
    qualifications: Optional[str] = Field(None, description="Academic qualifications")


class FacultyUpdate(BaseModel):
    """Schema for updating an existing faculty member - all fields are optional"""
    full_name: Optional[str] = Field(None, min_length=2, max_length=100)
    email: Optional[EmailStr] = None
    phone_number: Optional[str] = Field(None, max_length=20)
    office_room: Optional[str] = Field(None, max_length=50)
    specialization: Optional[str] = None
    research_areas: Optional[str] = None
    employment_status: Optional[str] = None
    designation: Optional[str] = Field(None, min_length=2, max_length=50)
    department: Optional[str] = Field(None, min_length=2, max_length=50)
    experience: Optional[str] = Field(None, max_length=50)
    number_of_publications: Optional[int] = Field(None, ge=0)
    qualifications: Optional[str] = None
