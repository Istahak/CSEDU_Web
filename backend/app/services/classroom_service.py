from typing import List
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from models.classroom import Classroom
from schemas.requests.classroom import ClassroomCreate, ClassroomUpdate
import uuid

class ClassroomService:
    @staticmethod
    def create_classroom(db: Session, classroom_data: ClassroomCreate) -> Classroom:
        try:
            db_classroom = Classroom(
                room_no=classroom_data.room_no
            )
            db.add(db_classroom)
            db.commit()
            db.refresh(db_classroom)
            return db_classroom
        except IntegrityError:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Classroom with room_no '{classroom_data.room_no}' already exists"
            )
        except Exception as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to create classroom: {str(e)}"
            )

    @staticmethod
    def get_all_classrooms(db: Session, skip: int = 0, limit: int = 100) -> List[Classroom]:
        return db.query(Classroom).offset(skip).limit(limit).all()

    @staticmethod
    def get_classroom_by_id(db: Session, classroom_id: str) -> Classroom:
        try:
            classroom_uuid = uuid.UUID(classroom_id)
        except ValueError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid classroom ID format"
            )
        classroom = db.query(Classroom).filter(Classroom.id == classroom_uuid).first()
        if not classroom:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Classroom with ID {classroom_id} not found"
            )
        return classroom

    @staticmethod
    def update_classroom(db: Session, classroom_id: str, classroom_data: ClassroomUpdate) -> Classroom:
        classroom = ClassroomService.get_classroom_by_id(db, classroom_id)
        update_data = classroom_data.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(classroom, key, value)
        try:
            db.commit()
            db.refresh(classroom)
            return classroom
        except IntegrityError:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Classroom with room_no '{classroom_data.room_no}' already exists"
            )
        except Exception as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to update classroom: {str(e)}"
            )

    @staticmethod
    def delete_classroom(db: Session, classroom_id: str) -> dict:
        classroom = ClassroomService.get_classroom_by_id(db, classroom_id)
        db.delete(classroom)
        try:
            db.commit()
            return {"message": f"Classroom with ID {classroom_id} has been deleted"}
        except Exception as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to delete classroom: {str(e)}"
            )
