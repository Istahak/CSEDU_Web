from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from db import get_db
from schemas.slot import SlotCreate, SlotResponse
from services import slot_service

router = APIRouter(prefix="/slot", tags=["Slot"])

@router.post("/", response_model=SlotResponse, status_code=201)
def create_slot(data: SlotCreate, db: Session = Depends(get_db)):
    return slot_service.create_slot(db, data)

@router.get("/", response_model=List[SlotResponse])
def get_slots(db: Session = Depends(get_db)):
    return slot_service.get_slots(db)

@router.get("/{slot_id}", response_model=SlotResponse)
def get_slot(slot_id: UUID, db: Session = Depends(get_db)):
    slot = slot_service.get_slot(db, slot_id)
    if not slot:
        raise HTTPException(status_code=404, detail="Slot not found")
    return slot

@router.delete("/{slot_id}", status_code=204)
def delete_slot(slot_id: UUID, db: Session = Depends(get_db)):
    deleted = slot_service.delete_slot(db, slot_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Slot not found")
    return None
