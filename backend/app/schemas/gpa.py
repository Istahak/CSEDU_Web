from pydantic import BaseModel
from typing import Optional

class GPAResponse(BaseModel):
    student_id: str
    semester: str
    gpa: Optional[float]
