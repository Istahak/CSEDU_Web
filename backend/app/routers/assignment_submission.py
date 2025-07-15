import os
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, status, Response
from sqlalchemy.orm import Session
from uuid import UUID
from fastapi.responses import FileResponse
from db import get_db
from schemas.assignment_submission import (
    AssignmentSubmissionCreate,
    AssignmentSubmission,
    AssignmentSubmissionList
)
from services.assignment_submission import (
    create_assignment_submission,
    get_assignment_submission,
    get_assignment_submissions_by_assignment,
    get_assignment_submissions_by_student
)
from models.assignment import AssignmentSubmission as AssignmentSubmissionModel

router = APIRouter(prefix="/assignment_submissions", tags=["Assignment Submissions"])

@router.post("/", response_model=AssignmentSubmission, status_code=status.HTTP_201_CREATED)
def submit_assignment(
    assignment_id: UUID,
    student_id: UUID,
    comment: str = None,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    submission_data = AssignmentSubmissionCreate(
        assignment_id=assignment_id,
        student_id=student_id,
        comment=comment
    )
    submission = create_assignment_submission(db, submission_data, file)
    return submission

@router.get("/{submission_id}", response_model=AssignmentSubmission)
def get_submission(submission_id: UUID, db: Session = Depends(get_db)):
    submission = get_assignment_submission(db, submission_id)
    if not submission:
        raise HTTPException(status_code=404, detail="Submission not found")
    return submission

@router.get("/{submission_id}/file")
def download_submission_file(submission_id: UUID, db: Session = Depends(get_db)):
    submission = get_assignment_submission(db, submission_id)
    if not submission:
        raise HTTPException(status_code=404, detail="Submission not found")
    file_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), submission.attached_file)
    if not os.path.isfile(file_path):
        raise HTTPException(status_code=404, detail="File not found")
    return FileResponse(file_path, filename=os.path.basename(file_path))

@router.get("/by-assignment/{assignment_id}", response_model=AssignmentSubmissionList)
def list_submissions_by_assignment(assignment_id: UUID, db: Session = Depends(get_db)):
    submissions = get_assignment_submissions_by_assignment(db, assignment_id)
    return {"submissions": submissions}

@router.get("/by-student/{student_id}", response_model=AssignmentSubmissionList)
def list_submissions_by_student(student_id: UUID, db: Session = Depends(get_db)):
    submissions = get_assignment_submissions_by_student(db, student_id)
    return {"submissions": submissions}
