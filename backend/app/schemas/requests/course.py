from typing import List, Optional
from uuid import UUID
from pydantic import BaseModel, Field

class CourseSyllabusItemCreate(BaseModel):
    title: str
    topic: str

class LearningOutcomeCreate(BaseModel):
    outcome: str

class AssessmentMethodCreate(BaseModel):
    method_type: str
    value: str

class RequiredTextbookCreate(BaseModel):
    title: str
    author: Optional[str] = None
    edition: Optional[str] = None
    isbn: Optional[str] = None

class CourseCreate(BaseModel):
    course_title: str
    course_code: str
    intro: Optional[str] = None
    credit: float
    duration: Optional[str] = None
    instructor_id: Optional[UUID] = None
    instructor_other: Optional[str] = None
    schedule: Optional[str] = None
    classroom_id: Optional[UUID] = None
    pre_requisite_ids: Optional[List[UUID]] = Field(default_factory=list)
    syllabus_items: Optional[List[CourseSyllabusItemCreate]] = Field(default_factory=list)
    learning_outcomes: Optional[List[LearningOutcomeCreate]] = Field(default_factory=list)
    assessment_methods: Optional[List[AssessmentMethodCreate]] = Field(default_factory=list)
    required_textbooks: Optional[List[RequiredTextbookCreate]] = Field(default_factory=list)
    semester: str
    is_active: Optional[bool] = True

class CourseUpdate(CourseCreate):
    pass
