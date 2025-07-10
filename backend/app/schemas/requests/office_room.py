from pydantic import BaseModel, Field
from typing import Optional
from uuid import UUID

class OfficeRoomCreate(BaseModel):
    room_number: str

class OfficeRoomUpdate(BaseModel):
    room_number: Optional[str] = None
