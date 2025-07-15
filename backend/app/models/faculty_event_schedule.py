from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from db import Base
import uuid
from sqlalchemy.dialects.postgresql import UUID

class FacultyEventSchedule(Base):
    __tablename__ = "faculty_event_schedules"
    event_id = Column(UUID(as_uuid=True), primary_key=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=False)
    batch = Column(String(50))
    event_type_id = Column(UUID(as_uuid=True), ForeignKey('event_types.id'), nullable=False)
    room_id = Column(UUID(as_uuid=True), ForeignKey('classrooms.id'), nullable=False)
    timeslot = Column(String(50), nullable=False)
    day = Column(String(20), nullable=False)
    title = Column(String(200), nullable=False)
    description = Column(String(500))

    user = relationship('User')
    event_type = relationship('EventType')
    room = relationship('Classroom')
