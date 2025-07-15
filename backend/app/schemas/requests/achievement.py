from pydantic import BaseModel, Field
from typing import Optional, List
from uuid import UUID
from datetime import date

class AchievementCreate(BaseModel):
    title: str
    category: str
    description: Optional[str] = None
    date: date
    awarding_organization: Optional[str] = None
    image_base64: Optional[str] = None  # base64 encoded image string
    team_name: Optional[str] = None
    winner_user_ids: Optional[List[UUID]] = None  # for AchievementWinner creation

class AchievementUpdate(BaseModel):
    title: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None
    date: Optional[date] = None
    awarding_organization: Optional[str] = None
    image_base64: Optional[str] = None  # base64 encoded image string
    team_name: Optional[str] = None
    winner_user_ids: Optional[List[UUID]] = None
