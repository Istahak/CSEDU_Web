from sqlalchemy.orm import Session
from uuid import UUID
from typing import List, Optional
from models.event import EventBooking
from schemas.requests.event_booking import EventBookingCreate, EventBookingUpdate

def get_all_event_bookings(db: Session) -> List[EventBooking]:
    return db.query(EventBooking).all()

def get_event_bookings_by_event_id(db: Session, event_id: UUID) -> List[EventBooking]:
    return db.query(EventBooking).filter(EventBooking.event_id == event_id).all()

def get_event_booking_by_id(db: Session, booking_id: UUID) -> Optional[EventBooking]:
    return db.query(EventBooking).filter(EventBooking.id == booking_id).first()

def create_event_booking(db: Session, data: EventBookingCreate) -> EventBooking:
    booking = EventBooking(**data.dict())
    db.add(booking)
    db.commit()
    db.refresh(booking)
    return booking

def update_event_booking(db: Session, booking_id: UUID, data: EventBookingUpdate) -> Optional[EventBooking]:
    booking = db.query(EventBooking).filter(EventBooking.id == booking_id).first()
    if not booking:
        return None
    for key, value in data.dict(exclude_unset=True).items():
        setattr(booking, key, value)
    db.commit()
    db.refresh(booking)
    return booking

def delete_event_booking(db: Session, booking_id: UUID) -> bool:
    booking = db.query(EventBooking).filter(EventBooking.id == booking_id).first()
    if not booking:
        return False
    db.delete(booking)
    db.commit()
    return True

def approve_event_booking(db: Session, booking_id: UUID) -> Optional[EventBooking]:
    booking = db.query(EventBooking).filter(EventBooking.id == booking_id).first()
    if not booking:
        return None
    booking.is_approved = True
    db.commit()
    db.refresh(booking)
    return booking
