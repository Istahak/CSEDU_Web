import uuid
from sqlalchemy import Column, String, Integer, DateTime, ForeignKey, Boolean, LargeBinary
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from db import Base

class Event(Base):
    __tablename__ = "events"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String(200), nullable=False)
    date_time = Column(DateTime, nullable=False)
    location = Column(String(255), nullable=False)
    seats = Column(Integer, nullable=False)
    image = Column(LargeBinary, nullable=True)  # Store image as BLOB, Faculty/User style

    agenda = relationship('EventAgenda', back_populates='event', cascade='all, delete-orphan')
    bookings = relationship('EventBooking', back_populates='event', cascade='all, delete-orphan')

class EventAgenda(Base):
    __tablename__ = "event_agenda"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    event_id = Column(UUID(as_uuid=True), ForeignKey('events.id', ondelete='CASCADE'), nullable=False)
    time = Column(String(50), nullable=False)  # Could be Time, but string for flexibility
    description = Column(String(255), nullable=False)

    event = relationship('Event', back_populates='agenda')

class EventBooking(Base):
    __tablename__ = "event_bookings"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    event_id = Column(UUID(as_uuid=True), ForeignKey('events.id', ondelete='CASCADE'), nullable=False)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    email = Column(String(255), nullable=False)
    phone_number = Column(String(50), nullable=False)
    department = Column(String(100), nullable=True)
    special_requests = Column(String(255), nullable=True)
    is_approved = Column(Boolean, default=False)

    event = relationship('Event', back_populates='bookings')
