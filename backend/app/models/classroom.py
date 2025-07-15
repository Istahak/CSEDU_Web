import uuid
from sqlalchemy import Column, String
from sqlalchemy.dialects.postgresql import UUID
from db import Base
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey, Text, Boolean, DateTime, Integer

class Classroom(Base):
    __tablename__ = "classrooms"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    room_no = Column(String(50), unique=True, nullable=False, index=True)

class RoomBooking(Base):
    __tablename__ = "room_bookings"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    room_id = Column(UUID(as_uuid=True), ForeignKey('classrooms.id', ondelete='CASCADE'), nullable=False)
    title = Column(String(200), nullable=False)
    description = Column(Text)
    time_start = Column(DateTime, nullable=False)
    time_end = Column(DateTime, nullable=False)
    is_approved = Column(Boolean, default=False)
    priority_idx = Column(Integer, default=0)

    user = relationship('User')
    room = relationship('Classroom')