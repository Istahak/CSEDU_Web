from pydantic import BaseModel
from typing import Optional

from uuid import UUID
class GPAResponse(BaseModel):
    student_id: UUID
    semester: str
    gpa: Optional[float]

class AcademicRecordResponse(BaseModel):
    semester: str
    gpa: float
    credits: float
