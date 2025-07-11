from typing import Optional
from uuid import UUID
from pydantic import BaseModel

class GradeBase(BaseModel):
    course_id: UUID
    student_id: UUID
    grade: Optional[float] = None

class GradeCreate(GradeBase):
    pass

class GradeUpdate(BaseModel):
    grade: Optional[float] = None

class GradeInDBBase(GradeBase):
    id: UUID
    class Config:
        orm_mode = True

class Grade(GradeInDBBase):
    pass

class GradeList(BaseModel):
    grades: list[Grade]
