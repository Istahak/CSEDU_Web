from pydantic import BaseModel
from uuid import UUID
from typing import Optional
from datetime import datetime


class RoomBookingCreate(BaseModel):
    user_id: UUID
    room_id: UUID
    title: str
    description: Optional[str] = None
    time_start: datetime
    time_end: datetime
    # priority_idx: Optional[int] = 0

class RoomBookingUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    time_start: Optional[datetime] = None
    time_end: Optional[datetime] = None
    is_approved: Optional[bool] = None
    priority_idx: Optional[int] = None

class RoomBookingPriorityUpdate(BaseModel):
    priority_idx: int
