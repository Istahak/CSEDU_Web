import uuid
from sqlalchemy import Column, String, Float, Boolean, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from db import Base

class Payment(Base):
    __tablename__ = "payments"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    description = Column(String(255), nullable=False)
    amount = Column(Float, nullable=False)
    semester = Column(String(50), nullable=False)

    users = relationship('PaymentUser', back_populates='payment', cascade='all, delete-orphan')

class PaymentUser(Base):
    __tablename__ = "payment_users"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    payment_id = Column(UUID(as_uuid=True), ForeignKey('payments.id', ondelete='CASCADE'), nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    is_paid = Column(Boolean, default=False)

    payment = relationship('Payment', back_populates='users')
    user = relationship('User')