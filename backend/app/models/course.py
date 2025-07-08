from sqlalchemy import Column, String, Integer, Text, Boolean, Float, ForeignKey
from sqlalchemy.orm import relationship
from db import Base
from models.base import CommonBase


class Course(Base, CommonBase):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    course_code = Column(String(20), nullable=False, index=True)
    course_title = Column(String(200), nullable=False)
    instructor_id = Column(Integer, ForeignKey('faculty.id'), nullable=False)
    instructor = relationship('Faculty', backref='courses')
    credits = Column(Float, nullable=False)
    semester = Column(String(50), nullable=False)
    year = Column(Integer, nullable=False)
    duration = Column(String(100), nullable=False)
    difficulty_level = Column(String(50), nullable=False)
    description = Column(Text, nullable=False)
    learning_outcomes = Column(Text)
    prerequisites = Column(Text)
    syllabus_topics = Column(Text)
    schedule = Column(String(200), nullable=False)
    location = Column(String(200))
    max_students = Column(Integer)
    language = Column(String(50))
    department = Column(String(100))
    status = Column(String(50), nullable=False)
    assessment_methods = Column(Text)
    required_textbooks = Column(Text)
    references = Column(Text)
    course_image = Column(Text)  # Store base64 encoded image
    is_active = Column(Boolean, default=True)