import uuid
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from db import Base
from sqlalchemy import UniqueConstraint

class CommitteeMember(Base):
    __tablename__ = "committee_members"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    committee_id = Column(UUID(as_uuid=True), ForeignKey('committees.id', ondelete='CASCADE'), nullable=False)
    position = Column(String(50), nullable=True)

    user = relationship('User', backref='committee_memberships')
    committee = relationship('Committee', backref='members')

    __table_args__ = (
        UniqueConstraint('user_id', 'committee_id', name='uq_user_committee'),
    )