from sqlalchemy.orm import Session
from uuid import UUID
from typing import List, Optional
from models.achievement import Achievement, AchievementWinner
from schemas.requests.achievement import AchievementCreate, AchievementUpdate
from datetime import date

# CRUD for Achievement

def get_all_achievements(db: Session) -> List[Achievement]:
    return db.query(Achievement).all()

def get_achievement_by_id(db: Session, achievement_id: UUID) -> Optional[Achievement]:
    return db.query(Achievement).filter(Achievement.id == achievement_id).first()

def get_achievements_by_user_id(db: Session, user_id: UUID) -> List[Achievement]:
    return db.query(Achievement).join(AchievementWinner).filter(AchievementWinner.user_id == user_id).all()

def create_achievement(db: Session, data: AchievementCreate) -> Achievement:
    achievement = Achievement(
        title=data.title,
        category=data.category,
        description=data.description,
        date=data.date,
        awarding_organization=data.awarding_organization,
        image_url=data.image_url,
        team_name=getattr(data, 'team_name', None)
    )
    db.add(achievement)
    db.flush()  # get achievement.id before commit
    if data.winner_user_ids:
        for user_id in data.winner_user_ids:
            winner = AchievementWinner(achievement_id=achievement.id, user_id=user_id)
            db.add(winner)
    db.commit()
    db.refresh(achievement)
    return achievement

def update_achievement(db: Session, achievement_id: UUID, data: AchievementUpdate) -> Optional[Achievement]:
    achievement = db.query(Achievement).filter(Achievement.id == achievement_id).first()
    if not achievement:
        return None
    for key, value in data.dict(exclude_unset=True).items():
        if key == "winner_user_ids":
            # Remove old winners and add new
            db.query(AchievementWinner).filter(AchievementWinner.achievement_id == achievement_id).delete()
            if value:
                for user_id in value:
                    winner = AchievementWinner(achievement_id=achievement_id, user_id=user_id)
                    db.add(winner)
        elif key == "team_name":
            setattr(achievement, "team_name", value)
        else:
            setattr(achievement, key, value)
    db.commit()
    db.refresh(achievement)
    return achievement

def delete_achievement(db: Session, achievement_id: UUID) -> bool:
    achievement = db.query(Achievement).filter(Achievement.id == achievement_id).first()
    if not achievement:
        return False
    db.delete(achievement)
    db.commit()
    return True
