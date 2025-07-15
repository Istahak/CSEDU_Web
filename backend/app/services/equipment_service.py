from typing import List
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from models.equipment import Equipment
from schemas.requests.equipment import EquipmentCreate, EquipmentUpdate
import uuid

class EquipmentService:
    @staticmethod
    def create_equipment(db: Session, equipment_data: EquipmentCreate) -> Equipment:
        try:
            db_equipment = Equipment(
                name=equipment_data.name,
                details=equipment_data.details,
                amount=equipment_data.amount
            )
            db.add(db_equipment)
            db.commit()
            db.refresh(db_equipment)
            return db_equipment
        except IntegrityError:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Equipment with name '{equipment_data.name}' already exists"
            )
        except Exception as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to create equipment: {str(e)}"
            )

    @staticmethod
    def get_all_equipments(db: Session, skip: int = 0, limit: int = 100) -> List[Equipment]:
        return db.query(Equipment).offset(skip).limit(limit).all()

    @staticmethod
    def get_equipment_by_id(db: Session, equipment_id: str) -> Equipment:
        try:
            equipment_uuid = uuid.UUID(equipment_id)
        except ValueError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid equipment ID format"
            )
        equipment = db.query(Equipment).filter(Equipment.id == equipment_uuid).first()
        if not equipment:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Equipment with ID {equipment_id} not found"
            )
        return equipment

    @staticmethod
    def update_equipment(db: Session, equipment_id: str, equipment_data: EquipmentUpdate) -> Equipment:
        equipment = EquipmentService.get_equipment_by_id(db, equipment_id)
        update_data = equipment_data.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(equipment, key, value)
        try:
            db.commit()
            db.refresh(equipment)
            return equipment
        except IntegrityError:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Equipment with name '{equipment_data.name}' already exists"
            )
        except Exception as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to update equipment: {str(e)}"
            )

    @staticmethod
    def delete_equipment(db: Session, equipment_id: str) -> dict:
        equipment = EquipmentService.get_equipment_by_id(db, equipment_id)
        db.delete(equipment)
        try:
            db.commit()
            return {"message": f"Equipment with ID {equipment_id} has been deleted"}
        except Exception as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to delete equipment: {str(e)}"
            )
