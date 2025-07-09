from sqlalchemy import Column, String, Integer, Text, Boolean, Date, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from db import Base
from models.base import CommonBase, AuditBase


class Notice(Base, CommonBase, AuditBase):
    __tablename__ = "notices"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False, index=True)
    content = Column(Text, nullable=False)
    category = Column(String(50))
    priority = Column(String(20))
    expiry_date = Column(Date)
    status = Column(String(20), default="Draft")
    attachments = Column(Text)  # Stored as JSON string with file paths/URLs
    is_active = Column(Boolean, default=True)
