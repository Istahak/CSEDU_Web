from pydantic import BaseModel, Field
from typing import Optional
from uuid import UUID

class CommitteeMemberCreate(BaseModel):
    user_id: UUID = Field(..., description="User ID of the committee member")
    committee_id: UUID = Field(..., description="Committee ID")
    position: Optional[str] = Field(None, max_length=50, description="Position in the committee")

class CommitteeMemberUpdate(BaseModel):
    position: Optional[str] = Field(None, max_length=50, description="Position in the committee")
