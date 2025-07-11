from sqlalchemy.orm import Session
from uuid import UUID
from typing import List, Optional
from models.attendance import Attendance
from schemas.requests.attendance import AttendanceCreate, AttendanceUpdate
from datetime import date
from sqlalchemy import func

def get_all_attendance(db: Session) -> List[Attendance]:
    return db.query(Attendance).all()

def get_attendance_by_course(db: Session, course_id: UUID) -> List[Attendance]:
    return db.query(Attendance).filter(Attendance.course_id == course_id).all()

def get_attendance_by_student(db: Session, student_id: UUID) -> List[Attendance]:
    return db.query(Attendance).filter(Attendance.student_id == student_id).all()

def get_attendance_by_date(db: Session, attendance_date: date) -> List[Attendance]:
    return db.query(Attendance).filter(Attendance.date == attendance_date).all()

def get_attendance_by_status(db: Session, is_present: bool) -> List[Attendance]:
    return db.query(Attendance).filter(Attendance.is_present_on_that_day == is_present).all()

def get_attendance_by_filters(db: Session, course_id: Optional[UUID] = None, student_id: Optional[UUID] = None, attendance_date: Optional[date] = None, is_present: Optional[bool] = None) -> List[Attendance]:
    q = db.query(Attendance)
    if course_id:
        q = q.filter(Attendance.course_id == course_id)
    if student_id:
        q = q.filter(Attendance.student_id == student_id)
    if attendance_date:
        q = q.filter(Attendance.date == attendance_date)
    if is_present is not None:
        q = q.filter(Attendance.is_present_on_that_day == is_present)
    return q.all()

def create_attendance(db: Session, data: AttendanceCreate) -> Attendance:
    attendance = Attendance(**data.dict())
    db.add(attendance)
    db.commit()
    db.refresh(attendance)
    return attendance

def update_attendance(db: Session, attendance_id: UUID, data: AttendanceUpdate) -> Optional[Attendance]:
    attendance = db.query(Attendance).filter(Attendance.id == attendance_id).first()
    if not attendance:
        return None
    for key, value in data.dict(exclude_unset=True).items():
        setattr(attendance, key, value)
    db.commit()
    db.refresh(attendance)
    return attendance

def delete_attendance(db: Session, attendance_id: UUID) -> bool:
    attendance = db.query(Attendance).filter(Attendance.id == attendance_id).first()
    if not attendance:
        return False
    db.delete(attendance)
    db.commit()
    return True

def get_course_attendance_summary(db: Session, course_id: UUID):
    total_classes_held = db.query(func.count(Attendance.id)).filter(Attendance.course_id == course_id).scalar()
    total_present = db.query(func.count(Attendance.id)).filter(Attendance.course_id == course_id, Attendance.is_present_on_that_day == True).scalar()
    total_absent = db.query(func.count(Attendance.id)).filter(Attendance.course_id == course_id, Attendance.is_present_on_that_day == False).scalar()
    percentage = (total_present / total_classes_held * 100) if total_classes_held else 0.0
    return {
        "course_id": course_id,
        "total_classes_held": total_classes_held,
        "total_present": total_present,
        "total_absent": total_absent,
        "attendance_percentage": percentage
    }

def get_student_course_attendance_summary(db: Session, student_id: UUID, course_id: UUID):
    # Count total unique class dates for this course
    total_classes_held = db.query(Attendance.date).filter(
        Attendance.course_id == course_id
    ).distinct().count()
    
    # Count dates when student was present
    total_present = db.query(func.count(Attendance.id)).filter(
        Attendance.course_id == course_id, 
        Attendance.student_id == student_id, 
        Attendance.is_present_on_that_day == True
    ).scalar() or 0
    
    # Count dates when student was absent
    total_absent = db.query(func.count(Attendance.id)).filter(
        Attendance.course_id == course_id, 
        Attendance.student_id == student_id, 
        Attendance.is_present_on_that_day == False
    ).scalar() or 0
    
    # Calculate actual attendance records for this student
    student_attendance_records = total_present + total_absent
    
    # Calculate percentage based on the classes the student has attendance records for
    percentage = (total_present / student_attendance_records * 100) if student_attendance_records > 0 else 0.0
    
    return {
        "course_id": course_id,
        "student_id": student_id,
        "total_classes_held": total_classes_held,
        "student_attendance_records": student_attendance_records,
        "total_present": total_present,
        "total_absent": total_absent,
        "attendance_percentage": round(percentage, 2)
    }
def get_student_all_courses_attendance_summary(db: Session, student_id: UUID):
    # Group by course_id
    from collections import defaultdict
    summary = []
    course_ids = db.query(Attendance.course_id).filter(Attendance.student_id == student_id).distinct()
    for (course_id,) in course_ids:
        course_summary = get_student_course_attendance_summary(db, student_id, course_id)
        summary.append(course_summary)
    # Overall summary
    total_classes_held = db.query(func.count(Attendance.id)).filter(Attendance.student_id == student_id).scalar()
    total_present = db.query(func.count(Attendance.id)).filter(Attendance.student_id == student_id, Attendance.is_present_on_that_day == True).scalar()
    total_absent = db.query(func.count(Attendance.id)).filter(Attendance.student_id == student_id, Attendance.is_present_on_that_day == False).scalar()
    percentage = (total_present / total_classes_held * 100) if total_classes_held else 0.0
    overall = {
        "student_id": student_id,
        "total_classes_held": total_classes_held,
        "total_present": total_present,
        "total_absent": total_absent,
        "attendance_percentage": percentage,
        "per_course": summary
    }
    return overall
