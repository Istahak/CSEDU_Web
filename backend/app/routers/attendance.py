from fastapi import APIRouter, HTTPException, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from uuid import UUID
from db import get_db
from schemas.requests.attendance import AttendanceCreate, AttendanceUpdate
from schemas.responses.attendance import AttendanceResponse, AttendanceSummaryResponse
from services import attendance_service
from datetime import date

router = APIRouter(prefix="/attendance", tags=["Attendance"])

@router.get("/", response_model=List[AttendanceResponse])
def get_all_attendance(db: Session = Depends(get_db)):
    return attendance_service.get_all_attendance(db)

@router.get("/by-course/{course_id}", response_model=List[AttendanceResponse])
def get_attendance_by_course(course_id: UUID, db: Session = Depends(get_db)):
    return attendance_service.get_attendance_by_course(db, course_id)

@router.get("/by-student/{student_id}", response_model=List[AttendanceResponse])
def get_attendance_by_student(student_id: UUID, db: Session = Depends(get_db)):
    return attendance_service.get_attendance_by_student(db, student_id)

@router.get("/by-date/{attendance_date}", response_model=List[AttendanceResponse])
def get_attendance_by_date(attendance_date: date, db: Session = Depends(get_db)):
    return attendance_service.get_attendance_by_date(db, attendance_date)

@router.get("/by-status", response_model=List[AttendanceResponse])
def get_attendance_by_status(
    course_id: Optional[UUID] = Query(None),
    student_id: Optional[UUID] = Query(None),
    attendance_date: Optional[date] = Query(None),
    is_present: Optional[bool] = Query(None),
    db: Session = Depends(get_db),
):
    return attendance_service.get_attendance_by_filters(db, course_id, student_id, attendance_date, is_present)

@router.post("/", response_model=AttendanceResponse, status_code=201)
def create_attendance(data: AttendanceCreate, db: Session = Depends(get_db)):
    return attendance_service.create_attendance(db, data)

@router.put("/{attendance_id}", response_model=AttendanceResponse)
def update_attendance(attendance_id: UUID, data: AttendanceUpdate, db: Session = Depends(get_db)):
    att = attendance_service.update_attendance(db, attendance_id, data)
    if not att:
        raise HTTPException(status_code=404, detail="Attendance record not found")
    return att

@router.delete("/{attendance_id}", status_code=204)
def delete_attendance(attendance_id: UUID, db: Session = Depends(get_db)):
    deleted = attendance_service.delete_attendance(db, attendance_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Attendance record not found")
    return None

# @router.get("/summary/course/{course_id}", response_model=AttendanceSummaryResponse)
# def course_attendance_summary(course_id: UUID, db: Session = Depends(get_db)):
#     return attendance_service.get_course_attendance_summary(db, course_id)

# @router.get("/summary/student/{student_id}/course/{course_id}", response_model=AttendanceSummaryResponse)
# def student_course_attendance_summary(student_id: UUID, course_id: UUID, db: Session = Depends(get_db)):
#     return attendance_service.get_student_course_attendance_summary(db, student_id, course_id)

@router.get("/summary/student/{student_id}")
def student_all_courses_attendance_summary(student_id: UUID, db: Session = Depends(get_db)):
    return attendance_service.get_student_all_courses_attendance_summary(db, student_id)
