from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from datetime import datetime

from db import get_db
from models.assignment import Assignment
from schemas.assignment import Assignment, AssignmentCreate, AssignmentUpdate, AssignmentList
from services.assignment_service import (
    create_assignment, get_assignment, get_assignments, update_assignment, delete_assignment,
    get_assignments_by_course, get_active_assignments_by_course, get_pending_assignments_for_student,
    get_submitted_assignments_for_student, get_missing_assignments_for_student
)

router = APIRouter(prefix="/assignments", tags=["Assignments"])

@router.post("/", response_model=Assignment, status_code=status.HTTP_201_CREATED)
def create(assignment: AssignmentCreate, db: Session = Depends(get_db)):
    return create_assignment(db, assignment)

@router.get("/", response_model=List[Assignment])
def read_all(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return get_assignments(db, skip=skip, limit=limit)

@router.get("/{assignment_id}", response_model=Assignment)
def read(assignment_id: UUID, db: Session = Depends(get_db)):
    db_assignment = get_assignment(db, assignment_id)
    if not db_assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")
    return db_assignment

@router.put("/{assignment_id}", response_model=Assignment)
def update(assignment_id: UUID, assignment_update: AssignmentUpdate, db: Session = Depends(get_db)):
    db_assignment = update_assignment(db, assignment_id, assignment_update)
    if not db_assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")
    return db_assignment

@router.delete("/{assignment_id}", response_model=Assignment)
def delete(assignment_id: UUID, db: Session = Depends(get_db)):
    db_assignment = delete_assignment(db, assignment_id)
    if not db_assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")
    return db_assignment

@router.get("/by-course/{course_id}", response_model=List[Assignment])
def read_by_course(course_id: UUID, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return get_assignments_by_course(db, course_id, skip=skip, limit=limit)

@router.get("/active/by-course/{course_id}", response_model=List[Assignment])
def read_active_by_course(course_id: UUID, db: Session = Depends(get_db)):
    return get_active_assignments_by_course(db, course_id)

# New endpoints for student assignment management

@router.get("/student/{student_id}/pending", response_model=List[Assignment])
def get_student_pending_assignments(student_id: UUID, db: Session = Depends(get_db)):
    """
    Get current assignments of a student that are pending (not submitted and due date >= current date)
    """
    return get_pending_assignments_for_student(db, student_id)

@router.get("/student/{student_id}/submitted", response_model=List[Assignment])
def get_student_submitted_assignments(student_id: UUID, db: Session = Depends(get_db)):
    """
    Get assignments that have been submitted by the student
    """
    return get_submitted_assignments_for_student(db, student_id)

@router.get("/student/{student_id}/missing", response_model=List[Assignment])
def get_student_missing_assignments(student_id: UUID, db: Session = Depends(get_db)):
    """
    Get assignments that are missing (past due date and not submitted)
    """
    return get_missing_assignments_for_student(db, student_id)
