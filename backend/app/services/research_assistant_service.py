from sqlalchemy.orm import Session
from uuid import UUID
from typing import List, Optional
from models.research_assistant import ResearchAssistant
from schemas.requests.research_assistant import ResearchAssistantCreate, ResearchAssistantUpdate


def get_all_research_assistants(db: Session) -> List[ResearchAssistant]:
    return db.query(ResearchAssistant).all()

def get_research_assistants_by_supervisor(db: Session, supervisor_id: UUID) -> List[ResearchAssistant]:
    return db.query(ResearchAssistant).filter(ResearchAssistant.supervisor_id == supervisor_id).all()


def get_research_assistant_by_id(db: Session, ra_id: UUID) -> Optional[ResearchAssistant]:
    return db.query(ResearchAssistant).filter(ResearchAssistant.id == ra_id).first()


def create_research_assistant(db: Session, data: ResearchAssistantCreate) -> ResearchAssistant:
    print("in this funcion")
    ra = ResearchAssistant(**data.dict())
    print(ra)
    db.add(ra)
    db.commit()
    db.refresh(ra)
    return ra


def update_research_assistant(db: Session, ra_id: UUID, data: ResearchAssistantUpdate) -> Optional[ResearchAssistant]:
    ra = db.query(ResearchAssistant).filter(ResearchAssistant.id == ra_id).first()
    if not ra:
        return None
    for key, value in data.dict(exclude_unset=True).items():
        setattr(ra, key, value)
    db.commit()
    db.refresh(ra)
    return ra


def delete_research_assistant(db: Session, ra_id: UUID) -> bool:
    ra = db.query(ResearchAssistant).filter(ResearchAssistant.id == ra_id).first()
    if not ra:
        return False
    db.delete(ra)
    db.commit()
    return True
