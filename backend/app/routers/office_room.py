from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from db import get_db
from schemas.requests.office_room import OfficeRoomCreate, OfficeRoomUpdate
from schemas.responses.office_room import OfficeRoomResponse
from services import office_room_service

router = APIRouter(prefix="/office-rooms", tags=["Office Rooms"])

@router.get("/", response_model=List[OfficeRoomResponse])
def get_all_office_rooms(db: Session = Depends(get_db)):
    return office_room_service.get_all_office_rooms(db)

@router.get("/{room_id}", response_model=OfficeRoomResponse)
def get_office_room_by_id(room_id: UUID, db: Session = Depends(get_db)):
    office_room = office_room_service.get_office_room_by_id(db, room_id)
    if not office_room:
        raise HTTPException(status_code=404, detail="Office room not found")
    return office_room

@router.post("/", response_model=OfficeRoomResponse, status_code=201)
def create_office_room(data: OfficeRoomCreate, db: Session = Depends(get_db), ):
    return office_room_service.create_office_room(db, data)

@router.put("/{room_id}", response_model=OfficeRoomResponse)
def update_office_room(room_id: UUID, data: OfficeRoomUpdate, db: Session = Depends(get_db)):
    office_room = office_room_service.update_office_room(db, room_id, data)
    if not office_room:
        raise HTTPException(status_code=404, detail="Office room not found")
    return office_room

@router.delete("/{room_id}", status_code=204)
def delete_office_room(room_id: UUID, db: Session = Depends(get_db)):
    deleted = office_room_service.delete_office_room(db, room_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Office room not found")
    return None
