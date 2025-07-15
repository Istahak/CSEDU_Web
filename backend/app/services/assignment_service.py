from sqlalchemy.orm import Session
from sqlalchemy import and_, not_, exists, select
from datetime import datetime
from models.assignment import Assignment, AssignmentSubmission
from models.course import Course
from models.student_profile import StudentProfile
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

# New functions for student assignment management

def get_pending_assignments_for_student(db: Session, student_id: UUID):
    """
    Get current assignments of a student that are pending (not submitted and due date >= current date)
    """
    now = datetime.utcnow()
    
    # Get the student's semester
    student = db.query(StudentProfile).filter(StudentProfile.id == student_id).first()
    if not student or not student.semester:
        return []
    
    # Find courses in the same semester
    courses_in_semester = db.query(Course).filter(Course.semester == student.semester).all()
    course_ids = [course.id for course in courses_in_semester]
    
    if not course_ids:
        return []
    
    # Find assignments for these courses that are not submitted by the student and due date is in the future
    pending_assignments = db.query(Assignment).filter(
        Assignment.course_id.in_(course_ids),
        Assignment.due_date >= now,
        ~exists().where(
            and_(
                AssignmentSubmission.assignment_id == Assignment.id,
                AssignmentSubmission.student_id == student_id
            )
        )
    ).all()
    
    return pending_assignments

def get_submitted_assignments_for_student(db: Session, student_id: UUID):
    """
    Get assignments that have been submitted by the student
    """
    # Get the student's semester
    student = db.query(StudentProfile).filter(StudentProfile.id == student_id).first()
    if not student or not student.semester:
        return []
    
    # Find courses in the same semester
    courses_in_semester = db.query(Course).filter(Course.semester == student.semester).all()
    course_ids = [course.id for course in courses_in_semester]
    
    if not course_ids:
        return []
    
    # Find assignments that have been submitted by the student
    submitted_assignments = db.query(Assignment).join(
        AssignmentSubmission,
        and_(
            AssignmentSubmission.assignment_id == Assignment.id,
            AssignmentSubmission.student_id == student_id
        )
    ).filter(Assignment.course_id.in_(course_ids)).all()
    
    return submitted_assignments

def get_missing_assignments_for_student(db: Session, student_id: UUID):
    """
    Get assignments that are missing (past due date and not submitted)
    """
    now = datetime.utcnow()
    
    # Get the student's semester
    student = db.query(StudentProfile).filter(StudentProfile.id == student_id).first()
    if not student or not student.semester:
        return []
    
    # Find courses in the same semester
    courses_in_semester = db.query(Course).filter(Course.semester == student.semester).all()
    course_ids = [course.id for course in courses_in_semester]
    
    if not course_ids:
        return []
    
    # Find assignments that are past due and not submitted by the student
    missing_assignments = db.query(Assignment).filter(
        Assignment.course_id.in_(course_ids),
        Assignment.due_date < now,
        ~exists().where(
            and_(
                AssignmentSubmission.assignment_id == Assignment.id,
                AssignmentSubmission.student_id == student_id
            )
        )
    ).all()
    
    return missing_assignments
