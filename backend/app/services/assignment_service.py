from sqlalchemy.orm import Session
from sqlalchemy import and_
from datetime import datetime
from models.assignment import Assignment
from schemas.assignment import AssignmentCreate, AssignmentUpdate
from uuid import UUID

# CRUD

def create_assignment(db: Session, assignment: AssignmentCreate):
    db_assignment = Assignment(**assignment.dict())
    db.add(db_assignment)
    db.commit()
    db.refresh(db_assignment)
    return db_assignment

def get_assignment(db: Session, assignment_id: UUID):
    return db.query(Assignment).filter(Assignment.id == assignment_id).first()

def get_assignments(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Assignment).offset(skip).limit(limit).all()

def update_assignment(db: Session, assignment_id: UUID, assignment_update: AssignmentUpdate):
    db_assignment = db.query(Assignment).filter(Assignment.id == assignment_id).first()
    if not db_assignment:
        return None
    for field, value in assignment_update.dict(exclude_unset=True).items():
        setattr(db_assignment, field, value)
    db.commit()
    db.refresh(db_assignment)
    return db_assignment

def delete_assignment(db: Session, assignment_id: UUID):
    db_assignment = db.query(Assignment).filter(Assignment.id == assignment_id).first()
    if db_assignment:
        db.delete(db_assignment)
        db.commit()
    return db_assignment

def get_assignments_by_course(db: Session, course_id: UUID, skip: int = 0, limit: int = 100):
    return db.query(Assignment).filter(Assignment.course_id == course_id).offset(skip).limit(limit).all()

def get_active_assignments_by_course(db: Session, course_id: UUID, now: datetime = None):
    if now is None:
        now = datetime.utcnow()
    return db.query(Assignment).filter(and_(Assignment.course_id == course_id, Assignment.due_date >= now)).all()
