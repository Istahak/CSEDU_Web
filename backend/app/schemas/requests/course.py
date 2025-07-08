from typing import Optional
from pydantic import BaseModel, Field, validator


class CourseCreate(BaseModel):
    """Schema for creating a new course"""
    course_code: str = Field(..., min_length=2, max_length=20, description="Unique course code")
    course_title: str = Field(..., min_length=3, max_length=200, description="Title of the course")
    instructor_id: int = Field(..., description="Faculty ID of the instructor")
    credits: float = Field(..., gt=0, description="Number of credits for the course")
    semester: str = Field(..., min_length=2, max_length=50, description="Semester when the course is offered")
    year: int = Field(..., gt=1900, lt=3000, description="Academic year")
    duration: str = Field(..., min_length=2, max_length=100, description="Duration of the course")
    difficulty_level: str = Field(..., min_length=2, max_length=50, description="Difficulty level of the course")
    description: str = Field(..., description="Detailed description of the course")
    learning_outcomes: Optional[str] = Field(None, description="Expected learning outcomes")
    prerequisites: Optional[str] = Field(None, description="Prerequisites for the course")
    syllabus_topics: Optional[str] = Field(None, description="Topics covered in the syllabus")
    schedule: str = Field(..., min_length=2, max_length=200, description="Class schedule")
    location: Optional[str] = Field(None, max_length=200, description="Location where the course is held")
    max_students: Optional[int] = Field(None, gt=0, description="Maximum number of students allowed")
    language: Optional[str] = Field(None, max_length=50, description="Language of instruction")
    department: Optional[str] = Field(None, max_length=100, description="Department offering the course")
    status: str = Field(..., min_length=2, max_length=50, description="Current status of the course")
    assessment_methods: Optional[str] = Field(None, description="Methods used for assessment")
    required_textbooks: Optional[str] = Field(None, description="Required textbooks for the course")
    references: Optional[str] = Field(None, description="Additional references for the course")
    course_image: Optional[str] = Field(None, description="Base64 encoded image for the course")

    @validator('course_image')
    def validate_course_image(cls, v):
        if v and not v.startswith('data:image/'):
            raise ValueError('Course image must be a valid base64 encoded image string starting with data:image/')
        return v


class CourseUpdate(BaseModel):
    """Schema for updating an existing course - all fields are optional"""
    course_code: Optional[str] = Field(None, min_length=2, max_length=20)
    course_title: Optional[str] = Field(None, min_length=3, max_length=200)
    instructor_id: Optional[int] = Field(None, description="Faculty ID of the instructor")
    credits: Optional[float] = Field(None, gt=0)
    semester: Optional[str] = Field(None, min_length=2, max_length=50)
    year: Optional[int] = Field(None, gt=1900, lt=3000)
    duration: Optional[str] = Field(None, min_length=2, max_length=100)
    difficulty_level: Optional[str] = Field(None, min_length=2, max_length=50)
    description: Optional[str] = Field(None)
    learning_outcomes: Optional[str] = Field(None)
    prerequisites: Optional[str] = Field(None)
    syllabus_topics: Optional[str] = Field(None)
    schedule: Optional[str] = Field(None, min_length=2, max_length=200)
    location: Optional[str] = Field(None, max_length=200)
    max_students: Optional[int] = Field(None, gt=0)
    language: Optional[str] = Field(None, max_length=50)
    department: Optional[str] = Field(None, max_length=100)
    status: Optional[str] = Field(None, min_length=2, max_length=50)
    assessment_methods: Optional[str] = Field(None)
    required_textbooks: Optional[str] = Field(None)
    references: Optional[str] = Field(None)
    course_image: Optional[str] = Field(None)

    @validator('course_image')
    def validate_course_image(cls, v):
        if v and not v.startswith('data:image/'):
            raise ValueError('Course image must be a valid base64 encoded image string starting with data:image/')
        return v
