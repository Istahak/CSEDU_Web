from pydantic import BaseModel, Field
from typing import Optional
from uuid import UUID
from datetime import datetime

class EquipmentBookingCreate(BaseModel):
    equipment_id: UUID = Field(..., description="Equipment ID")
    user_id: UUID = Field(..., description="User ID")
    time_start: datetime = Field(..., description="Start time of booking")
    time_end: datetime = Field(..., description="End time of booking")
    is_approved: Optional[bool] = Field(False, description="Is booking approved?")
    priority_idx: Optional[int] = Field(0, description="Priority index")

class EquipmentBookingUpdate(BaseModel):
    time_start: Optional[datetime] = None
    time_end: Optional[datetime] = None
    is_approved: Optional[bool] = None
    priority_idx: Optional[int] = None
