from typing import List
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from db import get_db
from models.classroom import Classroom
from schemas.requests.classroom import ClassroomCreate, ClassroomUpdate
from schemas.responses.classroom import ClassroomResponse
from services.classroom_service import ClassroomService

router = APIRouter(
    prefix="/classrooms",
    tags=["Classrooms"],
    responses={404: {"description": "Not found"}},
)

@router.post("/", response_model=ClassroomResponse, status_code=status.HTTP_201_CREATED)
def create_classroom(
    classroom_data: ClassroomCreate,
    db: Session = Depends(get_db),
):
    """
    Create a new classroom.
    """
    return ClassroomService.create_classroom(db, classroom_data)

@router.get("/", response_model=List[ClassroomResponse])
def get_all_classrooms(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
):
    """
    Get all classrooms with pagination support.
    """
    return ClassroomService.get_all_classrooms(db, skip=skip, limit=limit)

@router.get("/by-id/{classroom_id}", response_model=ClassroomResponse)
def get_classroom_by_id(
    classroom_id: str,
    db: Session = Depends(get_db),
):
    """
    Get a specific classroom by ID.
    """
    return ClassroomService.get_classroom_by_id(db, classroom_id)

@router.put("/{classroom_id}", response_model=ClassroomResponse)
def update_classroom(
    classroom_id: str,
    classroom_data: ClassroomUpdate,
    db: Session = Depends(get_db),
):
    """
    Update classroom information.
    """
    return ClassroomService.update_classroom(db, classroom_id, classroom_data)

@router.delete("/{classroom_id}", status_code=status.HTTP_200_OK)
def delete_classroom(
    classroom_id: str,
    db: Session = Depends(get_db),
):
    """
    Delete a classroom.
    """
    return ClassroomService.delete_classroom(db, classroom_id)
