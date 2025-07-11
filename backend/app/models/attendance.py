import uuid
from sqlalchemy import Column, String, Boolean, Integer, Date, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from db import Base

class Attendance(Base):
    __tablename__ = "attendance"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    course_id = Column(UUID(as_uuid=True), ForeignKey('courses.id', ondelete='CASCADE'), nullable=False)
    student_id = Column(UUID(as_uuid=True), ForeignKey('student_profiles.id', ondelete='CASCADE'), nullable=False)
    date = Column(Date, nullable=False)
    is_present_on_that_day = Column(Boolean, nullable=False, default=False)
    remarks = Column(Text)
    late_count = Column(Integer, default=0)

    course = relationship('Course', backref='attendance_records')
    student_profile = relationship('StudentProfile', backref='attendance_records')
