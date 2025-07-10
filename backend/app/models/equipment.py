import uuid
from sqlalchemy import Column, String, Text, Float, Boolean, ForeignKey, DateTime, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from db import Base

class Equipment(Base):
    __tablename__ = "equipments"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(100), nullable=False)
    details = Column(Text)
    amount = Column(Float, nullable=False)

    bookings = relationship('EquipmentBooking', back_populates='equipment', cascade='all, delete-orphan')

class EquipmentBooking(Base):
    __tablename__ = "equipment_bookings"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    equipment_id = Column(UUID(as_uuid=True), ForeignKey('equipments.id', ondelete='CASCADE'), nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    time_start = Column(DateTime, nullable=False)
    time_end = Column(DateTime, nullable=False)
    is_approved = Column(Boolean, default=False)
    priority_idx = Column(Integer, default=0)

    equipment = relationship('Equipment', back_populates='bookings')
    user = relationship('User')

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
