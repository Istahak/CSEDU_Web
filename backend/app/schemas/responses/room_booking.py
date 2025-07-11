from pydantic import BaseModel
from uuid import UUID
from typing import Optional
from datetime import datetime

class RoomBookingResponse(BaseModel):
    id: UUID
    user_id: UUID
    room_id: UUID
    title: str
    description: Optional[str] = None
    time_start: datetime
    time_end: datetime
    is_approved: bool
    priority_idx: int

    class Config:
        from_attributes = True
