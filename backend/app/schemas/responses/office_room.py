from pydantic import BaseModel
from uuid import UUID
from typing import Optional

class OfficeRoomResponse(BaseModel):
    id: UUID
    room_number: str

    class Config:
        orm_mode = True
