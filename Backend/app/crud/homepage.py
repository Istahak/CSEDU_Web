from typing import Optional, List, Dict, Any
from datetime import datetime
from sqlalchemy.orm import Session
from sqlalchemy import desc

from app.models.homepage import Overview, AnnouncementType, Announcement, QuickLink
from app.schemas.homepage import (
    OverviewCreate, OverviewUpdate,
    AnnouncementTypeCreate, AnnouncementTypeUpdate,
    AnnouncementCreate, AnnouncementUpdate,
    QuickLinkCreate, QuickLinkUpdate
)


class OverviewCRUD:
    """CRUD operations for Overview model"""
    
    @staticmethod
    def get_by_id(db: Session, overview_id: int) -> Optional[Overview]:
        """Get an overview by ID"""
        return db.query(Overview).filter(Overview.id == overview_id).first()
    
    @staticmethod
    def get_active(db: Session) -> Optional[Overview]:
        """Get the currently active overview"""
        return db.query(Overview).filter(Overview.is_active == True).order_by(desc(Overview.updated_at)).first()
    
    @staticmethod
    def get_all(db: Session, skip: int = 0, limit: int = 100) -> List[Overview]:
        """Get all overviews with pagination"""
        return db.query(Overview).order_by(desc(Overview.updated_at)).offset(skip).limit(limit).all()
    
    @staticmethod
    def create(db: Session, overview_in: OverviewCreate, user_id: int) -> Overview:
        """Create a new overview"""
        db_overview = Overview(
            title=overview_in.title,
            description=overview_in.description,
            image_path=overview_in.image_path,
            created_by=user_id
        )
        db.add(db_overview)
        db.commit()
        db.refresh(db_overview)
        return db_overview
    
    @staticmethod
    def update(db: Session, db_overview: Overview, overview_in: OverviewUpdate, user_id: int) -> Overview:
        """Update an overview"""
        update_data = overview_in.dict(exclude_unset=True)
        
        for field, value in update_data.items():
            setattr(db_overview, field, value)
        
        db_overview.updated_by = user_id
        db.add(db_overview)
        db.commit()
        db.refresh(db_overview)
        return db_overview
    
    @staticmethod
    def delete(db: Session, db_overview: Overview) -> None:
        """Delete an overview"""
        db.delete(db_overview)
        db.commit()


class AnnouncementTypeCRUD:
    """CRUD operations for AnnouncementType model"""
    
    @staticmethod
    def get_by_id(db: Session, type_id: int) -> Optional[AnnouncementType]:
        """Get an announcement type by ID"""
        return db.query(AnnouncementType).filter(AnnouncementType.id == type_id).first()
    
    @staticmethod
    def get_by_name(db: Session, name: str) -> Optional[AnnouncementType]:
        """Get an announcement type by name"""
        return db.query(AnnouncementType).filter(AnnouncementType.name == name).first()
    
    @staticmethod
    def get_all(db: Session, skip: int = 0, limit: int = 100) -> List[AnnouncementType]:
        """Get all announcement types with pagination"""
        return db.query(AnnouncementType).offset(skip).limit(limit).all()
    
    @staticmethod
    def create(db: Session, type_in: AnnouncementTypeCreate) -> AnnouncementType:
        """Create a new announcement type"""
        db_type = AnnouncementType(
            name=type_in.name,
            color_code=type_in.color_code
        )
        db.add(db_type)
        db.commit()
        db.refresh(db_type)
        return db_type
    
    @staticmethod
    def update(db: Session, db_type: AnnouncementType, type_in: AnnouncementTypeUpdate) -> AnnouncementType:
        """Update an announcement type"""
        update_data = type_in.dict(exclude_unset=True)
        
        for field, value in update_data.items():
            setattr(db_type, field, value)
        
        db.add(db_type)
        db.commit()
        db.refresh(db_type)
        return db_type
    
    @staticmethod
    def delete(db: Session, db_type: AnnouncementType) -> None:
        """Delete an announcement type"""
        db.delete(db_type)
        db.commit()


