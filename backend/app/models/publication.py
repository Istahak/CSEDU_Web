import uuid
from sqlalchemy import Column, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from db import Base
from models.base import CommonBase, AuditBase

class Publication(Base):
    __tablename__ = "publications"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    title = Column(String, nullable=True)
    venue = Column(String, nullable=True)
    year = Column(String, nullable=True)
    type = Column(String, nullable=True)  # conference, journal, workshop
    link = Column(String, nullable=True)
    not_listed_authors = Column(String, nullable=True)

    authors = relationship("AuthorPublication", back_populates="publication", cascade="all, delete-orphan")
