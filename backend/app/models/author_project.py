import uuid
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from db import Base

class AuthorProject(Base):
    __tablename__ = "author_project"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id"), nullable=True)
    user_id = Column(UUID(as_uuid=True), nullable=True, index=True)
    ownership_rank = Column(String, nullable=True)

    project = relationship("Project", back_populates="authors")
