from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import Optional

class EquipmentBookingResponse(BaseModel):
    id: UUID
    equipment_id: UUID
    user_id: UUID
    time_start: datetime
    time_end: datetime
    is_approved: bool
    priority_idx: int

    class Config:
        from_attributes = True
