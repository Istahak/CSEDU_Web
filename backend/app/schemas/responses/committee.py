from pydantic import BaseModel
from uuid import UUID
from typing import Optional

class CommitteeResponse(BaseModel):
    id: UUID
    committee_name: str
    responsibilities: Optional[str] = None
    weekly_time: Optional[str] = None
    is_active_now: bool
    functional_year: Optional[str] = None

    class Config:
        from_attributes = True
