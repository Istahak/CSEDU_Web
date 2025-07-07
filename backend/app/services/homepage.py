from sqlalchemy.orm import Session
from models.homepage import Overview, Announcement, AnnouncementType, QuickLink
from schemas.requests.homepage import (
    OverviewCreate, OverviewUpdate,
    AnnouncementCreate, AnnouncementUpdate,
    AnnouncementTypeCreate, AnnouncementTypeUpdate,
    QuickLinkCreate, QuickLinkUpdate
)
from typing import List, Optional
from fastapi import HTTPException, status

# Overview services
def get_active_overview(db: Session):
    """Get the active overview"""
    return db.query(Overview).filter(Overview.is_active == True).first()

def create_overview(db: Session, overview: OverviewCreate):
    """Create a new overview"""
    # First deactivate all existing overviews if this one is active
    if overview.is_active:
        db.query(Overview).update({"is_active": False})
        db.commit()
    
    db_overview = Overview(**overview.dict())
    db.add(db_overview)
    db.commit()
    db.refresh(db_overview)
    return db_overview

def update_overview(db: Session, overview_id: int, overview: OverviewUpdate):
    """Update an existing overview"""
    db_overview = db.query(Overview).filter(Overview.id == overview_id).first()
    if not db_overview:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Overview not found")
    
    # If this overview is being set to active, deactivate all others
    if overview.is_active:
        db.query(Overview).filter(Overview.id != overview_id).update({"is_active": False})
        db.commit()
    
    update_data = overview.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_overview, key, value)
    
    db.commit()
    db.refresh(db_overview)
    return db_overview

# Announcement Type services
def get_announcement_types(db: Session, skip: int = 0, limit: int = 100):
    """Get all announcement types"""
    return db.query(AnnouncementType).offset(skip).limit(limit).all()

def get_announcement_type(db: Session, type_id: int):
    """Get a specific announcement type by ID"""
    return db.query(AnnouncementType).filter(AnnouncementType.id == type_id).first()

def create_announcement_type(db: Session, announcement_type: AnnouncementTypeCreate):
    """Create a new announcement type"""
    db_type = AnnouncementType(**announcement_type.dict())
    db.add(db_type)
    db.commit()
    db.refresh(db_type)
    return db_type

def update_announcement_type(db: Session, type_id: int, announcement_type: AnnouncementTypeUpdate):
    """Update an existing announcement type"""
    db_type = db.query(AnnouncementType).filter(AnnouncementType.id == type_id).first()
    if not db_type:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Announcement type not found")
    
    update_data = announcement_type.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_type, key, value)
    
    db.commit()
    db.refresh(db_type)
    return db_type

# Announcement services
def get_active_announcements(db: Session, skip: int = 0, limit: int = 10):
    """Get active announcements ordered by publish date (newest first)"""
    return db.query(Announcement).filter(Announcement.is_active == True).order_by(Announcement.publish_date.desc()).offset(skip).limit(limit).all()

def get_announcement(db: Session, announcement_id: int):
    """Get a specific announcement by ID"""
    return db.query(Announcement).filter(Announcement.id == announcement_id).first()

def create_announcement(db: Session, announcement: AnnouncementCreate):
    """Create a new announcement"""
    db_announcement = Announcement(**announcement.dict())
    db.add(db_announcement)
    db.commit()
    db.refresh(db_announcement)
    return db_announcement

def update_announcement(db: Session, announcement_id: int, announcement: AnnouncementUpdate):
    """Update an existing announcement"""
    db_announcement = db.query(Announcement).filter(Announcement.id == announcement_id).first()
    if not db_announcement:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Announcement not found")
    
    update_data = announcement.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_announcement, key, value)
    
    db.commit()
    db.refresh(db_announcement)
    return db_announcement

# QuickLink services
def get_active_quicklinks(db: Session, skip: int = 0, limit: int = 10):
    """Get active quick links"""
    return db.query(QuickLink).filter(QuickLink.is_active == True).offset(skip).limit(limit).all()

def get_quicklink(db: Session, quicklink_id: int):
    """Get a specific quick link by ID"""
    return db.query(QuickLink).filter(QuickLink.id == quicklink_id).first()

def create_quicklink(db: Session, quicklink: QuickLinkCreate):
    """Create a new quick link"""
    db_quicklink = QuickLink(**quicklink.dict())
    db.add(db_quicklink)
    db.commit()
    db.refresh(db_quicklink)
    return db_quicklink

def update_quicklink(db: Session, quicklink_id: int, quicklink: QuickLinkUpdate):
    """Update an existing quick link"""
    db_quicklink = db.query(QuickLink).filter(QuickLink.id == quicklink_id).first()
    if not db_quicklink:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Quick link not found")
    
    update_data = quicklink.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_quicklink, key, value)
    
    db.commit()
    db.refresh(db_quicklink)
    return db_quicklink

# Homepage combined services
def get_all_homepage_data(db: Session):
    """Get all homepage data (overview, announcements, quick links)"""
    overview = get_active_overview(db)
    announcements = get_active_announcements(db)
    quick_links = get_active_quicklinks(db)
    
    return {
        "overview": overview,
        "announcements": announcements,
        "quick_links": quick_links
    }
