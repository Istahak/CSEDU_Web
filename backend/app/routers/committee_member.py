from typing import List
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from db import get_db
from models.committee_member import CommitteeMember
from schemas.requests.committee_member import CommitteeMemberCreate, CommitteeMemberUpdate
from schemas.responses.committee_member import CommitteeMemberResponse
from services.committee_member_service import CommitteeMemberService

router = APIRouter(
    prefix="/committee-members",
    tags=["Committee Members"],
    responses={404: {"description": "Not found"}},
)

@router.post("/", response_model=CommitteeMemberResponse, status_code=status.HTTP_201_CREATED)
def create_committee_member(
    member_data: CommitteeMemberCreate,
    db: Session = Depends(get_db),
):
    """
    Add a new committee member.
    """
    return CommitteeMemberService.create_committee_member(db, member_data)

@router.get("/", response_model=List[CommitteeMemberResponse])
def get_all_committee_members(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
):
    """
    Get all committee members with pagination support.
    """
    return CommitteeMemberService.get_all_committee_members(db, skip=skip, limit=limit)

@router.get("/{member_id}", response_model=CommitteeMemberResponse)
def get_committee_member_by_id(
    member_id: str,
    db: Session = Depends(get_db),
):
    """
    Get a specific committee member by ID.
    """
    return CommitteeMemberService.get_committee_member_by_id(db, member_id)

@router.put("/{member_id}", response_model=CommitteeMemberResponse)
def update_committee_member(
    member_id: str,
    member_data: CommitteeMemberUpdate,
    db: Session = Depends(get_db),
):
    """
    Update committee member information.
    """
    return CommitteeMemberService.update_committee_member(db, member_id, member_data)

@router.delete("/{member_id}", status_code=status.HTTP_200_OK)
def delete_committee_member(
    member_id: str,
    db: Session = Depends(get_db),
):
    """
    Delete a committee member.
    """
    return CommitteeMemberService.delete_committee_member(db, member_id)
