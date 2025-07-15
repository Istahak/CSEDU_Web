import uuid
from sqlalchemy import Column, String, Date, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from db import Base

class AdminProfile(Base):
    __tablename__ = "admin_profiles"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    full_name = Column(String(100), nullable=False)
    role = Column(String(50), nullable=True)
    email = Column(String(100), nullable=False, unique=True)
    dept = Column(String(100))
    phone = Column(String(20))
    joining_date = Column(Date, nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id', ondelete='CASCADE'), unique=True, nullable=False)

    user = relationship('User', back_populates='admin_profile', uselist=False)
