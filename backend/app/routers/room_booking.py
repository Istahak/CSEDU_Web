from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from typing import List
from db import get_db
from models.classroom import RoomBooking
from schemas.requests.room_booking import RoomBookingCreate, RoomBookingUpdate
from schemas.responses.room_booking import RoomBookingResponse
from services.room_booking_service import RoomBookingService

router = APIRouter(
    prefix="/room-bookings",
    tags=["RoomBooking"]
)

@router.post("/", response_model=RoomBookingResponse, status_code=status.HTTP_201_CREATED)
def create_room_booking(
    booking_create: RoomBookingCreate,
    db: Session = Depends(get_db),
):
    """
    Create a new room booking.
    """
    return RoomBookingService.create_room_booking(db, booking_create)

@router.get("/", response_model=List[RoomBookingResponse])
def get_all_room_bookings(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
):
    """
    Get all room bookings with pagination support.
    """
    return RoomBookingService.get_all_room_bookings(db, skip=skip, limit=limit)

@router.get("/by-user/{user_id}", response_model=List[RoomBookingResponse])
def get_bookings_by_user_id(
    user_id: str,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
):
    """
    Get all room bookings by user ID.
    """
    return RoomBookingService.get_bookings_by_user_id(db, user_id, skip=skip, limit=limit)

@router.get("/available-time/{room_id}")
def get_available_time_for_room(
    room_id: str,
    db: Session = Depends(get_db),
):
    """
    Get available time slots for a room by room ID.
    """
    return RoomBookingService.get_available_time_for_room(db, room_id)

@router.get("/approved", response_model=List[RoomBookingResponse])
def get_approved_room_bookings(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
):
    """
    Get all approved room bookings.
    """
    return RoomBookingService.get_approved_room_bookings(db, skip=skip, limit=limit)

@router.get("/pending", response_model=List[RoomBookingResponse])
def get_pending_room_bookings(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
):
    """
    Get all pending room bookings.
    """
    return RoomBookingService.get_pending_room_bookings(db, skip=skip, limit=limit)

@router.get("/by-id/{booking_id}", response_model=RoomBookingResponse)
def get_room_booking_by_id(
    booking_id: str,
    db: Session = Depends(get_db),
):
    """
    Get a specific room booking by ID.
    """
    return RoomBookingService.get_room_booking_by_id(db, booking_id)

@router.put("/{booking_id}", response_model=RoomBookingResponse)
def update_room_booking(
    booking_id: str,
    booking_update: RoomBookingUpdate,
    db: Session = Depends(get_db),
):
    """
    Update a room booking by ID.
    """
    return RoomBookingService.update_room_booking(db, booking_id, booking_update)

@router.delete("/{booking_id}", status_code=status.HTTP_200_OK)
def delete_room_booking(
    booking_id: str,
    db: Session = Depends(get_db),
):
    """
    Delete a room booking by ID.
    """
    return RoomBookingService.delete_room_booking(db, booking_id)

@router.put("/{booking_id}/approve", response_model=RoomBookingResponse)
def approve_room_booking(
    booking_id: str,
    db: Session = Depends(get_db),
):
    """
    Approve a room booking (set is_approved=True).
    """
    return RoomBookingService.approve_room_booking(db, booking_id)
