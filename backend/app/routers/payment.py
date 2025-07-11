from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from uuid import UUID
from schemas.payment import Payment, PaymentCreate, PaymentUpdate, PaymentList
from services.payment_service import (
    create_payment,
    get_payment_by_id,
    get_all_payments,
    update_payment,
    delete_payment
)
from db import get_db

router = APIRouter(prefix="/payments", tags=["payments"])

@router.get("/", response_model=PaymentList)
def read_payments(db: Session = Depends(get_db)):
    payments = get_all_payments(db)
    return {"payments": payments}

@router.get("/by-id/{payment_id}", response_model=Payment)
def read_payment(payment_id: UUID, db: Session = Depends(get_db)):
    payment = get_payment_by_id(db, payment_id)
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    return payment

@router.post("/", response_model=Payment, status_code=status.HTTP_201_CREATED)
def create_new_payment(payment_in: PaymentCreate, db: Session = Depends(get_db)):
    return create_payment(db, payment_in)

@router.put("/{payment_id}", response_model=Payment)
def update_existing_payment(payment_id: UUID, payment_in: PaymentUpdate, db: Session = Depends(get_db)):
    payment = update_payment(db, payment_id, payment_in)
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    return payment

@router.delete("/{payment_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_existing_payment(payment_id: UUID, db: Session = Depends(get_db)):
    success = delete_payment(db, payment_id)
    if not success:
        raise HTTPException(status_code=404, detail="Payment not found")
    return None
