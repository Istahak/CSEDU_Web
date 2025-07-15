from typing import Optional
from uuid import UUID
from pydantic import BaseModel
from datetime import date

class AttendanceResponse(BaseModel):
    id: UUID
    course_id: UUID
    student_id: UUID
    date: date
    is_present_on_that_day: bool
    remarks: Optional[str] = None
    late_count: Optional[int] = 0

    class Config:
        orm_mode = True

class AttendanceSummaryResponse(BaseModel):
    course_id: Optional[UUID] = None
    student_id: Optional[UUID] = None
    total_classes_held: int
    total_present: int
    total_absent: int
    attendance_percentage: float

    class Config:
        orm_mode = True
