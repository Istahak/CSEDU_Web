from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from db import get_db
from schemas.requests.event import EventCreate, EventUpdate, EventImageUpdate
from schemas.responses.event import EventResponse, EventAgendaOut
from services import event_service
import base64

router = APIRouter(prefix="/event", tags=["Event"])

def event_to_response(event):
    return EventResponse(
        id=event.id,
        title=event.title,
        date_time=event.date_time,
        location=event.location,
        seats=event.seats,
        image=base64.b64encode(event.image).decode('utf-8') if event.image else None,
        agenda=[EventAgendaOut(
            id=agenda.id,
            time=agenda.time,
            description=agenda.description
        ) for agenda in event.agenda] if event.agenda else []
    )

@router.get("/", response_model=List[EventResponse])
def get_all_events(db: Session = Depends(get_db)):
    events = event_service.get_all_events(db)
    return [event_to_response(e) for e in events]

@router.get("/{event_id}", response_model=EventResponse)
def get_event_by_id(event_id: UUID, db: Session = Depends(get_db)):
    event = event_service.get_event_by_id(db, event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event_to_response(event)

@router.post("/", response_model=EventResponse, status_code=201)
def create_event(data: EventCreate, db: Session = Depends(get_db)):
    event = event_service.create_event(db, data)
    return event_to_response(event)

@router.put("/{event_id}", response_model=EventResponse)
def update_event(event_id: UUID, data: EventUpdate, db: Session = Depends(get_db)):
    event = event_service.update_event(db, event_id, data)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event_to_response(event)

@router.delete("/{event_id}", status_code=204)
def delete_event(event_id: UUID, db: Session = Depends(get_db)):
    deleted = event_service.delete_event(db, event_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Event not found")
    return None

@router.put("/{event_id}/image", response_model=EventResponse)
def update_event_image(event_id: UUID, image_in: EventImageUpdate, db: Session = Depends(get_db)):
    event = event_service.update_event_image(db, event_id, image_in.image)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event_to_response(event)
