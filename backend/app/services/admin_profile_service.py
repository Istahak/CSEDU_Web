from sqlalchemy.orm import Session
from uuid import UUID
from models.admin_profile import AdminProfile
from schemas.requests.admin_profile import AdminProfileCreateRequest, AdminProfileUpdateRequest

class AdminProfileService:
    @staticmethod
    def get_admin_profile(db: Session, admin_profile_id: UUID):
        return db.query(AdminProfile).filter(AdminProfile.id == admin_profile_id).first()

    @staticmethod
    def create_admin_profile(db: Session, admin_profile_data: AdminProfileCreateRequest):
        admin_profile = AdminProfile(**admin_profile_data.dict())
        db.add(admin_profile)
        db.commit()
        db.refresh(admin_profile)
        return admin_profile

    @staticmethod
    def update_admin_profile(db: Session, admin_profile_id: UUID, update_data: AdminProfileUpdateRequest):
        admin_profile = db.query(AdminProfile).filter(AdminProfile.id == admin_profile_id).first()
        if not admin_profile:
            return None
        for field, value in update_data.dict(exclude_unset=True).items():
            setattr(admin_profile, field, value)
        db.commit()
        db.refresh(admin_profile)
        return admin_profile
