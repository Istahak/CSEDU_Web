from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional

from app.api.deps import get_current_active_user, get_current_admin_user
from app.core.database import get_db
from app.models.user import User
from app.crud.homepage import (
    overview_crud, announcement_type_crud, announcement_crud, quick_link_crud
)
from app.schemas.homepage import (
    Overview, OverviewCreate, OverviewUpdate,
    AnnouncementType, AnnouncementTypeCreate, AnnouncementTypeUpdate,
    Announcement, AnnouncementCreate, AnnouncementUpdate,
    QuickLink, QuickLinkCreate, QuickLinkUpdate,
    HomepageData
)

router = APIRouter()


# Public endpoint to get all homepage data at once
@router.get("/", response_model=HomepageData)
def get_homepage_data(db: Session = Depends(get_db)):
    """
    Get all homepage data (overview, announcements, quick links) in a single request.
    This endpoint is public and can be accessed by anyone.
    """
    overview = overview_crud.get_active(db)
    announcements = announcement_crud.get_active(db)
    quick_links = quick_link_crud.get_active(db)
    
    return {
        "overview": overview,
        "announcements": announcements,
        "quick_links": quick_links
    }


# Overview endpoints
@router.get("/overview", response_model=Overview)
def get_active_overview(db: Session = Depends(get_db)):
    """
    Get the currently active overview.
    This endpoint is public and can be accessed by anyone.
    """
    overview = overview_crud.get_active(db)
    if not overview:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No active overview found"
        )
    return overview


