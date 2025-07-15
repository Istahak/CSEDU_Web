from typing import List, Optional
from uuid import UUID
from pydantic import BaseModel
from datetime import datetime

class EventAgendaOut(BaseModel):
    id: UUID
    time: str
    description: str

class EventResponse(BaseModel):
    id: UUID
    title: str
    date_time: datetime
    location: str
    seats: int
    image: Optional[str] = None  # base64 encoded event image
    agenda: Optional[List[EventAgendaOut]] = None

    class Config:
        orm_mode = True
