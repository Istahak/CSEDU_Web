import uuid
from sqlalchemy import Column, String
from sqlalchemy.dialects.postgresql import UUID
from db import Base

class EventType(Base):
    __tablename__ = "event_types"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(100), nullable=False, unique=True)
    description = Column(String(255))
