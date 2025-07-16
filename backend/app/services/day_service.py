from sqlalchemy.orm import Session
from uuid import UUID
from models.day import Day
from schemas.day import DayCreate
from typing import List

def create_day(db: Session, day: DayCreate) -> Day:
    db_day = Day(name=day.name)
    db.add(db_day)
    db.commit()
    db.refresh(db_day)
    return db_day

def get_days(db: Session) -> List[Day]:
    return db.query(Day).all()

def get_day(db: Session, day_id: UUID) -> Day:
    return db.query(Day).filter(Day.id == day_id).first()

def delete_day(db: Session, day_id: UUID) -> bool:
    day = db.query(Day).filter(Day.id == day_id).first()
    if not day:
        return False
    db.delete(day)
    db.commit()
    return True
