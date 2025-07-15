from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class OverviewCreate(BaseModel):
    title: str
    description: str
    image_url: Optional[str] = None
    is_active: bool = True

class OverviewUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    is_active: Optional[bool] = None

class AnnouncementTypeCreate(BaseModel):
    name: str
    color_code: str

class AnnouncementTypeUpdate(BaseModel):
    name: Optional[str] = None
    color_code: Optional[str] = None

class AnnouncementCreate(BaseModel):
    title: str
    description: str
    type_id: int
    publish_date: Optional[datetime] = None
    is_active: bool = True

class AnnouncementUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    type_id: Optional[int] = None
    publish_date: Optional[datetime] = None
    is_active: Optional[bool] = None

class QuickLinkCreate(BaseModel):
    title: str
    url: str
    icon: Optional[str] = None
    is_active: bool = True

class QuickLinkUpdate(BaseModel):
    title: Optional[str] = None
    url: Optional[str] = None
    icon: Optional[str] = None
    is_active: Optional[bool] = None
