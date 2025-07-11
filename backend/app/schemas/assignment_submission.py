from datetime import datetime
from typing import Optional
from uuid import UUID
from pydantic import BaseModel

class AssignmentSubmissionBase(BaseModel):
    assignment_id: UUID
    student_id: UUID
    comment: Optional[str] = None

class AssignmentSubmissionCreate(AssignmentSubmissionBase):
    pass  # File will be handled by FastAPI UploadFile, not Pydantic

class AssignmentSubmissionInDBBase(AssignmentSubmissionBase):
    id: UUID
    attached_file: str
    submission_time: datetime
    class Config:
        orm_mode = True

class AssignmentSubmission(AssignmentSubmissionInDBBase):
    pass

class AssignmentSubmissionList(BaseModel):
    submissions: list[AssignmentSubmission]
