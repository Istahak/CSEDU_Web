from pydantic import BaseModel, Field
from typing import Optional
import uuid

class ClassroomCreate(BaseModel):
    room_no: str = Field(..., min_length=1, max_length=50, description="Room number, unique")

class ClassroomUpdate(BaseModel):
    room_no: Optional[str] = Field(None, min_length=1, max_length=50, description="Room number, unique")
