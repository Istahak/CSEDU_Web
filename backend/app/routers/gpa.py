import uuid
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db import get_db
from services.grade_service import calculate_gpa_for_semester_by_student_string_id
from schemas.gpa import GPAResponse

router = APIRouter(prefix="/gpa", tags=["gpa"])

from services.grade_service import calculate_academic_records_by_student_id
from schemas.gpa import AcademicRecordResponse

@router.get("/academic-records/", response_model=list[AcademicRecordResponse])
def get_academic_records(student_id: uuid.UUID, db: Session = Depends(get_db)):
    records = calculate_academic_records_by_student_id(db, student_id)
    return records

@router.get("/", response_model=GPAResponse)
def get_gpa(student_id: uuid.UUID, semester: str, db: Session = Depends(get_db)):
    gpa = calculate_gpa_for_semester_by_student_string_id(db, student_id, semester)
    if gpa is None:
        raise HTTPException(status_code=404, detail="No grades or credits found for this student and semester")
    return GPAResponse(student_id=student_id, semester=semester, gpa=gpa)
