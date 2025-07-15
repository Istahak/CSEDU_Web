import uuid
from sqlalchemy import Column, String, Text, Date, Boolean, ForeignKey, LargeBinary
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from db import Base

class Achievement(Base):
    __tablename__ = "achievements"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String(200), nullable=False)
    category = Column(String(100), nullable=False)
    description = Column(Text)
    date = Column(Date, nullable=False)
    awarding_organization = Column(String(200))
    image_data = Column(LargeBinary)  # Store image as a BLOB
    team_name = Column(String(200), nullable=True)

    winners = relationship('AchievementWinner', back_populates='achievement', cascade='all, delete-orphan')

class AchievementWinner(Base):
    __tablename__ = "achievement_winners"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    achievement_id = Column(UUID(as_uuid=True), ForeignKey('achievements.id', ondelete='CASCADE'), nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id', ondelete='CASCADE'), nullable=False)

    achievement = relationship('Achievement', back_populates='winners')
    user = relationship('User')