class AnnouncementCRUD:
    """CRUD operations for Announcement model"""
    
    @staticmethod
    def get_by_id(db: Session, announcement_id: int) -> Optional[Announcement]:
        """Get an announcement by ID"""
        return db.query(Announcement).filter(Announcement.id == announcement_id).first()
    
    @staticmethod
    def get_active(db: Session, skip: int = 0, limit: int = 10) -> List[Announcement]:
        """Get active announcements"""
        # Get current time with timezone info to match the database datetime format
        current_time = datetime.now()
        
        return db.query(Announcement).filter(
            Announcement.is_active == True,
            Announcement.publish_date <= current_time,  # Only show current and past announcements
            (Announcement.expiry_date.is_(None) | (Announcement.expiry_date >= current_time))  # Not expired
        ).order_by(desc(Announcement.publish_date)).offset(skip).limit(limit).all()
    
    @staticmethod
    def get_by_type(db: Session, type_id: int, skip: int = 0, limit: int = 100) -> List[Announcement]:
        """Get announcements by type"""
        return db.query(Announcement).filter(
            Announcement.type_id == type_id
        ).order_by(desc(Announcement.publish_date)).offset(skip).limit(limit).all()
    
    @staticmethod
    def get_all(db: Session, skip: int = 0, limit: int = 100) -> List[Announcement]:
        """Get all announcements with pagination"""
        return db.query(Announcement).order_by(desc(Announcement.publish_date)).offset(skip).limit(limit).all()
    
    @staticmethod
    def create(db: Session, announcement_in: AnnouncementCreate, user_id: int) -> Announcement:
        """Create a new announcement"""
        db_announcement = Announcement(
            title=announcement_in.title,
            description=announcement_in.description,
            type_id=announcement_in.type_id,
            publish_date=announcement_in.publish_date,
            expiry_date=announcement_in.expiry_date,
            created_by=user_id
        )
        db.add(db_announcement)
        db.commit()
        db.refresh(db_announcement)
        return db_announcement
    
    @staticmethod
    def update(db: Session, db_announcement: Announcement, announcement_in: AnnouncementUpdate, user_id: int) -> Announcement:
        """Update an announcement"""
        update_data = announcement_in.dict(exclude_unset=True)
        
        for field, value in update_data.items():
            setattr(db_announcement, field, value)
        
        db_announcement.updated_by = user_id
        db.add(db_announcement)
        db.commit()
        db.refresh(db_announcement)
        return db_announcement
    
    @staticmethod
    def delete(db: Session, db_announcement: Announcement) -> None:
        """Delete an announcement"""
        db.delete(db_announcement)
        db.commit()


class QuickLinkCRUD:
    """CRUD operations for QuickLink model"""
    
    @staticmethod
    def get_by_id(db: Session, link_id: int) -> Optional[QuickLink]:
        """Get a quick link by ID"""
        return db.query(QuickLink).filter(QuickLink.id == link_id).first()
    
    @staticmethod
    def get_active(db: Session) -> List[QuickLink]:
        """Get active quick links ordered by display_order"""
        return db.query(QuickLink).filter(
            QuickLink.is_active == True
        ).order_by(QuickLink.display_order).all()
    
    @staticmethod
    def get_all(db: Session, skip: int = 0, limit: int = 100) -> List[QuickLink]:
        """Get all quick links with pagination"""
        return db.query(QuickLink).order_by(QuickLink.display_order).offset(skip).limit(limit).all()
    
    @staticmethod
    def create(db: Session, link_in: QuickLinkCreate, user_id: int) -> QuickLink:
        """Create a new quick link"""
        db_link = QuickLink(
            title=link_in.title,
            url=link_in.url,
            icon=link_in.icon,
            display_order=link_in.display_order,
            created_by=user_id
        )
        db.add(db_link)
        db.commit()
        db.refresh(db_link)
        return db_link
    
    @staticmethod
    def update(db: Session, db_link: QuickLink, link_in: QuickLinkUpdate, user_id: int) -> QuickLink:
        """Update a quick link"""
        update_data = link_in.dict(exclude_unset=True)
        
        for field, value in update_data.items():
            setattr(db_link, field, value)
        
        db_link.updated_by = user_id
        db.add(db_link)
        db.commit()
        db.refresh(db_link)
        return db_link
    
    @staticmethod
    def delete(db: Session, db_link: QuickLink) -> None:
        """Delete a quick link"""
        db.delete(db_link)
        db.commit()


# Create instances of the CRUD classes
overview_crud = OverviewCRUD()
announcement_type_crud = AnnouncementTypeCRUD()
announcement_crud = AnnouncementCRUD()
quick_link_crud = QuickLinkCRUD()
