import uuid
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from db import Base

class Grade(Base):
    __tablename__ = "grades"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    course_id = Column(UUID(as_uuid=True), ForeignKey('courses.id', ondelete='CASCADE'), nullable=False)
    student_id = Column(UUID(as_uuid=True), ForeignKey('student_profiles.id', ondelete='CASCADE'), nullable=False)
    grade = Column(String(10), nullable=True)

    course = relationship('Course', backref='grades')
    student_profile = relationship('StudentProfile', back_populates='grades')
