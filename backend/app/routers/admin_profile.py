from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID
from schemas.requests.admin_profile import AdminProfileCreateRequest, AdminProfileUpdateRequest
from schemas.responses.admin_profile import AdminProfileResponse
from services.admin_profile_service import AdminProfileService
from db import get_db

router = APIRouter(prefix="/api/v1/admin-profiles", tags=["Admin Profiles"])

@router.get("/{admin_profile_id}", response_model=AdminProfileResponse)
def get_admin_profile(admin_profile_id: UUID, db: Session = Depends(get_db)):
    admin_profile = AdminProfileService.get_admin_profile(db, admin_profile_id)
    if not admin_profile:
        raise HTTPException(status_code=404, detail="Admin Profile not found")
    return admin_profile

@router.post("/", response_model=AdminProfileResponse)
def create_admin_profile(request: AdminProfileCreateRequest, db: Session = Depends(get_db)):
    return AdminProfileService.create_admin_profile(db, request)

@router.put("/{admin_profile_id}", response_model=AdminProfileResponse)
def update_admin_profile(admin_profile_id: UUID, request: AdminProfileUpdateRequest, db: Session = Depends(get_db)):
    admin_profile = AdminProfileService.update_admin_profile(db, admin_profile_id, request)
    if not admin_profile:
        raise HTTPException(status_code=404, detail="Admin Profile not found")
    return admin_profile
