from sqlalchemy import Column, String, Integer, Text, Boolean
from db import Base
from models.base import CommonBase


class Faculty(Base, CommonBase):
    __tablename__ = "faculty"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False, index=True)
    phone_number = Column(String(20))
    office_room = Column(String(50))
    specialization = Column(Text)
    research_areas = Column(Text)  # Stored as comma-separated string
    employment_status = Column(String(20), default="Active")
    designation = Column(String(50), nullable=False)
    department = Column(String(50), nullable=False)
    experience = Column(String(50))  # e.g., "15 years"
    number_of_publications = Column(Integer, default=0)
    qualifications = Column(Text)
    profile_photo_url = Column(String(255))
    is_active = Column(Boolean, default=True)