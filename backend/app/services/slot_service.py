from sqlalchemy.orm import Session
from uuid import UUID
from models.slot import Slot
from schemas.slot import SlotCreate
from typing import List

def create_slot(db: Session, slot: SlotCreate) -> Slot:
    db_slot = Slot(time_slot=slot.time_slot)
    db.add(db_slot)
    db.commit()
    db.refresh(db_slot)
    return db_slot

def get_slots(db: Session) -> List[Slot]:
    return db.query(Slot).all()

def get_slot(db: Session, slot_id: UUID) -> Slot:
    return db.query(Slot).filter(Slot.id == slot_id).first()

def delete_slot(db: Session, slot_id: UUID) -> bool:
    slot = db.query(Slot).filter(Slot.id == slot_id).first()
    if not slot:
        return False
    db.delete(slot)
    db.commit()
    return True
