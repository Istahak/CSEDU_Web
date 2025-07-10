import uuid
from sqlalchemy import Column, String, Text, Boolean, ForeignKey, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from db import Base
from models.base import CommonBase

class Faculty(Base):
    __tablename__ = "faculty"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), unique=True, nullable=False)
    user = relationship("User", back_populates="faculty")
    office_room_id = Column(UUID(as_uuid=True), ForeignKey("office_rooms.id"), unique=True, nullable=True)
    office_room = relationship("OfficeRoom", back_populates="faculty")
    full_name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False, index=True)
    phone_number = Column(String(20))
    specialization = Column(Text)
    research_areas = Column(Text)  # Stored as comma-separated string
    employment_status = Column(String(20), default="Active")
    designation = Column(String(50), nullable=False)
    department = Column(String(50), nullable=False)
    experience = Column(String(50))  # e.g., "15 years"
    number_of_publications = Column(Integer, default=0)
    qualifications = Column(Text)
    profile_photo_url = Column(String(255))
    is_active = Column(Boolean, default=True)