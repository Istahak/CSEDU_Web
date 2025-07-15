from typing import List
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from models.committee_member import CommitteeMember
from schemas.requests.committee_member import CommitteeMemberCreate, CommitteeMemberUpdate
import uuid

class CommitteeMemberService:
    @staticmethod
    def create_committee_member(db: Session, member_data: CommitteeMemberCreate) -> CommitteeMember:
        # Check if user exists
        from models.user import User
        from models.committee import Committee
        user = db.query(User).filter(User.id == member_data.user_id).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"User with ID {member_data.user_id} does not exist"
            )
        committee = db.query(Committee).filter(Committee.id == member_data.committee_id).first()
        if not committee:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Committee with ID {member_data.committee_id} does not exist"
            )
        try:
            db_member = CommitteeMember(
                user_id=member_data.user_id,
                committee_id=member_data.committee_id,
                position=member_data.position
            )
            db.add(db_member)
            db.commit()
            db.refresh(db_member)
            return db_member
        except IntegrityError:
            # print()
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"This user is already a member of the committee."
            )
        except Exception as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to add committee member: {str(e)}"
            )

    @staticmethod
    def get_all_committee_members(db: Session, skip: int = 0, limit: int = 100) -> List[CommitteeMember]:
        return db.query(CommitteeMember).offset(skip).limit(limit).all()

    @staticmethod
    def get_committee_member_by_id(db: Session, member_id: str) -> CommitteeMember:
        try:
            member_uuid = uuid.UUID(member_id)
        except ValueError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid committee member ID format"
            )
        member = db.query(CommitteeMember).filter(CommitteeMember.id == member_uuid).first()
        if not member:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Committee member with ID {member_id} not found"
            )
        return member

    @staticmethod
    def update_committee_member(db: Session, member_id: str, member_data: CommitteeMemberUpdate) -> CommitteeMember:
        member = CommitteeMemberService.get_committee_member_by_id(db, member_id)
        update_data = member_data.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(member, key, value)
        try:
            db.commit()
            db.refresh(member)
            return member
        except IntegrityError:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Failed to update committee member (likely duplicate)"
            )
        except Exception as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to update committee member: {str(e)}"
            )

    @staticmethod
    def delete_committee_member(db: Session, member_id: str) -> dict:
        member = CommitteeMemberService.get_committee_member_by_id(db, member_id)
        db.delete(member)
        try:
            db.commit()
            return {"message": f"Committee member with ID {member_id} has been deleted"}
        except Exception as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to delete committee member: {str(e)}"
            )
