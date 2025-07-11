import uuid
from sqlalchemy import Column, String, Text, Integer, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from db import Base
from models.course import Course
from models.student_profile import StudentProfile

class Assignment(Base):
    __tablename__ = "assignments"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    course_id = Column(UUID(as_uuid=True), ForeignKey("courses.id", ondelete="CASCADE"), nullable=False)
    course = relationship("Course", backref="assignments")
    title = Column(String(255), nullable=False)
    due_date = Column(DateTime, nullable=False)
    max_marks = Column(Integer, nullable=False)
    description = Column(Text)

    submissions = relationship(
        "AssignmentSubmission",
        back_populates="assignment",
        cascade="all, delete-orphan"
    )

class AssignmentSubmission(Base):
    __tablename__ = "assignment_submissions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    assignment_id = Column(UUID(as_uuid=True), ForeignKey("assignments.id", ondelete="CASCADE"), nullable=False)
    assignment = relationship("Assignment", back_populates="submissions")
    student_id = Column(UUID(as_uuid=True), ForeignKey("student_profiles.id", ondelete="CASCADE"), nullable=False)
    student_profile = relationship("StudentProfile")
    attached_file = Column(String(255), nullable=False)  # Path to file in local storage (e.g., 'files/filename')
    comment = Column(String(500))
    submission_time = Column(DateTime, nullable=False)