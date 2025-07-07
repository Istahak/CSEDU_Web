from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from dependency import get_db_session
from services import homepage as homepage_service
from schemas.requests.homepage import (
    OverviewCreate, OverviewUpdate,
    AnnouncementCreate, AnnouncementUpdate,
    AnnouncementTypeCreate, AnnouncementTypeUpdate,
    QuickLinkCreate, QuickLinkUpdate
)
from schemas.responses.homepage import (
    HomepageResponse, OverviewResponse, 
    AnnouncementResponse, AnnouncementTypeResponse,
    QuickLinkResponse
)

router = APIRouter(
    prefix="/homepage",
    tags=["homepage"]
)

# Combined homepage endpoints
@router.get("/all", response_model=HomepageResponse)
def get_all_homepage_data(db: Session = Depends(get_db_session)):
    """Get all homepage data (overview, announcements, quick links)"""
    return homepage_service.get_all_homepage_data(db)

# Overview endpoints
@router.get("/overview", response_model=OverviewResponse)
def get_overview(db: Session = Depends(get_db_session)):
    """Get the active overview"""
    overview = homepage_service.get_active_overview(db)
    if not overview:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No active overview found")
    return overview

@router.post("/overview", response_model=OverviewResponse, status_code=status.HTTP_201_CREATED)
def create_overview(overview: OverviewCreate, db: Session = Depends(get_db_session)):
    """Create a new overview"""
    return homepage_service.create_overview(db, overview)

@router.put("/overview/{overview_id}", response_model=OverviewResponse)
def update_overview(overview_id: int, overview: OverviewUpdate, db: Session = Depends(get_db_session)):
    """Update an existing overview"""
    return homepage_service.update_overview(db, overview_id, overview)

# Announcement Type endpoints
@router.get("/announcement-types", response_model=List[AnnouncementTypeResponse])
def get_announcement_types(skip: int = 0, limit: int = 100, db: Session = Depends(get_db_session)):
    """Get all announcement types"""
    return homepage_service.get_announcement_types(db, skip, limit)

@router.get("/announcement-types/{type_id}", response_model=AnnouncementTypeResponse)
def get_announcement_type(type_id: int, db: Session = Depends(get_db_session)):
    """Get a specific announcement type by ID"""
    announcement_type = homepage_service.get_announcement_type(db, type_id)
    if not announcement_type:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Announcement type not found")
    return announcement_type

@router.post("/announcement-types", response_model=AnnouncementTypeResponse, status_code=status.HTTP_201_CREATED)
def create_announcement_type(announcement_type: AnnouncementTypeCreate, db: Session = Depends(get_db_session)):
    """Create a new announcement type"""
    return homepage_service.create_announcement_type(db, announcement_type)

@router.put("/announcement-types/{type_id}", response_model=AnnouncementTypeResponse)
def update_announcement_type(type_id: int, announcement_type: AnnouncementTypeUpdate, db: Session = Depends(get_db_session)):
    """Update an existing announcement type"""
    return homepage_service.update_announcement_type(db, type_id, announcement_type)

# Announcement endpoints
@router.get("/announcements", response_model=List[AnnouncementResponse])
def get_announcements(skip: int = 0, limit: int = 10, db: Session = Depends(get_db_session)):
    """Get active announcements"""
    return homepage_service.get_active_announcements(db, skip, limit)

@router.get("/announcements/{announcement_id}", response_model=AnnouncementResponse)
def get_announcement(announcement_id: int, db: Session = Depends(get_db_session)):
    """Get a specific announcement by ID"""
    announcement = homepage_service.get_announcement(db, announcement_id)
    if not announcement:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Announcement not found")
    return announcement

@router.post("/announcements", response_model=AnnouncementResponse, status_code=status.HTTP_201_CREATED)
def create_announcement(announcement: AnnouncementCreate, db: Session = Depends(get_db_session)):
    """Create a new announcement"""
    return homepage_service.create_announcement(db, announcement)

@router.put("/announcements/{announcement_id}", response_model=AnnouncementResponse)
def update_announcement(announcement_id: int, announcement: AnnouncementUpdate, db: Session = Depends(get_db_session)):
    """Update an existing announcement"""
    return homepage_service.update_announcement(db, announcement_id, announcement)

# Quick Links endpoints
@router.get("/quick-links", response_model=List[QuickLinkResponse])
def get_quicklinks(skip: int = 0, limit: int = 10, db: Session = Depends(get_db_session)):
    """Get active quick links"""
    return homepage_service.get_active_quicklinks(db, skip, limit)

@router.get("/quick-links/{quicklink_id}", response_model=QuickLinkResponse)
def get_quicklink(quicklink_id: int, db: Session = Depends(get_db_session)):
    """Get a specific quick link by ID"""
    quicklink = homepage_service.get_quicklink(db, quicklink_id)
    if not quicklink:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Quick link not found")
    return quicklink

@router.post("/quick-links", response_model=QuickLinkResponse, status_code=status.HTTP_201_CREATED)
def create_quicklink(quicklink: QuickLinkCreate, db: Session = Depends(get_db_session)):
    """Create a new quick link"""
    return homepage_service.create_quicklink(db, quicklink)

@router.put("/quick-links/{quicklink_id}", response_model=QuickLinkResponse)
def update_quicklink(quicklink_id: int, quicklink: QuickLinkUpdate, db: Session = Depends(get_db_session)):
    """Update an existing quick link"""
    return homepage_service.update_quicklink(db, quicklink_id, quicklink)
