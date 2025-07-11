from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from db import get_db
from schemas.requests.achievement import AchievementCreate, AchievementUpdate
from schemas.responses.achievement import AchievementResponse
from services import achievement_service

import base64

router = APIRouter(prefix="/achievements", tags=["Achievements"])

def achievement_to_response(achievement):
    data = achievement.__dict__.copy()
    if 'image_data' in data and data['image_data']:
        data['image_base64'] = base64.b64encode(data['image_data']).decode('utf-8')
    else:
        data['image_base64'] = None
    data.pop('image_data', None)
    # Handle winners if present
    if hasattr(achievement, 'winners'):
        data['winners'] = [w for w in achievement.winners]
    return data

@router.get("/", response_model=List[AchievementResponse])
def get_all_achievements(db: Session = Depends(get_db)):
    achievements = achievement_service.get_all_achievements(db)
    return [achievement_to_response(a) for a in achievements]

@router.get("/{achievement_id}", response_model=AchievementResponse)
def get_achievement_by_id(achievement_id: UUID, db: Session = Depends(get_db)):
    achievement = achievement_service.get_achievement_by_id(db, achievement_id)
    if not achievement:
        raise HTTPException(status_code=404, detail="Achievement not found")
    return achievement_to_response(achievement)

@router.get("/by-user/{user_id}", response_model=List[AchievementResponse])
def get_achievements_by_user(user_id: UUID, db: Session = Depends(get_db)):
    achievements = achievement_service.get_achievements_by_user_id(db, user_id)
    return [achievement_to_response(a) for a in achievements]

@router.post("/", response_model=AchievementResponse, status_code=201)
def create_achievement(data: AchievementCreate, db: Session = Depends(get_db)):
    achievement = achievement_service.create_achievement(db, data)
    return achievement_to_response(achievement)

@router.put("/{achievement_id}", response_model=AchievementResponse)
def update_achievement(achievement_id: UUID, data: AchievementUpdate, db: Session = Depends(get_db)):
    achievement = achievement_service.update_achievement(db, achievement_id, data)
    if not achievement:
        raise HTTPException(status_code=404, detail="Achievement not found")
    return achievement_to_response(achievement)

@router.delete("/{achievement_id}", status_code=204)
def delete_achievement(achievement_id: UUID, db: Session = Depends(get_db)):
    deleted = achievement_service.delete_achievement(db, achievement_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Achievement not found")
    return None
