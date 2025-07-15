from typing import List
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from models.equipment import EquipmentBooking
from schemas.requests.equipment_booking import EquipmentBookingCreate, EquipmentBookingUpdate
import uuid

class EquipmentBookingService:
    @staticmethod
    def create_equipment_booking(db: Session, booking_data: EquipmentBookingCreate) -> EquipmentBooking:
        # Check if user and equipment exist
        from models.user import User
        from models.equipment import Equipment
        user = db.query(User).filter(User.id == booking_data.user_id).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"User with ID {booking_data.user_id} does not exist"
            )
        equipment = db.query(Equipment).filter(Equipment.id == booking_data.equipment_id).first()
        if not equipment:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Equipment with ID {booking_data.equipment_id} does not exist"
            )
        try:
            db_booking = EquipmentBooking(
                equipment_id=booking_data.equipment_id,
                user_id=booking_data.user_id,
                time_start=booking_data.time_start,
                time_end=booking_data.time_end,
                is_approved=booking_data.is_approved if booking_data.is_approved is not None else False,
                priority_idx=booking_data.priority_idx if booking_data.priority_idx is not None else 0
            )
            db.add(db_booking)
            db.commit()
            db.refresh(db_booking)
            return db_booking
        except IntegrityError:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Failed to create booking (likely duplicate or constraint error)"
            )
        except Exception as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to create equipment booking: {str(e)}"
            )
    @staticmethod
    def get_all_equipment_bookings(db: Session, skip: int = 0, limit: int = 100) -> List[EquipmentBooking]:
        return db.query(EquipmentBooking).offset(skip).limit(limit).all()

    @staticmethod
    def get_approved_equipment_bookings(db: Session, skip: int = 0, limit: int = 100) -> List[EquipmentBooking]:
        return db.query(EquipmentBooking).filter(EquipmentBooking.is_approved == True).offset(skip).limit(limit).all()

    @staticmethod
    def get_pending_equipment_bookings(db: Session, skip: int = 0, limit: int = 100) -> List[EquipmentBooking]:
        return db.query(EquipmentBooking).filter(EquipmentBooking.is_approved == False).offset(skip).limit(limit).all()
    @staticmethod
    def get_equipment_booking_by_id(db: Session, booking_id: str) -> EquipmentBooking:
        try:
            booking_uuid = uuid.UUID(booking_id)
        except ValueError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid equipment booking ID format"
            )
        booking = db.query(EquipmentBooking).filter(EquipmentBooking.id == booking_uuid).first()
        if not booking:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Equipment booking with ID {booking_id} not found"
            )
        return booking
    @staticmethod
    def update_equipment_booking(db: Session, booking_id: str, booking_data: EquipmentBookingUpdate) -> EquipmentBooking:
        booking = EquipmentBookingService.get_equipment_booking_by_id(db, booking_id)
        update_data = booking_data.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(booking, key, value)
        try:
            db.commit()
            db.refresh(booking)
            return booking
        except IntegrityError:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Failed to update equipment booking (likely duplicate or constraint error)"
            )
        except Exception as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to update equipment booking: {str(e)}"
            )
    @staticmethod
    def delete_equipment_booking(db: Session, booking_id: str) -> dict:
        booking = EquipmentBookingService.get_equipment_booking_by_id(db, booking_id)
        db.delete(booking)
        try:
            db.commit()
            return {"message": f"Equipment booking with ID {booking_id} has been deleted"}
        except Exception as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to delete equipment booking: {str(e)}"
            )

    @staticmethod
    def approve_equipment_booking(db: Session, booking_id: str) -> 'EquipmentBooking':
        booking = EquipmentBookingService.get_equipment_booking_by_id(db, booking_id)
        booking.is_approved = True
        try:
            db.commit()
            db.refresh(booking)
            return booking
        except Exception as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to approve equipment booking: {str(e)}"
            )
