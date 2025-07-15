from typing import Optional
from uuid import UUID
from pydantic import BaseModel

class SupervisedStudentOut(BaseModel):
    name: Optional[str]
    project_title: Optional[str]
    batch: Optional[str]
    email: Optional[str]
    phone: Optional[str]
