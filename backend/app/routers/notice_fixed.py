from typing import List, Optional
from fastapi import APIRouter, HTTPException, UploadFile, Form, status
from sqlalchemy.orm import Session
import json

from db import get_db
from models.notice import Notice
from schemas.requests.notice import NoticeCreate, NoticeUpdate
from schemas.responses.notice import NoticeResponse, AttachmentResponse
from services.notice_service import NoticeService
from dependency import get_current_user, get_db_session
from utils.authorization import admin_required

router = APIRouter(
    prefix="/notices",
    tags=["Notices"],
    responses={404: {"description": "Not found"}},
)


@router.get("/", response_model=List[NoticeResponse])
def get_all_notices(
    db: get_db_session,
    skip: int = 0, 
    limit: int = 100,
):
    """
    Get all notices with pagination support.
    
    - **skip**: Number of records to skip (for pagination)
    - **limit**: Maximum number of records to return
    """
    notices = NoticeService.get_all_notices(db=db, skip=skip, limit=limit)
    
    # Parse attachments JSON for each notice
    for notice in notices:
        if notice.attachments:
            notice.attachments = json.loads(notice.attachments)
        else:
            notice.attachments = []
            
    return notices


@router.get("/{notice_id}", response_model=NoticeResponse)
def get_notice_by_id(
    notice_id: int,
    db: get_db_session,
):
    """
    Get a specific notice by ID.
    
    - **notice_id**: ID of the notice to retrieve
    """
    notice = NoticeService.get_notice_by_id(db=db, notice_id=notice_id)
    
    # Parse attachments JSON
    if notice.attachments:
        notice.attachments = json.loads(notice.attachments)
    else:
        notice.attachments = []
        
    return notice


@router.post("/", response_model=NoticeResponse, status_code=status.HTTP_201_CREATED)
async def create_notice(
    db: get_db_session,
    current_user: get_current_user,
    title: str = Form(...),
    content: str = Form(...),
    category: Optional[str] = Form(None),
    priority: Optional[str] = Form(None),
    expiry_date: Optional[str] = Form(None),
    status: Optional[str] = Form("Draft"),
):
    """
    Create a new notice with optional file attachments.
    
    This endpoint accepts multipart/form-data to handle file uploads along with notice information.
    
    - **title**: Notice title (required)
    - **content**: Notice content (required)
    - **category**: Category like Academic, Administrative, etc.
    - **priority**: Priority level (High, Medium, Low)
    - **expiry_date**: Date when notice expires (YYYY-MM-DD)
    - **status**: Status of the notice (Draft, Published, Archived)
    """
    # Create notice data object from form fields
    notice_data = NoticeCreate(
        title=title,
        content=content,
        category=category,
        priority=priority,
        expiry_date=expiry_date,
        status=status,
    )
    
    # Call service to create notice without attachments
    notice = await NoticeService.create_notice(
        db=db, 
        notice_data=notice_data, 
        attachments=None,
        created_by=current_user.id
    )
    
    # Parse attachments JSON for response
    if notice.attachments:
        notice.attachments = json.loads(notice.attachments)
    else:
        notice.attachments = []
        
    return notice


@router.post("/with-attachments", response_model=NoticeResponse, status_code=status.HTTP_201_CREATED)
async def create_notice_with_attachments(
    db: get_db_session,
    current_user: get_current_user,
    title: str = Form(...),
    content: str = Form(...),
    category: Optional[str] = Form(None),
    priority: Optional[str] = Form(None),
    expiry_date: Optional[str] = Form(None),
    status: Optional[str] = Form("Draft"),
    attachments: List[UploadFile] = [],
):
    """
    Create a new notice with file attachments.
    
    This endpoint accepts multipart/form-data to handle file uploads along with notice information.
    
    - **title**: Notice title (required)
    - **content**: Notice content (required)
    - **category**: Category like Academic, Administrative, etc.
    - **priority**: Priority level (High, Medium, Low)
    - **expiry_date**: Date when notice expires (YYYY-MM-DD)
    - **status**: Status of the notice (Draft, Published, Archived)
    - **attachments**: Multiple file attachments (PDF, JPG, PNG, DOC, DOCX, max 10MB each)
    """
    # Create notice data object from form fields
    notice_data = NoticeCreate(
        title=title,
        content=content,
        category=category,
        priority=priority,
        expiry_date=expiry_date,
        status=status,
    )
    
    # Filter out attachments with empty filenames
    valid_attachments = [file for file in attachments if file.filename]
    if not valid_attachments:
        valid_attachments = None
        
    # Call service to create notice with attachments
    notice = await NoticeService.create_notice(
        db=db, 
        notice_data=notice_data, 
        attachments=valid_attachments,
        created_by=current_user.id
    )
    
    # Parse attachments JSON for response
    if notice.attachments:
        notice.attachments = json.loads(notice.attachments)
    else:
        notice.attachments = []
        
    return notice


