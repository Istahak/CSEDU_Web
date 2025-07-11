from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from db import get_db
from schemas.requests.faculty import FacultyCreate, FacultyUpdate, FacultyImageUpdate
from schemas.responses.faculty import FacultyResponse
from services import faculty_service

router = APIRouter(prefix="/faculty", tags=["Faculty"])

@router.get("/", response_model=List[FacultyResponse])
def get_all_faculty(db: Session = Depends(get_db)):
    return faculty_service.get_all_faculty(db)

@router.get("/{faculty_id}", response_model=FacultyResponse)
def get_faculty_by_id(faculty_id: UUID, db: Session = Depends(get_db)):
    faculty = faculty_service.get_faculty_by_id(db, faculty_id)
    if not faculty:
        raise HTTPException(status_code=404, detail="Faculty not found")
    return faculty

@router.post("/", response_model=FacultyResponse, status_code=201)
def create_faculty(data: FacultyCreate, db: Session = Depends(get_db)):
    return faculty_service.create_faculty(db, data)

@router.put("/{faculty_id}", response_model=FacultyResponse)
def update_faculty(faculty_id: UUID, data: FacultyUpdate, db: Session = Depends(get_db)):
    faculty = faculty_service.update_faculty(db, faculty_id, data)
    if not faculty:
        raise HTTPException(status_code=404, detail="Faculty not found")
    return faculty

@router.delete("/{faculty_id}", status_code=204)
def delete_faculty(faculty_id: UUID, db: Session = Depends(get_db)):
    deleted = faculty_service.delete_faculty(db, faculty_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Faculty not found")
    return None

@router.put("/{faculty_id}/image", response_model=FacultyResponse)
def update_faculty_image(faculty_id: UUID, image_in: FacultyImageUpdate, db: Session = Depends(get_db)):
    faculty = faculty_service.update_faculty_image(db, faculty_id, image_in)
    if not faculty:
        raise HTTPException(status_code=404, detail="Faculty not found")
    return faculty
