import uuid
from sqlalchemy import Column, String, Text, Boolean, Date, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from datetime import datetime
from db import Base
from models.base import CommonBase, AuditBase

class Notice(Base, CommonBase, AuditBase):
    __tablename__ = "notices"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    title = Column(String(255), nullable=False, index=True)
    content = Column(Text, nullable=False)
    category = Column(String(50))
    priority = Column(String(20))
    expiry_date = Column(Date)
    status = Column(String(20), default="Draft")
    attachments = Column(Text)  # Stored as JSON string with file paths/URLs
    is_active = Column(Boolean, default=True)
