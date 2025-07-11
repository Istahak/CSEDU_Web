import uuid
from sqlalchemy import Column, String, Text, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from db import Base

class ResearchAssistant(Base):
    __tablename__ = "research_assistants"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(100), nullable=False)
    supervisor_id = Column(UUID(as_uuid=True), ForeignKey('faculty.id', ondelete='SET NULL'), nullable=True)
    duration = Column(String(50))
    area = Column(Text)

    supervisor = relationship('Faculty', backref='research_assistants')
