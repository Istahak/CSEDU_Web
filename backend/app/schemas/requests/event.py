from typing import List, Optional
from uuid import UUID
from pydantic import BaseModel, Field
from datetime import datetime

class EventAgendaIn(BaseModel):
    time: str
    description: str

class EventCreate(BaseModel):
    title: str
    date_time: datetime
    location: str
    seats: int
    image: Optional[str] = Field(None, description="Base64 encoded event image")
    agenda: Optional[List[EventAgendaIn]] = None

class EventUpdate(BaseModel):
    title: Optional[str] = None
    date_time: Optional[datetime] = None
    location: Optional[str] = None
    seats: Optional[int] = None
    image: Optional[str] = Field(None, description="Base64 encoded event image")
    agenda: Optional[List[EventAgendaIn]] = None

class EventImageUpdate(BaseModel):
    image: str = Field(..., description="Base64 encoded event image")
