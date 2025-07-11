from sqlalchemy.orm import Session
from uuid import UUID
from typing import List, Optional
import base64
from models.faculty import Faculty
from models.user import User
from schemas.requests.faculty import FacultyCreate, FacultyUpdate, FacultyImageUpdate
from schemas.responses.faculty import FacultyResponse

def get_all_faculty(db: Session) -> List[FacultyResponse]:
    faculties = db.query(Faculty).all()
    result = []
    
    for faculty in faculties:
        faculty_response = get_faculty_by_id(db, faculty.id)
        if faculty_response:
            result.append(faculty_response)
            
    return result

def get_faculty_by_id(db: Session, faculty_id: UUID) -> Optional[FacultyResponse]:
    faculty = db.query(Faculty).filter(Faculty.id == faculty_id).first()
    if not faculty:
        return None
    user = db.query(User).filter(User.id == faculty.user_id).first()
    image_b64 = base64.b64encode(user.image).decode('utf-8') if user and user.image else None
    return FacultyResponse(
        id=faculty.id,
        user_id=faculty.user_id,
        office_room_id=faculty.office_room_id,
        full_name=faculty.full_name,
        email=faculty.email,
        phone_number=faculty.phone_number,
        specialization=faculty.specialization,
        research_areas=faculty.research_areas,
        employment_status=faculty.employment_status,
        designation=faculty.designation,
        department=faculty.department,
        experience=faculty.experience,
        number_of_publications=faculty.number_of_publications,
        qualifications=faculty.qualifications,
        image=image_b64
    )

def create_faculty(db: Session, data: FacultyCreate) -> FacultyResponse:
    faculty_data = data.dict(exclude={"image"})
    faculty = Faculty(**faculty_data)
    db.add(faculty)
    db.flush()
    # Set user image if provided
    if getattr(data, "image", None):
        user = db.query(User).filter(User.id == data.user_id).first()
        if user:
            user.image = base64.b64decode(data.image)
    db.commit()
    db.refresh(faculty)
    return get_faculty_by_id(db, faculty.id)

def update_faculty(db: Session, faculty_id: UUID, data: FacultyUpdate) -> Optional[FacultyResponse]:
    faculty = db.query(Faculty).filter(Faculty.id == faculty_id).first()
    if not faculty:
        return None
    update_data = data.dict(exclude_unset=True, exclude={"image"})
    for key, value in update_data.items():
        setattr(faculty, key, value)
    # Update image if provided
    if getattr(data, "image", None):
        user = db.query(User).filter(User.id == faculty.user_id).first()
        if user:
            user.image = base64.b64decode(data.image)
    db.commit()
    db.refresh(faculty)
    return get_faculty_by_id(db, faculty.id)

def update_faculty_image(db: Session, faculty_id: UUID, image_in: FacultyImageUpdate) -> Optional[FacultyResponse]:
    faculty = db.query(Faculty).filter(Faculty.id == faculty_id).first()
    if not faculty:
        return None
    user = db.query(User).filter(User.id == faculty.user_id).first()
    if not user:
        return None
    user.image = base64.b64decode(image_in.image)
    db.commit()
    return get_faculty_by_id(db, faculty.id)

def delete_faculty(db: Session, faculty_id: UUID) -> bool:
    faculty = db.query(Faculty).filter(Faculty.id == faculty_id).first()
    if not faculty:
        return False
    db.delete(faculty)
    db.commit()
    return True
