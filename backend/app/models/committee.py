import uuid
from sqlalchemy import Column, String, Text, Boolean
from sqlalchemy.dialects.postgresql import UUID
from db import Base

class Committee(Base):
    __tablename__ = "committees"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    committee_name = Column(String(100), nullable=False)
    responsibilities = Column(Text)
    weekly_time = Column(String(50))  # e.g., '2 hours', 'Every Friday 3-5pm'
    is_active_now = Column(Boolean, default=True)
    functional_year = Column(String(20))  # e.g., '2024-2025'
