import os
import json
import shutil
from typing import List, Optional
from datetime import datetime
from fastapi import HTTPException, UploadFile, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from models.notice import Notice
from schemas.requests.notice import NoticeCreate, NoticeUpdate, AttachmentInfo


class NoticeService:
    @staticmethod
    async def create_notice(
        db: Session, 
        notice_data: NoticeCreate, 
        attachments: Optional[List[UploadFile]] = None,
        created_by: int = None
    ):
        """Create a new notice with optional file attachments"""
        try:
            # Create notice record with explicit fields
            notice = Notice(
                title=notice_data.title,
                content=notice_data.content,
                category=notice_data.category,
                priority=notice_data.priority,
                expiry_date=notice_data.expiry_date,
                status=notice_data.status
            )
            
            # Set the created_by field
            if created_by:
                notice.created_by = created_by
                
            db.add(notice)
            db.commit()
            db.refresh(notice)
            
            # Handle attachments if provided
            if attachments:
                attachment_info = await NoticeService._handle_attachments(attachments, notice.id)
                notice.attachments = json.dumps(attachment_info)
                db.commit()
                db.refresh(notice)
                
            return notice
            
        except Exception as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to create notice: {str(e)}"
            )
    
    @staticmethod
    def get_all_notices(db: Session, skip: int = 0, limit: int = 100):
        """Get all active notices with pagination"""
        return db.query(Notice).filter(
            Notice.is_active == True, 
            Notice.is_deleted == False
        ).order_by(Notice.created_at.desc()).offset(skip).limit(limit).all()
    
    @staticmethod
    def get_notice_by_id(db: Session, notice_id: int):
        """Get a specific notice by ID"""
        notice = db.query(Notice).filter(
            Notice.id == notice_id,
            Notice.is_active == True,
            Notice.is_deleted == False
        ).first()
        
        if not notice:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Notice with ID {notice_id} not found"
            )
            
        return notice
    
    @staticmethod
    async def update_notice(
        db: Session, 
        notice_id: int, 
        notice_data: NoticeUpdate,
        attachments: Optional[List[UploadFile]] = None,
        updated_by: int = None
    ):
        """Update notice information and optionally add/replace attachments"""
        # Get notice by ID
        notice = NoticeService.get_notice_by_id(db, notice_id)
        
        try:
            # Update notice data fields with explicit fields
            update_dict = notice_data.dict(exclude_unset=True, exclude_none=True)
            
            if "title" in update_dict:
                notice.title = update_dict["title"]
            if "content" in update_dict:
                notice.content = update_dict["content"]
            if "category" in update_dict:
                notice.category = update_dict["category"]
            if "priority" in update_dict:
                notice.priority = update_dict["priority"]
            if "expiry_date" in update_dict:
                notice.expiry_date = update_dict["expiry_date"]
            if "status" in update_dict:
                notice.status = update_dict["status"]
            
            # Set the last_updated_by field
            if updated_by:
                notice.last_updated_by = updated_by
                
            # Handle attachments if provided
            if attachments:
                # Get existing attachments if any
                existing_attachments = []
                if notice.attachments:
                    existing_attachments = json.loads(notice.attachments)
                
                # Add new attachments
                new_attachments = await NoticeService._handle_attachments(attachments, notice_id)
                
                # Combine existing and new attachments
                all_attachments = existing_attachments + new_attachments
                notice.attachments = json.dumps(all_attachments)
            
            db.commit()
            db.refresh(notice)
            return notice
            
        except Exception as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to update notice: {str(e)}"
            )
    
    @staticmethod
    def delete_notice(db: Session, notice_id: int):
        """Delete a notice (soft delete by setting is_deleted to True)"""
        notice = NoticeService.get_notice_by_id(db, notice_id)
        
        # Soft delete
        notice.is_deleted = True
        
        try:
            db.commit()
            return {"message": f"Notice with ID {notice_id} has been deleted"}
        except Exception as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to delete notice: {str(e)}"
            )
    
    @staticmethod
    async def _handle_attachments(attachments: List[UploadFile], notice_id: int):
        """Helper method to handle file attachments"""
        attachment_info = []
        
        # Create directory if it doesn't exist
        os.makedirs("media/notice_attachments", exist_ok=True)
        
        for attachment in attachments:
            # Validate file size (10MB limit)
            content = await attachment.read()
            if len(content) > 10 * 1024 * 1024:  # 10MB in bytes
                raise HTTPException(
                    status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                    detail=f"File {attachment.filename} exceeds the 10MB size limit"
                )
            
            # Validate file type
            file_extension = os.path.splitext(attachment.filename)[1].lower()
            allowed_extensions = ['.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx']
            if file_extension not in allowed_extensions:
                raise HTTPException(
                    status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
                    detail=f"File type {file_extension} not allowed. Allowed types: PDF, JPG, PNG, DOC, DOCX"
                )
            
            # Generate unique filename
            timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
            safe_filename = f"notice_{notice_id}_{timestamp}{file_extension}"
            file_path = f"media/notice_attachments/{safe_filename}"
            
            # Save the file
            with open(file_path, "wb") as buffer:
                buffer.write(content)
            
            # Add file info to the list
            attachment_info.append({
                "filename": attachment.filename,
                "file_path": file_path,
                "file_size": len(content),
                "file_type": file_extension[1:]  # Remove the dot
            })
            
        return attachment_info
    
    @staticmethod
    def delete_attachment(db: Session, notice_id: int, filename: str):
        """Delete a specific attachment from a notice"""
        notice = NoticeService.get_notice_by_id(db, notice_id)
        
        if not notice.attachments:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No attachments found for this notice"
            )
        
        attachments = json.loads(notice.attachments)
        
        # Find the attachment by filename
        attachment_index = None
        attachment_to_delete = None
        for i, attachment in enumerate(attachments):
            if attachment["filename"] == filename:
                attachment_index = i
                attachment_to_delete = attachment
                break
        
        if attachment_index is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Attachment {filename} not found"
            )
        
        # Delete the file from the filesystem
        file_path = attachment_to_delete["file_path"]
        if os.path.exists(file_path):
            os.remove(file_path)
        
        # Remove the attachment from the list
        attachments.pop(attachment_index)
        
        # Update the notice record
        notice.attachments = json.dumps(attachments)
        db.commit()
        
        return {"message": f"Attachment {filename} deleted successfully"}