@router.put("/{notice_id}", response_model=NoticeResponse)
async def update_notice(
    notice_id: int,
    db: get_db_session,
    current_user: get_current_user,
    title: Optional[str] = Form(None),
    content: Optional[str] = Form(None),
    category: Optional[str] = Form(None),
    priority: Optional[str] = Form(None),
    expiry_date: Optional[str] = Form(None),
    status: Optional[str] = Form(None),
):
    """
    Update a notice without attachments. Admin only.
    
    This endpoint accepts form data to update notice information.
    All fields are optional for partial updates.
    
    - **notice_id**: ID of the notice to update
    - **title**: Notice title
    - **content**: Notice content
    - **category**: Category like Academic, Administrative, etc.
    - **priority**: Priority level (High, Medium, Low)
    - **expiry_date**: Date when notice expires (YYYY-MM-DD)
    - **status**: Status of the notice (Draft, Published, Archived)
    """
    # Check if user is admin
    admin_required(current_user)
    
    # Create update data object directly with the provided fields
    notice_data = NoticeUpdate(
        title=title,
        content=content,
        category=category,
        priority=priority,
        expiry_date=expiry_date,
        status=status
    )
    
    # Call service to update notice without attachments
    notice = await NoticeService.update_notice(
        db=db, 
        notice_id=notice_id, 
        notice_data=notice_data, 
        attachments=None,
        updated_by=current_user.id
    )
    
    # Parse attachments JSON for response
    if notice.attachments:
        notice.attachments = json.loads(notice.attachments)
    else:
        notice.attachments = []
        
    return notice


@router.put("/{notice_id}/with-attachments", response_model=NoticeResponse)
async def update_notice_with_attachments(
    notice_id: int,
    db: get_db_session,
    current_user: get_current_user,
    title: Optional[str] = Form(None),
    content: Optional[str] = Form(None),
    category: Optional[str] = Form(None),
    priority: Optional[str] = Form(None),
    expiry_date: Optional[str] = Form(None),
    status: Optional[str] = Form(None),
    attachments: List[UploadFile] = [],
):
    """
    Update a notice with file attachments. Admin only.
    
    This endpoint accepts multipart/form-data to handle file uploads along with notice information.
    All fields are optional for partial updates.
    
    - **notice_id**: ID of the notice to update
    - **title**: Notice title
    - **content**: Notice content
    - **category**: Category like Academic, Administrative, etc.
    - **priority**: Priority level (High, Medium, Low)
    - **expiry_date**: Date when notice expires (YYYY-MM-DD)
    - **status**: Status of the notice (Draft, Published, Archived)
    - **attachments**: Multiple file attachments (PDF, JPG, PNG, DOC, DOCX, max 10MB each)
    """
    # Check if user is admin
    admin_required(current_user)
    
    # Create update data object directly with the provided fields
    notice_data = NoticeUpdate(
        title=title,
        content=content,
        category=category,
        priority=priority,
        expiry_date=expiry_date,
        status=status
    )
    
    # Filter out attachments with empty filenames
    valid_attachments = [file for file in attachments if file.filename]
    if not valid_attachments:
        valid_attachments = None
    
    # Call service to update notice with attachments
    notice = await NoticeService.update_notice(
        db=db, 
        notice_id=notice_id, 
        notice_data=notice_data, 
        attachments=valid_attachments,
        updated_by=current_user.id
    )
    
    # Parse attachments JSON for response
    if notice.attachments:
        notice.attachments = json.loads(notice.attachments)
    else:
        notice.attachments = []
        
    return notice


@router.delete("/{notice_id}", status_code=status.HTTP_200_OK)
def delete_notice(
    notice_id: int,
    db: get_db_session,
    current_user: get_current_user,
):
    """
    Delete a notice. Admin only.
    
    - **notice_id**: ID of the notice to delete
    """
    # Check if user is admin
    admin_required(current_user)
    
    return NoticeService.delete_notice(db=db, notice_id=notice_id)


@router.delete("/{notice_id}/attachments/{filename}", status_code=status.HTTP_200_OK)
def delete_attachment(
    notice_id: int,
    filename: str,
    db: get_db_session,
    current_user: get_current_user,
):
    """
    Delete a specific attachment from a notice. Admin only.
    
    - **notice_id**: ID of the notice
    - **filename**: Name of the file to delete
    """
    # Check if user is admin
    admin_required(current_user)
    
    return NoticeService.delete_attachment(db=db, notice_id=notice_id, filename=filename)
