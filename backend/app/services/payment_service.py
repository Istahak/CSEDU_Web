from sqlalchemy.orm import Session
from uuid import UUID
from models.payment import Payment
from schemas.payment import PaymentCreate, PaymentUpdate


def create_payment(db: Session, payment_in: PaymentCreate) -> Payment:
    payment = Payment(**payment_in.dict())
    db.add(payment)
    db.commit()
    db.refresh(payment)
    return payment


def get_payment_by_id(db: Session, payment_id: UUID) -> Payment:
    return db.query(Payment).filter(Payment.id == payment_id).first()


def get_all_payments(db: Session) -> list[Payment]:
    return db.query(Payment).all()


def update_payment(db: Session, payment_id: UUID, payment_in: PaymentUpdate) -> Payment:
    payment = db.query(Payment).filter(Payment.id == payment_id).first()
    if not payment:
        return None
    for field, value in payment_in.dict().items():
        setattr(payment, field, value)
    db.commit()
    db.refresh(payment)
    return payment


def delete_payment(db: Session, payment_id: UUID) -> bool:
    payment = db.query(Payment).filter(Payment.id == payment_id).first()
    if not payment:
        return False
    db.delete(payment)
    db.commit()
    return True
