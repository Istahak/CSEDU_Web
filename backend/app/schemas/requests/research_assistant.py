from pydantic import BaseModel, Field
from typing import Optional
from uuid import UUID

class ResearchAssistantCreate(BaseModel):
    name: str
    supervisor_id: Optional[UUID] = None
    duration: Optional[str] = None
    area: Optional[str] = None

class ResearchAssistantUpdate(BaseModel):
    name: Optional[str] = None
    supervisor_id: Optional[UUID] = None
    duration: Optional[str] = None
    area: Optional[str] = None
