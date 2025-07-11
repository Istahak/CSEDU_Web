from sqlalchemy.orm import Session
from uuid import UUID
from typing import List, Optional
import base64
from models.event import Event, EventAgenda
from schemas.requests.event import EventCreate, EventUpdate, EventAgendaIn
from schemas.responses.event import EventResponse, EventAgendaOut
from datetime import datetime

def get_all_events(db: Session) -> List[Event]:
    return db.query(Event).all()

def get_event_by_id(db: Session, event_id: UUID) -> Optional[Event]:
    return db.query(Event).filter(Event.id == event_id).first()

def create_event(db: Session, data: EventCreate) -> Event:
    event = Event(
        title=data.title,
        date_time=data.date_time,
        location=data.location,
        seats=data.seats,
        image=base64.b64decode(data.image) if data.image else None
    )
    db.add(event)
    db.flush()
    if data.agenda:
        for agenda_item in data.agenda:
            agenda = EventAgenda(
                event_id=event.id,
                time=agenda_item.time,
                description=agenda_item.description
            )
            db.add(agenda)
    db.commit()
    db.refresh(event)
    return event

def update_event(db: Session, event_id: UUID, data: EventUpdate) -> Optional[Event]:
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        return None
    for key, value in data.dict(exclude_unset=True).items():
        if key == "agenda" or key == "image":
            continue
        setattr(event, key, value)
    if data.image is not None:
        event.image = base64.b64decode(data.image)
    if data.agenda is not None:
        db.query(EventAgenda).filter(EventAgenda.event_id == event_id).delete()
        for agenda_item in data.agenda:
            agenda = EventAgenda(
                event_id=event_id,
                time=agenda_item.time,
                description=agenda_item.description
            )
            db.add(agenda)
    db.commit()
    db.refresh(event)
    return event

def delete_event(db: Session, event_id: UUID) -> bool:
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        return False
    db.delete(event)
    db.commit()
    return True

def update_event_image(db: Session, event_id: UUID, image_b64: str) -> Optional[Event]:
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        return None
    event.image = base64.b64decode(image_b64)
    db.commit()
    db.refresh(event)
    return event
