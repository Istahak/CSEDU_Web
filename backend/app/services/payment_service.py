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


def get_payments_by_user_id(db: Session, user_id: UUID):
    from models.payment import PaymentUser, Payment
    from sqlalchemy import or_
    payments = (
        db.query(Payment, PaymentUser)
        .outerjoin(PaymentUser, (Payment.id == PaymentUser.payment_id) & (PaymentUser.user_id == user_id))
        .all()
    )
    result = []
    for payment, payment_user in payments:
        result.append({
            "description": payment.description,
            "amount": payment.amount,
            "semester": payment.semester,
            "id": payment.id,
            "user_id": user_id,
            "is_paid": payment_user.is_paid if payment_user else False,
        })
    return result

def delete_payment(db: Session, payment_id: UUID) -> bool:
    payment = db.query(Payment).filter(Payment.id == payment_id).first()
    if not payment:
        return False
    db.delete(payment)
    db.commit()
    return True
