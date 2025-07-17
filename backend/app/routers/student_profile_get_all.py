from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from schemas.requests.student_profile import StudentProfileCreate, StudentProfileUpdate, StudentProfileImageUpdate
from schemas.responses.student_profile import StudentProfileResponse
from typing import List
from services.student_profile_service import (
    create_student_profile, get_student_profile, update_student_profile, update_student_image, get_student_profile_by_user_id, get_all_student_profiles
)
from db import get_db

router = APIRouter(
    prefix="/student_profile_get_all",
    tags=["student_profile_get_all"]
)


@router.get("/all", response_model=List[StudentProfileResponse])
def get_all(db: Session = Depends(get_db)):
    return get_all_student_profiles(db)
