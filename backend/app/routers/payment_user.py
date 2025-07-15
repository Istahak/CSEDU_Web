from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from uuid import UUID
from schemas.requests.payment_user import PaymentUserCreate, PaymentUserUpdate
from schemas.responses.payment_user import PaymentUserResponse, PaymentUserList
from services.payment_user_service import (
    create_payment_user,
    get_payment_user_by_id,
    get_all_payment_users,
    get_payment_users_by_user_id,
    update_payment_user,
    delete_payment_user
)
from db import get_db

router = APIRouter(prefix="/payment-users", tags=["payment-users"])

@router.get("/", response_model=PaymentUserList)
def read_payment_users(db: Session = Depends(get_db)):
    payment_users = get_all_payment_users(db)
    return {"payment_users": payment_users}

@router.get("/by-user/{user_id}", response_model=PaymentUserList)
def read_payment_users_by_user(user_id: UUID, db: Session = Depends(get_db)):
    payment_users, error = get_payment_users_by_user_id(db, user_id)
    if error:
        raise HTTPException(status_code=404, detail=error)
    return {"payment_users": payment_users}

@router.get("/by-id/{payment_user_id}", response_model=PaymentUserResponse)
def read_payment_user(payment_user_id: UUID, db: Session = Depends(get_db)):
    payment_user = get_payment_user_by_id(db, payment_user_id)
    if not payment_user:
        raise HTTPException(status_code=404, detail="PaymentUser not found")
    return payment_user

@router.post("/", response_model=PaymentUserResponse, status_code=status.HTTP_201_CREATED)
def create_new_payment_user(payment_user_in: PaymentUserCreate, db: Session = Depends(get_db)):
    payment_user, error = create_payment_user(db, payment_user_in)
    if error == 'Payment not found':
        raise HTTPException(status_code=404, detail="Payment not found")
    if error == 'User not found':
        raise HTTPException(status_code=404, detail="User not found")
    return payment_user

@router.put("/{payment_user_id}", response_model=PaymentUserResponse)
def update_existing_payment_user(payment_user_id: UUID, payment_user_in: PaymentUserUpdate, db: Session = Depends(get_db)):
    payment_user, error = update_payment_user(db, payment_user_id, payment_user_in)
    if error:
        raise HTTPException(status_code=404, detail=error)
    return payment_user

@router.delete("/{payment_user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_existing_payment_user(payment_user_id: UUID, db: Session = Depends(get_db)):
    success, error = delete_payment_user(db, payment_user_id)
    if error:
        raise HTTPException(status_code=404, detail=error)
    return None
