import uuid
from sqlalchemy import Column, String
from sqlalchemy.dialects.postgresql import UUID
from db import Base

class Classroom(Base):
    __tablename__ = "classrooms"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    room_no = Column(String(50), unique=True, nullable=False, index=True)
