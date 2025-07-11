from pydantic import BaseModel
from typing import Optional
from uuid import UUID

class ResearchAssistantResponse(BaseModel):
    id: UUID
    name: str
    supervisor_id: Optional[UUID] = None
    duration: Optional[str] = None
    area: Optional[str] = None

    class Config:
        orm_mode = True
