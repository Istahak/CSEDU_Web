import uuid
from sqlalchemy import Column, String
from sqlalchemy.dialects.postgresql import UUID
from db import Base

class Slot(Base):
    __tablename__ = "slots"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    time_slot = Column(String, nullable=False, unique=True)
