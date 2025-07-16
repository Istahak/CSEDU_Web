from datetime import datetime
from fastapi import UploadFile, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from models.user import Profile, User
import base64
from schemas.requests.user import ProfileUpdateRequest
from schemas.responses.user import ProfileResponse
from services import image_service
from utils.pagination import create_paginated_response

def update_profile_info(db: Session, profileInfoUpdate: ProfileUpdateRequest, user_id: str):
    profile = db.query(Profile).filter(Profile.user_id == user_id,Profile.is_deleted==False).first()
    if not profile:
        return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content={"message": "Profile not found"})

    profile_data = profileInfoUpdate.model_dump(exclude_unset=True)
    for key, value in profile_data.items():
        setattr(profile, key, value)

    db.commit()

    return JSONResponse(status_code=status.HTTP_200_OK, content={"message": "Profile updated successfully"})

def update_profile_picture(db: Session, user_id: str, file:UploadFile):

    profile = db.query(Profile).filter(Profile.user_id == user_id, Profile.is_deleted==False).first()

    if not profile:
        return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content={"message": "Profile not found"})
    if not file:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content={"message": "No file provided"})

    del_image = profile.image
    profile.image = image_service.upload_image(db, file)

    if del_image:
        image_service.delete_image(db, del_image.id)
    
    db.commit()

    return JSONResponse(status_code=status.HTTP_200_OK, content={"message": "Profile picture updated successfully"}) 

def get_profile_info(db: Session, user_id: str):
    profile = db.query(Profile).filter(Profile.user_id == user_id, Profile.is_deleted==False).first()
    if not profile:
        return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content={"message": "Profile not found"})

    # Fetch the user and encode image to base64 if present
    user = db.query(User).filter(User.id == user_id).first()
    image_b64 = base64.b64encode(user.image).decode('utf-8') if user and user.image else None

    # Build the nested UserResponse dict
    user_dict = None
    if user:
        user_dict = {
            "id": user.id,
            "user_name": user.user_name,
            "email": user.email,
            "image": image_b64
        }
    profile_schema = ProfileResponse(
        user=user_dict,
        full_name=profile.full_name,
        contact_number=profile.contact_number,
        reg_no=profile.reg_no,
        bio=profile.bio
    )
    return profile_schema

def get_all_profiles(db: Session, page_no: int, page_size: int):
    query = db.query(Profile).filter(Profile.is_deleted==False)
    total_item_count = query.count()
    total_page_count = (total_item_count + page_size - 1) // page_size
    items = query.offset((page_no - 1) * page_size).limit(page_size).all()

    # Fetch all relevant users in one query
    user_ids = [profile.user_id for profile in items]
    users = db.query(User).filter(User.id.in_(user_ids)).all()
    users_dict = {}
    for user in users:
        image_b64 = base64.b64encode(user.image).decode('utf-8') if user.image else None
        users_dict[user.id] = {
            "id": user.id,
            "user_name": user.user_name,
            "email": user.email,
            "image": image_b64
        }

    # Build ProfileResponse objects manually
    data = []
    for profile in items:
        user_info = users_dict.get(profile.user_id)
        data.append(ProfileResponse(
            user=user_info,
            full_name=profile.full_name,
            contact_number=profile.contact_number,
            reg_no=profile.reg_no,
            bio=profile.bio
        ))

    from schemas.responses.pagination import PaginatedResponse
    return PaginatedResponse(
        current_page_no=page_no,
        total_page_count=total_page_count,
        page_size=page_size,
        total_item_count=total_item_count,
        data=data,
        has_previous=page_no > 1,
        has_next=page_no < total_page_count
    )