from typing import List, Optional
from uuid import UUID
from pydantic import BaseModel

class CourseSyllabusItem(BaseModel):
    id: UUID
    title: str
    topic: str

class LearningOutcome(BaseModel):
    id: UUID
    outcome: str

class AssessmentMethod(BaseModel):
    id: UUID
    method_type: str
    value: str

class RequiredTextbook(BaseModel):
    id: UUID
    title: str
    author: Optional[str]
    edition: Optional[str]
    isbn: Optional[str]

class CourseResponse(BaseModel):
    id: UUID
    course_title: str
    course_code: str
    intro: Optional[str]
    credit: float
    duration: Optional[str]
    instructor_id: Optional[UUID]
    instructor_other: Optional[str]
    schedule: Optional[str]
    classroom_id: Optional[UUID]
    pre_requisites: List[UUID]
    syllabus_items: List[CourseSyllabusItem]
    learning_outcomes: List[LearningOutcome]
    assessment_methods: List[AssessmentMethod]
    required_textbooks: List[RequiredTextbook]
    semester: str
    is_active: bool

    class Config:
        orm_mode = True
