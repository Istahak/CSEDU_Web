import uuid
from sqlalchemy import Column, String, Boolean, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from db import Base
from models.base import CommonBase, AuditBase

class Project(Base, CommonBase, AuditBase):
    __tablename__ = "projects"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    title = Column(String, nullable=True)
    abstract = Column(String, nullable=True)
    keywords = Column(String, nullable=True)
    link = Column(String, nullable=True)
    is_thesis = Column(Boolean, nullable=True)
    supervisor_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)

    authors = relationship("AuthorProject", back_populates="project", cascade="all, delete-orphan")
