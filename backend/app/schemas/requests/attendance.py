from typing import Optional
from uuid import UUID
from pydantic import BaseModel
from datetime import date

class AttendanceCreate(BaseModel):
    course_id: UUID
    student_id: UUID
    date: date
    is_present_on_that_day: bool = False
    remarks: Optional[str] = None
    late_count: Optional[int] = 0

class AttendanceUpdate(BaseModel):
    is_present_on_that_day: Optional[bool] = None
    remarks: Optional[str] = None
    late_count: Optional[int] = None

class AttendanceQuery(BaseModel):
    course_id: Optional[UUID] = None
    student_id: Optional[UUID] = None
    date: Optional[date] = None
    is_present_on_that_day: Optional[bool] = None
