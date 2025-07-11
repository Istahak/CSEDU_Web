from datetime import datetime
from typing import Optional
from uuid import UUID
from pydantic import BaseModel

class AssignmentBase(BaseModel):
    course_id: UUID
    title: str
    due_date: datetime
    max_marks: int
    description: Optional[str] = None

class AssignmentCreate(AssignmentBase):
    pass

class AssignmentUpdate(BaseModel):
    title: Optional[str] = None
    due_date: Optional[datetime] = None
    max_marks: Optional[int] = None
    description: Optional[str] = None

class AssignmentInDBBase(AssignmentBase):
    id: UUID
    class Config:
        orm_mode = True

class Assignment(AssignmentInDBBase):
    pass

class AssignmentList(BaseModel):
    assignments: list[Assignment]
