import uuid
from sqlalchemy import Column, String, ForeignKey, Float
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from db import Base

class StudentProfile(Base):
    __tablename__ = "student_profiles"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id', ondelete='CASCADE'), unique=True, nullable=False)
    student_id = Column(String(50), unique=True, nullable=False)
    email = Column(String(100), nullable=False)
    phone = Column(String(20))
    batch = Column(String(20))
    semester = Column(String(20))
    cgpa = Column(Float, default=0.0)  # Should be updated/calculated by application logic
    dept = Column(String(100))

    # user = relationship('User', backref='student_profile', uselist=False)
    user = relationship('User', back_populates='student_profile', uselist=False)
    grades = relationship('Grade', back_populates='student_profile', cascade='all, delete-orphan')

    # full_name will be fetched from the related User object
