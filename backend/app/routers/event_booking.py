from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from db import get_db
from schemas.requests.event_booking import EventBookingCreate, EventBookingUpdate
from schemas.responses.event_booking import EventBookingResponse
from services import event_booking_service

router = APIRouter(prefix="/event-booking", tags=["Event Booking"])

@router.get("/", response_model=List[EventBookingResponse])
def get_all_event_bookings(db: Session = Depends(get_db)):
    bookings = event_booking_service.get_all_event_bookings(db)
    return bookings

@router.get("/by-event/{event_id}", response_model=List[EventBookingResponse])
def get_event_bookings_by_event_id(event_id: UUID, db: Session = Depends(get_db)):
    bookings = event_booking_service.get_event_bookings_by_event_id(db, event_id)
    return bookings

@router.get("/{booking_id}", response_model=EventBookingResponse)
def get_event_booking_by_id(booking_id: UUID, db: Session = Depends(get_db)):
    booking = event_booking_service.get_event_booking_by_id(db, booking_id)
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    return booking

@router.post("/", response_model=EventBookingResponse, status_code=201)
def create_event_booking(data: EventBookingCreate, db: Session = Depends(get_db)):
    booking = event_booking_service.create_event_booking(db, data)
    return booking

@router.put("/{booking_id}", response_model=EventBookingResponse)
def update_event_booking(booking_id: UUID, data: EventBookingUpdate, db: Session = Depends(get_db)):
    booking = event_booking_service.update_event_booking(db, booking_id, data)
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    return booking

@router.delete("/{booking_id}", status_code=204)
def delete_event_booking(booking_id: UUID, db: Session = Depends(get_db)):
    deleted = event_booking_service.delete_event_booking(db, booking_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Booking not found")
    return None

@router.put("/{booking_id}/approve", response_model=EventBookingResponse)
def approve_event_booking(booking_id: UUID, db: Session = Depends(get_db)):
    booking = event_booking_service.approve_event_booking(db, booking_id)
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    return booking
