from typing import List
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from db import get_db
from models.course import Course
from schemas.requests.course import CourseCreate, CourseUpdate
from schemas.responses.course import CourseResponse
from services.course_service import CourseService

router = APIRouter(
    prefix="/courses",
    tags=["Courses"],
    responses={404: {"description": "Not found"}},
)


@router.post("/", response_model=CourseResponse, status_code=status.HTTP_201_CREATED)
def create_course(
    course_data: CourseCreate,
    db: Session = Depends(get_db),
):
    """
    Create a new course.
    
    This endpoint accepts a JSON payload with course information, including instructor_id (Faculty ID) and an optional base64 encoded image.
    """
    return CourseService.create_course(db, course_data)


@router.get("/", response_model=List[CourseResponse])
def get_all_courses(
    skip: int = 0, 
    limit: int = 100,
    db: Session = Depends(get_db),
):
    """
    Get all courses with pagination support.
    
    - **skip**: Number of records to skip (for pagination)
    - **limit**: Maximum number of records to return
    """
    return CourseService.get_all_courses(db, skip=skip, limit=limit)


@router.get("/{course_id}", response_model=CourseResponse)
def get_course_by_id(
    course_id: int,
    db: Session = Depends(get_db),
):
    """
    Get a specific course by ID.
    
    - **course_id**: ID of the course to retrieve
    """
    return CourseService.get_course_by_id(db, course_id)


@router.put("/{course_id}", response_model=CourseResponse)
def update_course(
    course_id: int,
    course_data: CourseUpdate,
    db: Session = Depends(get_db),
):
    """
    Update course information.
    
    This endpoint accepts a JSON payload with course fields to update.
    All fields are optional for partial updates.
    """
    return CourseService.update_course(db, course_id, course_data)


@router.delete("/{course_id}", status_code=status.HTTP_200_OK)
def delete_course(
    course_id: int,
    db: Session = Depends(get_db),
):
    """
    Delete a course.
    
    - **course_id**: ID of the course to delete
    """
    return CourseService.delete_course(db, course_id)
