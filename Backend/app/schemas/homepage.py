from pydantic import BaseModel, Field, HttpUrl
from typing import Optional, List
from datetime import datetime

from app.schemas.user import User


# Overview Schemas
class OverviewBase(BaseModel):
    """Base schema for Overview"""
    title: Optional[str] = None
    description: str
    image_path: Optional[str] = None


class OverviewCreate(OverviewBase):
    """Schema for creating an Overview"""
    pass


class OverviewUpdate(BaseModel):
    """Schema for updating an Overview"""
    title: Optional[str] = None
    description: Optional[str] = None
    image_path: Optional[str] = None
    is_active: Optional[bool] = None


class OverviewInDBBase(OverviewBase):
    """Base schema for Overview in DB"""
    id: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    created_by: int
    updated_by: Optional[int] = None

    class Config:
        from_attributes = True


class Overview(OverviewInDBBase):
    """Schema for returning Overview data"""
    creator: Optional[User] = None
    updater: Optional[User] = None


# Announcement Type Schemas
class AnnouncementTypeBase(BaseModel):
    """Base schema for AnnouncementType"""
    name: str
    color_code: Optional[str] = None


class AnnouncementTypeCreate(AnnouncementTypeBase):
    """Schema for creating an AnnouncementType"""
    pass


class AnnouncementTypeUpdate(BaseModel):
    """Schema for updating an AnnouncementType"""
    name: Optional[str] = None
    color_code: Optional[str] = None


class AnnouncementTypeInDBBase(AnnouncementTypeBase):
    """Base schema for AnnouncementType in DB"""
    id: int

    class Config:
        from_attributes = True


class AnnouncementType(AnnouncementTypeInDBBase):
    """Schema for returning AnnouncementType data"""
    pass


# Announcement Schemas
class AnnouncementBase(BaseModel):
    """Base schema for Announcement"""
    title: str
    description: str
    type_id: int
    publish_date: datetime
    expiry_date: Optional[datetime] = None


class AnnouncementCreate(AnnouncementBase):
    """Schema for creating an Announcement"""
    pass


class AnnouncementUpdate(BaseModel):
    """Schema for updating an Announcement"""
    title: Optional[str] = None
    description: Optional[str] = None
    type_id: Optional[int] = None
    publish_date: Optional[datetime] = None
    expiry_date: Optional[datetime] = None
    is_active: Optional[bool] = None


class AnnouncementInDBBase(AnnouncementBase):
    """Base schema for Announcement in DB"""
    id: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    created_by: int
    updated_by: Optional[int] = None

    class Config:
        from_attributes = True


class Announcement(AnnouncementInDBBase):
    """Schema for returning Announcement data"""
    type: AnnouncementType
    creator: Optional[User] = None
    updater: Optional[User] = None


# QuickLink Schemas
class QuickLinkBase(BaseModel):
    """Base schema for QuickLink"""
    title: str
    url: str
    icon: Optional[str] = None
    display_order: int = 0


class QuickLinkCreate(QuickLinkBase):
    """Schema for creating a QuickLink"""
    pass


class QuickLinkUpdate(BaseModel):
    """Schema for updating a QuickLink"""
    title: Optional[str] = None
    url: Optional[str] = None
    icon: Optional[str] = None
    display_order: Optional[int] = None
    is_active: Optional[bool] = None


class QuickLinkInDBBase(QuickLinkBase):
    """Base schema for QuickLink in DB"""
    id: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    created_by: int
    updated_by: Optional[int] = None

    class Config:
        from_attributes = True


class QuickLink(QuickLinkInDBBase):
    """Schema for returning QuickLink data"""
    creator: Optional[User] = None
    updater: Optional[User] = None


# Homepage Response Schema
class HomepageData(BaseModel):
    """Schema for returning complete homepage data"""
    overview: Optional[Overview] = None
    announcements: List[Announcement] = []
    quick_links: List[QuickLink] = []
