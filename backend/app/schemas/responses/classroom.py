from pydantic import BaseModel
from uuid import UUID

class ClassroomResponse(BaseModel):
    id: UUID
    room_no: str

    class Config:
        from_attributes = True
