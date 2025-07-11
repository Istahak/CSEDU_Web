from pydantic import BaseModel
from typing import Optional, List
from uuid import UUID
from datetime import date

class AchievementWinnerResponse(BaseModel):
    id: UUID
    user_id: UUID
    achievement_id: UUID

    class Config:
        orm_mode = True

class AchievementResponse(BaseModel):
    id: UUID
    title: str
    category: str
    description: Optional[str] = None
    date: date
    awarding_organization: Optional[str] = None
    image_url: Optional[str] = None
    team_name: Optional[str] = None
    winners: List[AchievementWinnerResponse] = []

    class Config:
        orm_mode = True
