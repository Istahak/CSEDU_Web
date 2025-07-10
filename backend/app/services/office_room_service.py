from sqlalchemy.orm import Session
from uuid import UUID
from typing import List, Optional
from models.office_room import OfficeRoom
from schemas.requests.office_room import OfficeRoomCreate, OfficeRoomUpdate

def get_all_office_rooms(db: Session) -> List[OfficeRoom]:
    return db.query(OfficeRoom).all()

def get_office_room_by_id(db: Session, room_id: UUID) -> Optional[OfficeRoom]:
    return db.query(OfficeRoom).filter(OfficeRoom.id == room_id).first()

def create_office_room(db: Session, data: OfficeRoomCreate) -> OfficeRoom:
    office_room = OfficeRoom(**data.dict())
    db.add(office_room)
    db.commit()
    db.refresh(office_room)
    return office_room

def update_office_room(db: Session, room_id: UUID, data: OfficeRoomUpdate) -> Optional[OfficeRoom]:
    office_room = db.query(OfficeRoom).filter(OfficeRoom.id == room_id).first()
    if not office_room:
        return None
    for key, value in data.dict(exclude_unset=True).items():
        setattr(office_room, key, value)
    db.commit()
    db.refresh(office_room)
    return office_room

def delete_office_room(db: Session, room_id: UUID) -> bool:
    office_room = db.query(OfficeRoom).filter(OfficeRoom.id == room_id).first()
    if not office_room:
        return False
    db.delete(office_room)
    db.commit()
    return True
