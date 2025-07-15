from uuid import UUID
from pydantic import BaseModel
from typing import Optional

class SlotBase(BaseModel):
    time_slot: str

class SlotCreate(SlotBase):
    pass

class SlotResponse(SlotBase):
    id: UUID
    class Config:
        orm_mode = True
