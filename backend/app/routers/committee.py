from typing import List
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from db import get_db
from models.committee import Committee
from schemas.requests.committee import CommitteeCreate, CommitteeUpdate
from schemas.responses.committee import CommitteeResponse
from services.committee_service import CommitteeService

router = APIRouter(
    prefix="/committees",
    tags=["Committees"],
    responses={404: {"description": "Not found"}},
)

@router.post("/", response_model=CommitteeResponse, status_code=status.HTTP_201_CREATED)
def create_committee(
    committee_data: CommitteeCreate,
    db: Session = Depends(get_db),
):
    """
    Create a new committee.
    """
    return CommitteeService.create_committee(db, committee_data)

@router.get("/", response_model=List[CommitteeResponse])
def get_all_committees(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
):
    """
    Get all committees with pagination support.
    """
    return CommitteeService.get_all_committees(db, skip=skip, limit=limit)

@router.get("/{committee_id}", response_model=CommitteeResponse)
def get_committee_by_id(
    committee_id: str,
    db: Session = Depends(get_db),
):
    """
    Get a specific committee by ID.
    """
    return CommitteeService.get_committee_by_id(db, committee_id)

@router.put("/{committee_id}", response_model=CommitteeResponse)
def update_committee(
    committee_id: str,
    committee_data: CommitteeUpdate,
    db: Session = Depends(get_db),
):
    """
    Update committee information.
    """
    return CommitteeService.update_committee(db, committee_id, committee_data)

@router.delete("/{committee_id}", status_code=status.HTTP_200_OK)
def delete_committee(
    committee_id: str,
    db: Session = Depends(get_db),
):
    """
    Delete a committee.
    """
    return CommitteeService.delete_committee(db, committee_id)
