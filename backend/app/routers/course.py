from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from db import get_db
from services import course_service
from schemas.requests.course import CourseCreate, CourseUpdate
from schemas.responses.course import CourseResponse

router = APIRouter(
    prefix="/courses",
    tags=["courses"]
)

@router.get("/", response_model=List[CourseResponse])
def list_courses(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    courses = course_service.get_courses(db, skip=skip, limit=limit)
    return courses

@router.get("/filter/semester", response_model=List[CourseResponse])
def filter_courses_by_semester(semester: str, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return course_service.filter_courses_by_semester(db, semester, skip=skip, limit=limit)

@router.get("/filter/instructor", response_model=List[CourseResponse])
def filter_courses_by_instructor(instructor_id: UUID, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return course_service.filter_courses_by_instructor(db, instructor_id, skip=skip, limit=limit)

@router.get("/filter/classroom", response_model=List[CourseResponse])
def filter_courses_by_classroom(classroom_id: UUID, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return course_service.filter_courses_by_classroom(db, classroom_id, skip=skip, limit=limit)

@router.get("/{course_id}", response_model=CourseResponse)
def get_course(course_id: UUID, db: Session = Depends(get_db)):
    course = course_service.get_course(db, course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course

@router.post("/", response_model=CourseResponse, status_code=status.HTTP_201_CREATED)
def create_course(course_in: CourseCreate, db: Session = Depends(get_db)):
    existing = course_service.get_course_by_code(db, course_in.course_code)
    if existing:
        raise HTTPException(status_code=400, detail="Course code already exists")
    return course_service.create_course(db, course_in)

@router.put("/{course_id}", response_model=CourseResponse)
def update_course(course_id: UUID, course_in: CourseUpdate, db: Session = Depends(get_db)):
    course = course_service.get_course(db, course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course_service.update_course(db, course, course_in)

@router.delete("/{course_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_course(course_id: UUID, db: Session = Depends(get_db)):
    course = course_service.get_course(db, course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    course_service.delete_course(db, course)
    return None

from services.student_profile_service import get_students_by_semester
from models.course import Course
from schemas.responses.student_profile import StudentProfileResponse

@router.get("/{course_id}/students", response_model=List[StudentProfileResponse])
def get_students_in_course(course_id: UUID, db: Session = Depends(get_db)):
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    semester = course.semester
    students = get_students_by_semester(db, semester)
    return students
