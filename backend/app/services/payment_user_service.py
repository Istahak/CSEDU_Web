from sqlalchemy.orm import Session
from uuid import UUID
from models.payment import PaymentUser, Payment
from models.user import User
from schemas.requests.payment_user import PaymentUserCreate, PaymentUserUpdate


def create_payment_user(db: Session, payment_user_in: PaymentUserCreate):
    # Check if payment exists
    if not db.query(Payment).filter(Payment.id == payment_user_in.payment_id).first():
        return None, 'Payment not found'
    # Check if user exists
    if not db.query(User).filter(User.id == payment_user_in.user_id).first():
        return None, 'User not found'
    payment_user = PaymentUser(**payment_user_in.dict())
    db.add(payment_user)
    db.commit()
    db.refresh(payment_user)
    return payment_user, None

def get_payment_user_by_id(db: Session, payment_user_id: UUID):
    return db.query(PaymentUser).filter(PaymentUser.id == payment_user_id).first()

def get_all_payment_users(db: Session):
    return db.query(PaymentUser).all()

def get_payment_users_by_user_id(db: Session, user_id: UUID):
    # Check if user exists
    if not db.query(User).filter(User.id == user_id).first():
        return None, 'User not found'
    payment_users = db.query(PaymentUser).filter(PaymentUser.user_id == user_id).all()
    return payment_users, None

def update_payment_user(db: Session, payment_user_id: UUID, payment_user_in: PaymentUserUpdate):
    payment_user = db.query(PaymentUser).filter(PaymentUser.id == payment_user_id).first()
    if not payment_user:
        return None, 'PaymentUser not found'
    for field, value in payment_user_in.dict(exclude_unset=True).items():
        setattr(payment_user, field, value)
    db.commit()
    db.refresh(payment_user)
    return payment_user, None

def delete_payment_user(db: Session, payment_user_id: UUID):
    payment_user = db.query(PaymentUser).filter(PaymentUser.id == payment_user_id).first()
    if not payment_user:
        return False, 'PaymentUser not found'
    db.delete(payment_user)
    db.commit()
    return True, None
