from pydantic import BaseModel
from uuid import UUID
from typing import Optional

class CommitteeMemberResponse(BaseModel):
    id: UUID
    user_id: UUID
    committee_id: UUID
    position: Optional[str] = None

    class Config:
        from_attributes = True
