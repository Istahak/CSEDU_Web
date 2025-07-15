from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from db import get_db
from models.research_assistant import ResearchAssistant
from schemas.requests.research_assistant import ResearchAssistantCreate, ResearchAssistantUpdate
from schemas.responses.research_assistant import ResearchAssistantResponse

router = APIRouter(prefix="/research-assistants", tags=["Research Assistants"])

from services import research_assistant_service

@router.get("/", response_model=List[ResearchAssistantResponse])
def get_all_research_assistants(db: Session = Depends(get_db)):
    return research_assistant_service.get_all_research_assistants(db)

@router.get("/by-supervisor/{supervisor_id}", response_model=List[ResearchAssistantResponse])
def get_research_assistants_by_supervisor(supervisor_id: UUID, db: Session = Depends(get_db)):
    return research_assistant_service.get_research_assistants_by_supervisor(db, supervisor_id)

@router.get("/{ra_id}", response_model=ResearchAssistantResponse)
def get_research_assistant_by_id(ra_id: UUID, db: Session = Depends(get_db)):
    ra = research_assistant_service.get_research_assistant_by_id(db, ra_id)
    if not ra:
        raise HTTPException(status_code=404, detail="Research Assistant not found")
    return ra

@router.post("/", response_model=ResearchAssistantResponse, status_code=201)
def create_research_assistant(data: ResearchAssistantCreate, db: Session = Depends(get_db)):
    return research_assistant_service.create_research_assistant(db, data)

@router.put("/{ra_id}", response_model=ResearchAssistantResponse)
def update_research_assistant(ra_id: UUID, data: ResearchAssistantUpdate, db: Session = Depends(get_db)):
    ra = research_assistant_service.update_research_assistant(db, ra_id, data)
    if not ra:
        raise HTTPException(status_code=404, detail="Research Assistant not found")
    return ra

@router.delete("/{ra_id}", status_code=204)
def delete_research_assistant(ra_id: UUID, db: Session = Depends(get_db)):
    deleted = research_assistant_service.delete_research_assistant(db, ra_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Research Assistant not found")
    return None
    return None
