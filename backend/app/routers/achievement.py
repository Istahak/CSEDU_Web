from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from db import get_db
from schemas.requests.achievement import AchievementCreate, AchievementUpdate
from schemas.responses.achievement import AchievementResponse
from services import achievement_service

router = APIRouter(prefix="/achievements", tags=["Achievements"])

@router.get("/", response_model=List[AchievementResponse])
def get_all_achievements(db: Session = Depends(get_db)):
    return achievement_service.get_all_achievements(db)

@router.get("/{achievement_id}", response_model=AchievementResponse)
def get_achievement_by_id(achievement_id: UUID, db: Session = Depends(get_db)):
    achievement = achievement_service.get_achievement_by_id(db, achievement_id)
    if not achievement:
        raise HTTPException(status_code=404, detail="Achievement not found")
    return achievement

@router.get("/by-user/{user_id}", response_model=List[AchievementResponse])
def get_achievements_by_user(user_id: UUID, db: Session = Depends(get_db)):
    return achievement_service.get_achievements_by_user_id(db, user_id)

@router.post("/", response_model=AchievementResponse, status_code=201)
def create_achievement(data: AchievementCreate, db: Session = Depends(get_db)):
    return achievement_service.create_achievement(db, data)

@router.put("/{achievement_id}", response_model=AchievementResponse)
def update_achievement(achievement_id: UUID, data: AchievementUpdate, db: Session = Depends(get_db)):
    achievement = achievement_service.update_achievement(db, achievement_id, data)
    if not achievement:
        raise HTTPException(status_code=404, detail="Achievement not found")
    return achievement

@router.delete("/{achievement_id}", status_code=204)
def delete_achievement(achievement_id: UUID, db: Session = Depends(get_db)):
    deleted = achievement_service.delete_achievement(db, achievement_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Achievement not found")
    return None
