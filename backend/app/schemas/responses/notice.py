from typing import Optional, List
from datetime import date, datetime
from pydantic import BaseModel


class AttachmentResponse(BaseModel):
    filename: str
    file_path: str
    file_size: int
    file_type: str


class NoticeResponse(BaseModel):
    id: int
    title: str
    content: str
    category: Optional[str] = None
    priority: Optional[str] = None
    expiry_date: Optional[date] = None
    status: str
    attachments: Optional[List[AttachmentResponse]] = None
    created_at: datetime
    last_updated_at: Optional[datetime] = None
    is_active: bool

    class Config:
        from_attributes = True
