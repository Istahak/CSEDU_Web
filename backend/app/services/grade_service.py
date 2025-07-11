from typing import List, Optional
from uuid import UUID
from sqlalchemy.orm import Session
from models.grade import Grade
from models.course import Course
from models.student_profile import StudentProfile
from schemas.grade import GradeCreate, GradeUpdate

def create_grade(db: Session, grade_in: GradeCreate) -> Grade:
    grade = Grade(**grade_in.dict())
    db.add(grade)
    db.commit()
    db.refresh(grade)
    return grade

def get_grade(db: Session, grade_id: UUID) -> Optional[Grade]:
    return db.query(Grade).filter(Grade.id == grade_id).first()

def get_grades(db: Session, skip: int = 0, limit: int = 100) -> List[Grade]:
    return db.query(Grade).offset(skip).limit(limit).all()

def get_grades_by_course(db: Session, course_id: UUID) -> List[Grade]:
    return db.query(Grade).filter(Grade.course_id == course_id).all()

def get_grades_by_student(db: Session, student_id: UUID) -> List[Grade]:
    return db.query(Grade).filter(Grade.student_id == student_id).all()

def get_grade_by_course_and_student(db: Session, course_id: UUID, student_id: UUID) -> Optional[Grade]:
    return db.query(Grade).filter(Grade.course_id == course_id, Grade.student_id == student_id).first()

def update_grade(db: Session, grade: Grade, grade_in: GradeUpdate) -> Grade:
    for attr, value in grade_in.dict(exclude_unset=True).items():
        setattr(grade, attr, value)
    db.commit()
    db.refresh(grade)
    return grade

def delete_grade(db: Session, grade: Grade):
    db.delete(grade)
    db.commit()

def calculate_gpa_for_semester(db: Session, student_uuid: str, semester: str) -> float:
    query = db.query(Grade, Course).join(Course, Grade.course_id == Course.id)
    query = query.filter(Grade.student_id == student_uuid, Course.semester == semester)
    results = query.all()
    total_points = 0.0
    total_credits = 0.0
    for grade, course in results:
        if grade.grade is not None and course.credit is not None:
            total_points += grade.grade * course.credit
            total_credits += course.credit
    if total_credits == 0:
        return 4.0
    return total_points / total_credits

def calculate_gpa_for_semester_by_student_string_id(db: Session, student_id: str, semester: str) -> float:
    student_profile = db.query(StudentProfile).filter(StudentProfile.student_id == student_id).first()
    if not student_profile:
        return 4.0
    return calculate_gpa_for_semester(db, str(student_profile.id), semester)
