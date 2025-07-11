from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from db import get_db
from schemas.grade import Grade, GradeCreate, GradeUpdate, GradeList
from services import grade_service

router = APIRouter(
    prefix="/grades",
    tags=["grades"]
)

@router.post("/", response_model=Grade, status_code=status.HTTP_201_CREATED)
def create_grade(grade_in: GradeCreate, db: Session = Depends(get_db)):
    return grade_service.create_grade(db, grade_in)

@router.get("/", response_model=List[Grade])
def list_grades(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return grade_service.get_grades(db, skip=skip, limit=limit)

@router.get("/{grade_id}", response_model=Grade)
def get_grade(grade_id: UUID, db: Session = Depends(get_db)):
    grade = grade_service.get_grade(db, grade_id)
    if not grade:
        raise HTTPException(status_code=404, detail="Grade not found")
    return grade

@router.put("/{grade_id}", response_model=Grade)
def update_grade(grade_id: UUID, grade_in: GradeUpdate, db: Session = Depends(get_db)):
    grade = grade_service.get_grade(db, grade_id)
    if not grade:
        raise HTTPException(status_code=404, detail="Grade not found")
    return grade_service.update_grade(db, grade, grade_in)

@router.delete("/{grade_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_grade(grade_id: UUID, db: Session = Depends(get_db)):
    grade = grade_service.get_grade(db, grade_id)
    if not grade:
        raise HTTPException(status_code=404, detail="Grade not found")
    grade_service.delete_grade(db, grade)
    return None

@router.get("/by-course/{course_id}", response_model=GradeList)
def get_grades_by_course(course_id: UUID, db: Session = Depends(get_db)):
    grades = grade_service.get_grades_by_course(db, course_id)
    return {"grades": grades}

@router.get("/by-student/{student_id}", response_model=GradeList)
def get_grades_by_student(student_id: UUID, db: Session = Depends(get_db)):
    grades = grade_service.get_grades_by_student(db, student_id)
    return {"grades": grades}

@router.get("/by-course-student/", response_model=Grade)
def get_grade_by_course_and_student(course_id: UUID, student_id: UUID, db: Session = Depends(get_db)):
    grade = grade_service.get_grade_by_course_and_student(db, course_id, student_id)
    if not grade:
        raise HTTPException(status_code=404, detail="Grade not found for this course and student")
    return grade
