from typing import Optional
from pydantic import BaseModel
from datetime import datetime
from schemas.responses.faculty import FacultyResponse


class CourseResponse(BaseModel):
    """Schema for course response data"""
    id: int
    course_code: str
    course_title: str
    instructor: FacultyResponse
    credits: float
    semester: str
    year: int
    duration: str
    difficulty_level: str
    description: str
    learning_outcomes: Optional[str] = None
    prerequisites: Optional[str] = None
    syllabus_topics: Optional[str] = None
    schedule: str
    location: Optional[str] = None
    max_students: Optional[int] = None
    language: Optional[str] = None
    department: Optional[str] = None
    status: str
    assessment_methods: Optional[str] = None
    required_textbooks: Optional[str] = None
    references: Optional[str] = None
    course_image: Optional[str] = None
    is_active: bool = True
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True
        from_attributes = True  # For newer Pydantic versions
