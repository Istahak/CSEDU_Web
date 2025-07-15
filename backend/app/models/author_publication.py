import uuid
from sqlalchemy import Column, Integer, ForeignKey, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from db import Base

class AuthorPublication(Base):
    __tablename__ = "author_publication"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    publication_id = Column(UUID(as_uuid=True), ForeignKey("publications.id"), nullable=True)
    user_id = Column(UUID(as_uuid=True), nullable=True, index=True)
    ownership_rank = Column(String, nullable=True)

    publication = relationship("Publication", back_populates="authors")
