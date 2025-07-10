import uuid
from sqlalchemy import Column, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from db import Base
from models.base import CommonBase, AuditBase

class OfficeRoom(Base, CommonBase, AuditBase):
    __tablename__ = "office_rooms"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    room_number = Column(String(50), nullable=False, unique=True, index=True)
    faculty = relationship("Faculty", back_populates="office_room", uselist=False)  # One-to-One relationship
