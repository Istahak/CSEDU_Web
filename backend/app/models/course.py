from sqlalchemy import Column, String, Text, Boolean, Float, ForeignKey, Table
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from db import Base
from models.base import CommonBase
from models.faculty import Faculty  # Import Faculty model
from models.classroom import Classroom  # Import Classroom model
import uuid

# Association table for course prerequisites (self-referencing many-to-many)
course_prerequisites = Table(
    "course_prerequisites",
    Base.metadata,
    Column("course_id", UUID(as_uuid=True), ForeignKey("courses.id"), primary_key=True),
    Column("prerequisite_id", UUID(as_uuid=True), ForeignKey("courses.id"), primary_key=True)
)

class CourseSyllabusItem(Base):
    __tablename__ = "course_syllabus_items"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    course_id = Column(UUID(as_uuid=True), ForeignKey('courses.id', ondelete='CASCADE'), nullable=False)
    title = Column(String(255), nullable=False)
    topic = Column(Text, nullable=False)

class LearningOutcome(Base):
    __tablename__ = "learning_outcomes"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    course_id = Column(UUID(as_uuid=True), ForeignKey('courses.id', ondelete='CASCADE'), nullable=False)
    outcome = Column(Text, nullable=False)

class AssessmentMethod(Base):
    __tablename__ = "assessment_methods"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    course_id = Column(UUID(as_uuid=True), ForeignKey('courses.id', ondelete='CASCADE'), nullable=False)
    method_type = Column(String(100), nullable=False)
    value = Column(String(255), nullable=False)

class RequiredTextbook(Base):
    __tablename__ = "required_textbooks"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    course_id = Column(UUID(as_uuid=True), ForeignKey('courses.id', ondelete='CASCADE'), nullable=False)
    title = Column(String(255), nullable=False)
    author = Column(String(255))
    edition = Column(String(100))
    isbn = Column(String(50))

class Course(Base, CommonBase):
    __tablename__ = "courses"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    course_title = Column(String(200), nullable=False)
    course_code = Column(String(20), nullable=False, unique=True, index=True)
    intro = Column(Text)
    credit = Column(Float, nullable=False)
    duration = Column(String(100))
    instructor_id = Column(UUID(as_uuid=True), ForeignKey('faculty.id'), nullable=True)
    instructor = relationship('Faculty', backref='courses')
    instructor_other = Column(String(100))
    schedule = Column(String(200))
    classroom_id = Column(UUID(as_uuid=True), ForeignKey('classrooms.id'), nullable=True)
    classroom = relationship('Classroom', backref='courses')
    # Self-referencing many-to-many for prerequisites
    pre_requisites = relationship(
        'Course',
        secondary=course_prerequisites,
        primaryjoin=id==course_prerequisites.c.course_id,
        secondaryjoin=id==course_prerequisites.c.prerequisite_id,
        backref='required_for',
        lazy='joined'
    )
    syllabus_items = relationship('CourseSyllabusItem', cascade='all, delete-orphan', backref='course')
    learning_outcomes = relationship('LearningOutcome', cascade='all, delete-orphan', backref='course')
    assessment_methods = relationship('AssessmentMethod', cascade='all, delete-orphan', backref='course')
    required_textbooks = relationship('RequiredTextbook', cascade='all, delete-orphan', backref='course')
    semester = Column(String(50), nullable=False)
    is_active = Column(Boolean, default=True)