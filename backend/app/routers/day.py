from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from db import get_db
from schemas.day import DayCreate, DayResponse
from services import day_service

router = APIRouter(prefix="/day", tags=["Day"])

@router.post("/", response_model=DayResponse, status_code=201)
def create_day(data: DayCreate, db: Session = Depends(get_db)):
    return day_service.create_day(db, data)

@router.get("/", response_model=List[DayResponse])
def get_days(db: Session = Depends(get_db)):
    return day_service.get_days(db)

@router.get("/{day_id}", response_model=DayResponse)
def get_day(day_id: UUID, db: Session = Depends(get_db)):
    day = day_service.get_day(db, day_id)
    if not day:
        raise HTTPException(status_code=404, detail="Day not found")
    return day

@router.delete("/{day_id}", status_code=204)
def delete_day(day_id: UUID, db: Session = Depends(get_db)):
    deleted = day_service.delete_day(db, day_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Day not found")
    return None
