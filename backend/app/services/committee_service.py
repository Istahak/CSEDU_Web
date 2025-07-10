from typing import List
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from models.committee import Committee
from schemas.requests.committee import CommitteeCreate, CommitteeUpdate
import uuid

class CommitteeService:
    @staticmethod
    def create_committee(db: Session, committee_data: CommitteeCreate) -> Committee:
        try:
            db_committee = Committee(
                committee_name=committee_data.committee_name,
                responsibilities=committee_data.responsibilities,
                weekly_time=committee_data.weekly_time,
                is_active_now=committee_data.is_active_now if committee_data.is_active_now is not None else True,
                functional_year=committee_data.functional_year
            )
            db.add(db_committee)
            db.commit()
            db.refresh(db_committee)
            return db_committee
        except IntegrityError:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Committee with name '{committee_data.committee_name}' already exists"
            )
        except Exception as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to create committee: {str(e)}"
            )

    @staticmethod
    def get_all_committees(db: Session, skip: int = 0, limit: int = 100) -> List[Committee]:
        return db.query(Committee).offset(skip).limit(limit).all()

    @staticmethod
    def get_committee_by_id(db: Session, committee_id: str) -> Committee:
        try:
            committee_uuid = uuid.UUID(committee_id)
        except ValueError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid committee ID format"
            )
        committee = db.query(Committee).filter(Committee.id == committee_uuid).first()
        if not committee:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Committee with ID {committee_id} not found"
            )
        return committee

    @staticmethod
    def update_committee(db: Session, committee_id: str, committee_data: CommitteeUpdate) -> Committee:
        committee = CommitteeService.get_committee_by_id(db, committee_id)
        update_data = committee_data.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(committee, key, value)
        try:
            db.commit()
            db.refresh(committee)
            return committee
        except IntegrityError:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Committee with name '{committee_data.committee_name}' already exists"
            )
        except Exception as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to update committee: {str(e)}"
            )

    @staticmethod
    def delete_committee(db: Session, committee_id: str) -> dict:
        committee = CommitteeService.get_committee_by_id(db, committee_id)
        db.delete(committee)
        try:
            db.commit()
            return {"message": f"Committee with ID {committee_id} has been deleted"}
        except Exception as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to delete committee: {str(e)}"
            )
