from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, status
from sqlalchemy.orm import Session

from db import get_db
from models.faculty import Faculty
from schemas.requests.faculty import FacultyCreate, FacultyUpdate
from schemas.responses.faculty import FacultyResponse
from services.faculty_service import FacultyService

router = APIRouter(
    prefix="/faculty",
    tags=["Faculty"],
    responses={404: {"description": "Not found"}},
)


@router.post("/", response_model=FacultyResponse, status_code=status.HTTP_201_CREATED)
async def create_faculty(
    full_name: str = Form(...),
    email: str = Form(...),
    department: str = Form(...),
    designation: str = Form(...),
    phone_number: Optional[str] = Form(None),
    office_room: Optional[str] = Form(None),
    specialization: Optional[str] = Form(None),
    research_areas: Optional[str] = Form(None),
    employment_status: Optional[str] = Form("Active"),
    experience: Optional[str] = Form(None),
    number_of_publications: Optional[int] = Form(0),
    qualifications: Optional[str] = Form(None),
    profile_photo: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
):
    """
    Create a new faculty member with optional profile photo upload.
    
    This endpoint accepts multipart/form-data to handle file uploads along with faculty information.
    """
    # Create faculty data object from form fields
    faculty_data = FacultyCreate(
        full_name=full_name,
        email=email,
        department=department,
        designation=designation,
        phone_number=phone_number,
        office_room=office_room,
        specialization=specialization,
        research_areas=research_areas,
        employment_status=employment_status,
        experience=experience,
        number_of_publications=number_of_publications,
        qualifications=qualifications,
    )
    
    # Call service to create faculty and handle file upload
    return await FacultyService.create_faculty(db, faculty_data, profile_photo)


@router.get("/", response_model=List[FacultyResponse])
def get_all_faculty(
    skip: int = 0, 
    limit: int = 100,
    db: Session = Depends(get_db),
):
    """
    Get all faculty members with pagination support.
    
    - **skip**: Number of records to skip (for pagination)
    - **limit**: Maximum number of records to return
    """
    return FacultyService.get_all_faculty(db, skip=skip, limit=limit)


@router.get("/{faculty_id}", response_model=FacultyResponse)
def get_faculty_by_id(
    faculty_id: int,
    db: Session = Depends(get_db),
):
    """
    Get a specific faculty member by ID.
    
    - **faculty_id**: ID of the faculty member to retrieve
    """
    return FacultyService.get_faculty_by_id(db, faculty_id)


@router.put("/{faculty_id}", response_model=FacultyResponse)
async def update_faculty(
    faculty_id: int,
    full_name: Optional[str] = Form(None),
    email: Optional[str] = Form(None),
    department: Optional[str] = Form(None),
    designation: Optional[str] = Form(None),
    phone_number: Optional[str] = Form(None),
    office_room: Optional[str] = Form(None),
    specialization: Optional[str] = Form(None),
    research_areas: Optional[str] = Form(None),
    employment_status: Optional[str] = Form(None),
    experience: Optional[str] = Form(None),
    number_of_publications: Optional[int] = Form(None),
    qualifications: Optional[str] = Form(None),
    profile_photo: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
):
    """
    Update faculty information with optional profile photo replacement.
    
    This endpoint accepts multipart/form-data to handle file uploads along with faculty information.
    All fields are optional for partial updates.
    """
    # Create update data object with only provided fields
    update_data = {}
    if full_name is not None:
        update_data["full_name"] = full_name
    if email is not None:
        update_data["email"] = email
    if department is not None:
        update_data["department"] = department
    if designation is not None:
        update_data["designation"] = designation
    if phone_number is not None:
        update_data["phone_number"] = phone_number
    if office_room is not None:
        update_data["office_room"] = office_room
    if specialization is not None:
        update_data["specialization"] = specialization
    if research_areas is not None:
        update_data["research_areas"] = research_areas
    if employment_status is not None:
        update_data["employment_status"] = employment_status
    if experience is not None:
        update_data["experience"] = experience
    if number_of_publications is not None:
        update_data["number_of_publications"] = number_of_publications
    if qualifications is not None:
        update_data["qualifications"] = qualifications
    
    faculty_data = FacultyUpdate(**update_data)
    return await FacultyService.update_faculty(db, faculty_id, faculty_data, profile_photo)


@router.delete("/{faculty_id}", status_code=status.HTTP_200_OK)
def delete_faculty(
    faculty_id: int,
    db: Session = Depends(get_db),
):
    """
    Delete a faculty member and their profile photo.
    
    - **faculty_id**: ID of the faculty member to delete
    """
    return FacultyService.delete_faculty(db, faculty_id)
