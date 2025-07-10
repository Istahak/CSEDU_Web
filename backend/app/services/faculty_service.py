from sqlalchemy.orm import Session
from uuid import UUID
from typing import List, Optional
from models.faculty import Faculty
from schemas.requests.faculty import FacultyCreate, FacultyUpdate

def get_all_faculty(db: Session) -> List[Faculty]:
    return db.query(Faculty).all()

def get_faculty_by_id(db: Session, faculty_id: UUID) -> Optional[Faculty]:
    return db.query(Faculty).filter(Faculty.id == faculty_id).first()

def create_faculty(db: Session, data: FacultyCreate) -> Faculty:
    faculty = Faculty(**data.dict())
    db.add(faculty)
    db.commit()
    db.refresh(faculty)
    return faculty

def update_faculty(db: Session, faculty_id: UUID, data: FacultyUpdate) -> Optional[Faculty]:
    faculty = db.query(Faculty).filter(Faculty.id == faculty_id).first()
    if not faculty:
        return None
    for key, value in data.dict(exclude_unset=True).items():
        setattr(faculty, key, value)
    db.commit()
    db.refresh(faculty)
    return faculty

def delete_faculty(db: Session, faculty_id: UUID) -> bool:
    faculty = db.query(Faculty).filter(Faculty.id == faculty_id).first()
    if not faculty:
        return False
    db.delete(faculty)
    db.commit()
    return True
