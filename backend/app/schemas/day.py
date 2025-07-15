from uuid import UUID
from pydantic import BaseModel
from typing import Optional

class DayBase(BaseModel):
    name: str

class DayCreate(DayBase):
    pass

class DayResponse(DayBase):
    id: UUID
    class Config:
        orm_mode = True
