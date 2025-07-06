from datetime import datetime
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.crud.homepage import announcement_type_crud
from app.models.user import UserRole
from app.schemas.homepage import AnnouncementTypeCreate


def init_db() -> None:
    """Initialize database with default data."""
    db = SessionLocal()
    try:
        # Create default announcement types
        create_default_announcement_types(db)
    finally:
        db.close()


def create_default_announcement_types(db: Session) -> None:
    """Create default announcement types if they don't exist."""
    # Check if any announcement types exist
    types = announcement_type_crud.get_all(db)
    if types:
        return
    
    # Create default announcement types
    default_types = [
        {"name": "Academic", "color_code": "academic"},
        {"name": "Administrative", "color_code": "administrative"},
        {"name": "General", "color_code": "general"},
    ]
    
    for type_data in default_types:
        type_in = AnnouncementTypeCreate(**type_data)
        announcement_type_crud.create(db, type_in)


if __name__ == "__main__":
    init_db()
