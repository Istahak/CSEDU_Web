from typing import List
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from db import get_db
from models.equipment import EquipmentBooking
from schemas.requests.equipment_booking import EquipmentBookingCreate, EquipmentBookingUpdate
from schemas.responses.equipment_booking import EquipmentBookingResponse
from services.equipment_booking_service import EquipmentBookingService

router = APIRouter(
    prefix="/equipment-bookings",
    tags=["Equipment Bookings"],
    responses={404: {"description": "Not found"}},
)

@router.post("/", response_model=EquipmentBookingResponse, status_code=status.HTTP_201_CREATED)
def create_equipment_booking(
    booking_data: EquipmentBookingCreate,
    db: Session = Depends(get_db),
):
    """
    Create a new equipment booking.
    """
    return EquipmentBookingService.create_equipment_booking(db, booking_data)

@router.get("/", response_model=List[EquipmentBookingResponse])
def get_all_equipment_bookings(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
):
    """
    Get all equipment bookings with pagination support.
    """
    return EquipmentBookingService.get_all_equipment_bookings(db, skip=skip, limit=limit)

@router.get("/approved", response_model=List[EquipmentBookingResponse])
def get_approved_equipment_bookings(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
):
    """
    Get all approved equipment bookings.
    """
    return EquipmentBookingService.get_approved_equipment_bookings(db, skip=skip, limit=limit)

@router.get("/pending", response_model=List[EquipmentBookingResponse])
def get_pending_equipment_bookings(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
):
    """
    Get all pending equipment bookings.
    """
    return EquipmentBookingService.get_pending_equipment_bookings(db, skip=skip, limit=limit)

@router.get("/by-id/{booking_id}", response_model=EquipmentBookingResponse)
def get_equipment_booking_by_id(
    booking_id: str,
    db: Session = Depends(get_db),
):
    """
    Get a specific equipment booking by ID.
    """
    return EquipmentBookingService.get_equipment_booking_by_id(db, booking_id)

@router.put("/{booking_id}", response_model=EquipmentBookingResponse)
def update_equipment_booking(
    booking_id: str,
    booking_data: EquipmentBookingUpdate,
    db: Session = Depends(get_db),
):
    """
    Update equipment booking information.
    """
    return EquipmentBookingService.update_equipment_booking(db, booking_id, booking_data)

@router.delete("/{booking_id}", status_code=status.HTTP_200_OK)
def delete_equipment_booking(
    booking_id: str,
    db: Session = Depends(get_db),
):
    """
    Delete an equipment booking.
    """
    return EquipmentBookingService.delete_equipment_booking(db, booking_id)

@router.put("/{booking_id}/approve", response_model=EquipmentBookingResponse)
def approve_equipment_booking(
    booking_id: str,
    db: Session = Depends(get_db),
):
    """
    Approve an equipment booking (set is_approved=True).
    """
    return EquipmentBookingService.approve_equipment_booking(db, booking_id)
