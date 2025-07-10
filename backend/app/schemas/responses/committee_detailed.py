from pydantic import BaseModel
from uuid import UUID
from typing import Optional, List
from schemas.responses.committee_member import CommitteeMemberResponse

class CommitteeDetailedResponse(BaseModel):
    id: UUID
    committee_name: str
    responsibilities: Optional[str] = None
    weekly_time: Optional[str] = None
    is_active_now: bool
    functional_year: Optional[str] = None
    members: List[CommitteeMemberResponse]

    class Config:
        from_attributes = True
