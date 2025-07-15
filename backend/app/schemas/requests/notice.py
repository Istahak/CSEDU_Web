from typing import Optional, List
from datetime import date
from pydantic import BaseModel, Field


class NoticeBase(BaseModel):
    title: str
    content: str
    category: Optional[str] = None
    priority: Optional[str] = None
    expiry_date: Optional[date] = None
    status: Optional[str] = "Draft"


class NoticeCreate(NoticeBase):
    pass


class NoticeUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    category: Optional[str] = None
    priority: Optional[str] = None
    expiry_date: Optional[date] = None
    status: Optional[str] = None


class AttachmentInfo(BaseModel):
    filename: str
    file_path: str
    file_size: int
    file_type: str
