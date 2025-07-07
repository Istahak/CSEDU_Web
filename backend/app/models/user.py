import uuid
from sqlalchemy import Column, Integer,  String, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from db import Base
from models.base import CommonBase    

class User(Base,CommonBase):
        __tablename__ = "users"
        id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
        user_name = Column(String, nullable=False,unique=True)
        email = Column(String, nullable=False, unique=True)
        password = Column(String, nullable=False)
        password_salt = Column(String, nullable=False)

        role_id = Column(Integer, ForeignKey("roles.id"))
        role = relationship("Role", back_populates="users",foreign_keys=[role_id])

        profile = relationship("Profile", back_populates="user",cascade="all, delete-orphan")
       

class Profile(Base,CommonBase):
        __tablename__ = "profiles"
        user_id = Column(ForeignKey("users.id"), primary_key=True)
        user = relationship("User",back_populates="profile", foreign_keys=[user_id])
        full_name = Column(String, nullable=True)
        contact_number = Column(String, nullable=True)
        reg_no = Column(String, nullable=True, unique=True)
        bio = Column(String, nullable=True)
        


       

        # session_id = Column(ForeignKey("sessions.id"))
        # session = relationship("Session", back_populates="profiles", foreign_keys=[session_id])


        image_id = Column(ForeignKey("images.id"))
        image = relationship("Image")

class UserSession(Base,CommonBase):
        __tablename__ = "user_sessions"
        id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
        user_id = Column(ForeignKey("users.id"))
        ip_address = Column(String, nullable=False)
        os = Column(String, nullable=False)
        device = Column(String, nullable=False)
        browser = Column(String, nullable=False)
        token = Column(String, nullable=False)

