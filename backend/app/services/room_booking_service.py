from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from uuid import UUID
from typing import List
from models.classroom import RoomBooking
from schemas.requests.room_booking import RoomBookingCreate, RoomBookingUpdate

class RoomBookingService:
    @staticmethod
    def create_room_booking(db: Session, booking_create: RoomBookingCreate) -> RoomBooking:
        booking = RoomBooking(**booking_create.dict())
        db.add(booking)
        try:
            db.commit()
            db.refresh(booking)
            return booking
        except Exception as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to create room booking: {str(e)}"
            )

    @staticmethod
    def get_bookings_by_user_id(db: Session, user_id: str, skip: int = 0, limit: int = 100):
        try:
            uuid_obj = UUID(user_id)
        except ValueError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid user ID format"
            )
        return db.query(RoomBooking).filter(RoomBooking.user_id == uuid_obj).offset(skip).limit(limit).all()

    @staticmethod
    def get_available_time_for_room(db: Session, room_id: str):
        try:
            uuid_obj = UUID(room_id)
        except ValueError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid room ID format"
            )
        bookings = db.query(RoomBooking).filter(RoomBooking.room_id == uuid_obj).all()
        # Return list of dicts with start and end time
        return [{
            "time_start": booking.time_start,
            "time_end": booking.time_end,
            "is_approved": booking.is_approved
        } for booking in bookings]

    @staticmethod
    def get_all_room_bookings(db: Session, skip: int = 0, limit: int = 100) -> List[RoomBooking]:
        return db.query(RoomBooking).offset(skip).limit(limit).all()

    @staticmethod
    def get_approved_room_bookings(db: Session, skip: int = 0, limit: int = 100) -> List[RoomBooking]:
        return db.query(RoomBooking).filter(RoomBooking.is_approved == True).offset(skip).limit(limit).all()

    @staticmethod
    def get_pending_room_bookings(db: Session, skip: int = 0, limit: int = 100) -> List[RoomBooking]:
        return db.query(RoomBooking).filter(RoomBooking.is_approved == False).offset(skip).limit(limit).all()

    @staticmethod
    def get_room_booking_by_id(db: Session, booking_id: str) -> RoomBooking:
        try:
            uuid_obj = UUID(booking_id)
        except ValueError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid booking ID format"
            )
        booking = db.query(RoomBooking).filter(RoomBooking.id == uuid_obj).first()
        if not booking:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Room booking with ID {booking_id} not found"
            )
        return booking

    @staticmethod
    def update_room_booking(db: Session, booking_id: str, booking_update: RoomBookingUpdate) -> RoomBooking:
        booking = RoomBookingService.get_room_booking_by_id(db, booking_id)
        for field, value in booking_update.dict(exclude_unset=True).items():
            setattr(booking, field, value)
        try:
            db.commit()
            db.refresh(booking)
            return booking
        except Exception as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to update room booking: {str(e)}"
            )

    @staticmethod
    def delete_room_booking(db: Session, booking_id: str) -> dict:
        booking = RoomBookingService.get_room_booking_by_id(db, booking_id)
        db.delete(booking)
        try:
            db.commit()
            return {"message": f"Room booking with ID {booking_id} has been deleted"}
        except Exception as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to delete room booking: {str(e)}"
            )

    @staticmethod
    def approve_room_booking(db: Session, booking_id: str) -> RoomBooking:
        booking = RoomBookingService.get_room_booking_by_id(db, booking_id)
        booking.is_approved = True
        try:
            db.commit()
            db.refresh(booking)
            return booking
        except Exception as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to approve room booking: {str(e)}"
            )
