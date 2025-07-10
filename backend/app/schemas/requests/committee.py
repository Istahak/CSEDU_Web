from pydantic import BaseModel, Field
from typing import Optional

class CommitteeCreate(BaseModel):
    committee_name: str = Field(..., min_length=1, max_length=100, description="Committee name")
    responsibilities: Optional[str] = Field(None, description="Responsibilities of the committee")
    weekly_time: Optional[str] = Field(None, max_length=50, description="Weekly meeting time")
    is_active_now: Optional[bool] = Field(True, description="Is the committee currently active?")
    functional_year: Optional[str] = Field(None, max_length=20, description="Functional year, e.g., '2024-2025'")

class CommitteeUpdate(BaseModel):
    committee_name: Optional[str] = Field(None, min_length=1, max_length=100)
    responsibilities: Optional[str] = Field(None)
    weekly_time: Optional[str] = Field(None, max_length=50)
    is_active_now: Optional[bool] = Field(None)
    functional_year: Optional[str] = Field(None, max_length=20)
