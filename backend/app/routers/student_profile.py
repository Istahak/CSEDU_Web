from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from schemas.requests.student_profile import StudentProfileCreate, StudentProfileUpdate, StudentProfileImageUpdate
from schemas.responses.student_profile import StudentProfileResponse
from services.student_profile_service import (
    create_student_profile, get_student_profile, update_student_profile, update_student_image
)
from db import get_db

router = APIRouter(
    prefix="/student_profile",
    tags=["student_profile"]
)

@router.post("/", response_model=StudentProfileResponse)
def create(profile_in: StudentProfileCreate, db: Session = Depends(get_db)):
    return create_student_profile(db, profile_in)

@router.get("/{profile_id}", response_model=StudentProfileResponse)
def get(profile_id: str, db: Session = Depends(get_db)):
    return get_student_profile(db, profile_id)

@router.put("/{profile_id}", response_model=StudentProfileResponse)
def update(profile_id: str, profile_in: StudentProfileUpdate, db: Session = Depends(get_db)):
    return update_student_profile(db, profile_id, profile_in)

@router.put("/{profile_id}/image", response_model=StudentProfileResponse)
def update_image(profile_id: str, image_in: StudentProfileImageUpdate, db: Session = Depends(get_db)):
    return update_student_image(db, profile_id, image_in)