@router.get("/overview/all", response_model=List[Overview])
def get_all_overviews(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """
    Get all overviews with pagination.
    Only admin users can access this endpoint.
    """
    overviews = overview_crud.get_all(db, skip=skip, limit=limit)
    return overviews


@router.post("/overview", response_model=Overview, status_code=status.HTTP_201_CREATED)
def create_overview(
    overview_in: OverviewCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """
    Create a new overview.
    Only admin users can access this endpoint.
    """
    overview = overview_crud.create(db, overview_in, current_user.id)
    return overview


@router.put("/overview/{overview_id}", response_model=Overview)
def update_overview(
    overview_id: int,
    overview_in: OverviewUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """
    Update an overview.
    Only admin users can access this endpoint.
    """
    overview = overview_crud.get_by_id(db, overview_id)
    if not overview:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Overview not found"
        )
    
    overview = overview_crud.update(db, overview, overview_in, current_user.id)
    return overview


@router.delete("/overview/{overview_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_overview(
    overview_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """
    Delete an overview.
    Only admin users can access this endpoint.
    """
    overview = overview_crud.get_by_id(db, overview_id)
    if not overview:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Overview not found"
        )
    
    overview_crud.delete(db, overview)
    return None


# Announcement Type endpoints
@router.get("/announcement-types", response_model=List[AnnouncementType])
def get_announcement_types(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """
    Get all announcement types.
    This endpoint is public and can be accessed by anyone.
    """
    types = announcement_type_crud.get_all(db, skip=skip, limit=limit)
    return types


@router.post("/announcement-types", response_model=AnnouncementType, status_code=status.HTTP_201_CREATED)
def create_announcement_type(
    type_in: AnnouncementTypeCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """
    Create a new announcement type.
    Only admin users can access this endpoint.
    """
    # Check if type with this name already exists
    existing_type = announcement_type_crud.get_by_name(db, type_in.name)
    if existing_type:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Announcement type with name '{type_in.name}' already exists"
        )
    
    type_obj = announcement_type_crud.create(db, type_in)
    return type_obj


@router.put("/announcement-types/{type_id}", response_model=AnnouncementType)
def update_announcement_type(
    type_id: int,
    type_in: AnnouncementTypeUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """
    Update an announcement type.
    Only admin users can access this endpoint.
    """
    type_obj = announcement_type_crud.get_by_id(db, type_id)
    if not type_obj:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Announcement type not found"
        )
    
    # Check if name is being updated and if it already exists
    if type_in.name and type_in.name != type_obj.name:
        existing_type = announcement_type_crud.get_by_name(db, type_in.name)
        if existing_type:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Announcement type with name '{type_in.name}' already exists"
            )
    
    type_obj = announcement_type_crud.update(db, type_obj, type_in)
    return type_obj


@router.delete("/announcement-types/{type_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_announcement_type(
    type_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """
    Delete an announcement type.
    Only admin users can access this endpoint.
    """
    type_obj = announcement_type_crud.get_by_id(db, type_id)
    if not type_obj:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Announcement type not found"
        )
    
    announcement_type_crud.delete(db, type_obj)
    return None


# Announcement endpoints
@router.get("/announcements", response_model=List[Announcement])
def get_active_announcements(
    skip: int = 0,
    limit: int = 10,
    db: Session = Depends(get_db)
):
    """
    Get active announcements.
    This endpoint is public and can be accessed by anyone.
    """
    announcements = announcement_crud.get_active(db, skip=skip, limit=limit)
    return announcements


@router.get("/announcements/all", response_model=List[Announcement])
def get_all_announcements(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """
    Get all announcements with pagination.
    Only admin users can access this endpoint.
    """
    announcements = announcement_crud.get_all(db, skip=skip, limit=limit)
    return announcements


@router.get("/announcements/by-type/{type_id}", response_model=List[Announcement])
def get_announcements_by_type(
    type_id: int,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """
    Get announcements by type.
    This endpoint is public and can be accessed by anyone.
    """
    # Check if type exists
    type_obj = announcement_type_crud.get_by_id(db, type_id)
    if not type_obj:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Announcement type not found"
        )
    
    announcements = announcement_crud.get_by_type(db, type_id, skip=skip, limit=limit)
    return announcements


@router.get("/announcements/{announcement_id}", response_model=Announcement)
def get_announcement(
    announcement_id: int,
    db: Session = Depends(get_db)
):
    """
    Get a specific announcement by ID.
    This endpoint is public and can be accessed by anyone.
    """
    announcement = announcement_crud.get_by_id(db, announcement_id)
    if not announcement:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Announcement not found"
        )
    return announcement


@router.post("/announcements", response_model=Announcement, status_code=status.HTTP_201_CREATED)
def create_announcement(
    announcement_in: AnnouncementCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """
    Create a new announcement.
    Only admin users can access this endpoint.
    """
    # Check if type exists
    type_obj = announcement_type_crud.get_by_id(db, announcement_in.type_id)
    if not type_obj:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Announcement type not found"
        )
    
    announcement = announcement_crud.create(db, announcement_in, current_user.id)
    return announcement


@router.put("/announcements/{announcement_id}", response_model=Announcement)
def update_announcement(
    announcement_id: int,
    announcement_in: AnnouncementUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """
    Update an announcement.
    Only admin users can access this endpoint.
    """
    announcement = announcement_crud.get_by_id(db, announcement_id)
    if not announcement:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Announcement not found"
        )
    
    # Check if type_id is being updated and if it exists
    if announcement_in.type_id is not None:
        type_obj = announcement_type_crud.get_by_id(db, announcement_in.type_id)
        if not type_obj:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Announcement type not found"
            )
    
    announcement = announcement_crud.update(db, announcement, announcement_in, current_user.id)
    return announcement


@router.delete("/announcements/{announcement_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_announcement(
    announcement_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """
    Delete an announcement.
    Only admin users can access this endpoint.
    """
    announcement = announcement_crud.get_by_id(db, announcement_id)
    if not announcement:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Announcement not found"
        )
    
    announcement_crud.delete(db, announcement)
    return None


# QuickLink endpoints
@router.get("/quick-links", response_model=List[QuickLink])
def get_active_quick_links(db: Session = Depends(get_db)):
    """
    Get active quick links.
    This endpoint is public and can be accessed by anyone.
    """
    quick_links = quick_link_crud.get_active(db)
    return quick_links


@router.get("/quick-links/all", response_model=List[QuickLink])
def get_all_quick_links(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """
    Get all quick links with pagination.
    Only admin users can access this endpoint.
    """
    quick_links = quick_link_crud.get_all(db, skip=skip, limit=limit)
    return quick_links


@router.post("/quick-links", response_model=QuickLink, status_code=status.HTTP_201_CREATED)
def create_quick_link(
    link_in: QuickLinkCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """
    Create a new quick link.
    Only admin users can access this endpoint.
    """
    quick_link = quick_link_crud.create(db, link_in, current_user.id)
    return quick_link


@router.put("/quick-links/{link_id}", response_model=QuickLink)
def update_quick_link(
    link_id: int,
    link_in: QuickLinkUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """
    Update a quick link.
    Only admin users can access this endpoint.
    """
    quick_link = quick_link_crud.get_by_id(db, link_id)
    if not quick_link:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Quick link not found"
        )
    
    quick_link = quick_link_crud.update(db, quick_link, link_in, current_user.id)
    return quick_link


@router.delete("/quick-links/{link_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_quick_link(
    link_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """
    Delete a quick link.
    Only admin users can access this endpoint.
    """
    quick_link = quick_link_crud.get_by_id(db, link_id)
    if not quick_link:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Quick link not found"
        )
    
    quick_link_crud.delete(db, quick_link)
    return None
