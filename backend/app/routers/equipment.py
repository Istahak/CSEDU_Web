from typing import List
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from db import get_db
from models.equipment import Equipment
from schemas.requests.equipment import EquipmentCreate, EquipmentUpdate
from schemas.responses.equipment import EquipmentResponse
from services.equipment_service import EquipmentService

router = APIRouter(
    prefix="/equipments",
    tags=["Equipments"],
    responses={404: {"description": "Not found"}},
)

@router.post("/", response_model=EquipmentResponse, status_code=status.HTTP_201_CREATED)
def create_equipment(
    equipment_data: EquipmentCreate,
    db: Session = Depends(get_db),
):
    """
    Create a new equipment.
    """
    return EquipmentService.create_equipment(db, equipment_data)

@router.get("/", response_model=List[EquipmentResponse])
def get_all_equipments(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
):
    """
    Get all equipments with pagination support.
    """
    return EquipmentService.get_all_equipments(db, skip=skip, limit=limit)

@router.get("/{equipment_id}", response_model=EquipmentResponse)
def get_equipment_by_id(
    equipment_id: str,
    db: Session = Depends(get_db),
):
    """
    Get a specific equipment by ID.
    """
    return EquipmentService.get_equipment_by_id(db, equipment_id)

@router.put("/{equipment_id}", response_model=EquipmentResponse)
def update_equipment(
    equipment_id: str,
    equipment_data: EquipmentUpdate,
    db: Session = Depends(get_db),
):
    """
    Update equipment information.
    """
    return EquipmentService.update_equipment(db, equipment_id, equipment_data)

@router.delete("/{equipment_id}", status_code=status.HTTP_200_OK)
def delete_equipment(
    equipment_id: str,
    db: Session = Depends(get_db),
):
    """
    Delete an equipment.
    """
    return EquipmentService.delete_equipment(db, equipment_id)
