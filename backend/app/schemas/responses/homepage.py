from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List

class AnnouncementTypeResponse(BaseModel):
    id: int
    name: str
    color_code: str

    class Config:
        orm_mode = True

class AnnouncementResponse(BaseModel):
    id: int
    title: str
    description: str
    type: Optional[AnnouncementTypeResponse] = None
    publish_date: datetime
    is_active: bool

    class Config:
        orm_mode = True

class QuickLinkResponse(BaseModel):
    id: int
    title: str
    url: str
    icon: Optional[str] = None
    is_active: bool

    class Config:
        orm_mode = True

class OverviewResponse(BaseModel):
    id: int
    title: str
    description: str
    image_url: Optional[str] = None
    is_active: bool

    class Config:
        orm_mode = True

class HomepageResponse(BaseModel):
    overview: Optional[OverviewResponse] = None
    announcements: List[AnnouncementResponse] = []
    quick_links: List[QuickLinkResponse] = []

    class Config:
        orm_mode = True
