import os
import shutil
from typing import List, Optional
from fastapi import HTTPException, UploadFile, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from models.faculty import Faculty
from schemas.requests.faculty import FacultyCreate, FacultyUpdate


class FacultyService:
    @staticmethod
    async def create_faculty(
        db: Session, faculty_data: FacultyCreate, profile_photo: Optional[UploadFile] = None
    ):
        """Create a new faculty member with optional profile photo upload"""
        try:
            # Create faculty record
            faculty_dict = faculty_data.dict()
            faculty = Faculty(**faculty_dict)
            db.add(faculty)
            db.commit()
            db.refresh(faculty)
            
            # Handle profile photo if provided
            if profile_photo:
                # Create directory if it doesn't exist
                os.makedirs("media/profile_photos", exist_ok=True)
                
                # Save file with faculty ID in filename
                file_extension = os.path.splitext(profile_photo.filename)[1]
                file_path = f"media/profile_photos/faculty_{faculty.id}{file_extension}"
                
                # Save the uploaded file
                with open(file_path, "wb") as buffer:
                    shutil.copyfileobj(profile_photo.file, buffer)
                
                # Update faculty record with photo URL
                faculty.profile_photo_url = file_path
                db.commit()
                db.refresh(faculty)
                
            return faculty
            
        except IntegrityError:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Faculty with this email already exists"
            )
    
    @staticmethod
    def get_all_faculty(db: Session, skip: int = 0, limit: int = 100):
        """Get all faculty members with pagination"""
        return db.query(Faculty).offset(skip).limit(limit).all()
    
    @staticmethod
    def get_faculty_by_id(db: Session, faculty_id: int):
        """Get a specific faculty member by ID"""
        faculty = db.query(Faculty).filter(Faculty.id == faculty_id).first()
        if not faculty:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Faculty with ID {faculty_id} not found"
            )
        return faculty
    
    @staticmethod
    async def update_faculty(
        db: Session, 
        faculty_id: int, 
        faculty_data: FacultyUpdate,
        profile_photo: Optional[UploadFile] = None
    ):
        """Update faculty information and optionally replace profile photo"""
        # Get faculty by ID
        faculty = FacultyService.get_faculty_by_id(db, faculty_id)
        
        try:
            # Update faculty data fields
            for key, value in faculty_data.dict(exclude_unset=True).items():
                setattr(faculty, key, value)
            
            # Handle profile photo if provided
            if profile_photo:
                # Delete old photo if exists
                if faculty.profile_photo_url and os.path.exists(faculty.profile_photo_url):
                    os.remove(faculty.profile_photo_url)
                
                # Create directory if it doesn't exist
                os.makedirs("media/profile_photos", exist_ok=True)
                
                # Save new file with faculty ID in filename
                file_extension = os.path.splitext(profile_photo.filename)[1]
                file_path = f"media/profile_photos/faculty_{faculty_id}{file_extension}"
                
                # Save the uploaded file
                with open(file_path, "wb") as buffer:
                    shutil.copyfileobj(profile_photo.file, buffer)
                
                # Update faculty record with new photo URL
                faculty.profile_photo_url = file_path
            
            db.commit()
            db.refresh(faculty)
            return faculty
            
        except IntegrityError:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already in use by another faculty member"
            )
    
    @staticmethod
    def delete_faculty(db: Session, faculty_id: int):
        """Delete a faculty member and their profile photo"""
        faculty = FacultyService.get_faculty_by_id(db, faculty_id)
        
        # Delete profile photo if exists
        if faculty.profile_photo_url and os.path.exists(faculty.profile_photo_url):
            os.remove(faculty.profile_photo_url)
        
        # Delete faculty record
        db.delete(faculty)
        db.commit()
        
        return {"message": f"Faculty with ID {faculty_id} deleted successfully"}
