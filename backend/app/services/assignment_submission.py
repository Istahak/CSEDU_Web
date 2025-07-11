import os
from datetime import datetime
from uuid import UUID
from sqlalchemy.orm import Session
from fastapi import UploadFile
from models.assignment import AssignmentSubmission
from schemas.assignment_submission import AssignmentSubmissionCreate

FILES_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "files")
os.makedirs(FILES_DIR, exist_ok=True)

def save_submission_file(file: UploadFile) -> str:
    file_ext = os.path.splitext(file.filename)[1]
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S%f")
    file_path = os.path.join(FILES_DIR, f"submission_{timestamp}{file_ext}")
    with open(file_path, "wb") as out_file:
        out_file.write(file.file.read())
    return os.path.relpath(file_path, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

def create_assignment_submission(db: Session, submission_data: AssignmentSubmissionCreate, file: UploadFile) -> AssignmentSubmission:
    file_path = save_submission_file(file)
    db_submission = AssignmentSubmission(
        assignment_id=submission_data.assignment_id,
        student_id=submission_data.student_id,
        comment=submission_data.comment,
        attached_file=file_path,
        submission_time=datetime.now()
    )
    db.add(db_submission)
    db.commit()
    db.refresh(db_submission)
    return db_submission

def get_assignment_submission(db: Session, submission_id: UUID) -> AssignmentSubmission:
    return db.query(AssignmentSubmission).filter(AssignmentSubmission.id == submission_id).first()

def get_assignment_submissions_by_assignment(db: Session, assignment_id: UUID):
    return db.query(AssignmentSubmission).filter(AssignmentSubmission.assignment_id == assignment_id).all()

def get_assignment_submissions_by_student(db: Session, student_id: UUID):
    return db.query(AssignmentSubmission).filter(AssignmentSubmission.student_id == student_id).all()
