import base64
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from models.student_profile import StudentProfile
from models.user import User
from schemas.requests.student_profile import StudentProfileCreate, StudentProfileUpdate, StudentProfileImageUpdate
from schemas.responses.student_profile import StudentProfileResponse

def create_student_profile(db: Session, profile_in: StudentProfileCreate) -> StudentProfileResponse:
    # Create StudentProfile (cgpa is ignored)
    student_profile = StudentProfile(
        user_id=profile_in.user_id,
        student_id=profile_in.student_id,
        email=profile_in.email,
        phone=profile_in.phone,
        batch=profile_in.batch,
        semester=profile_in.semester,
        dept=profile_in.dept
    )
    db.add(student_profile)
    db.flush()  # Ensures student_profile.id is available

    # Set user image if provided (handle separately)
    if getattr(profile_in, "image", None):
        user = db.query(User).filter(User.id == profile_in.user_id).first()
        if user:
            user.image = base64.b64decode(profile_in.image)
    db.commit()
    db.refresh(student_profile)
    return get_student_profile(db, student_profile.id)


def get_student_profile_by_user_id(db: Session, user_id: str) -> StudentProfileResponse:

    profile = db.query(StudentProfile).filter(StudentProfile.user_id == user_id).first()
    print("hello")
    if not profile:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="StudentProfile not found")
    user = db.query(User).filter(User.id == profile.user_id).first()
    image_b64 = base64.b64encode(user.image).decode('utf-8') if user and user.image else None
    return get_student_profile(db,profile.id)

def get_student_profile(db: Session, profile_id: str) -> StudentProfileResponse:
    profile = db.query(StudentProfile).filter(StudentProfile.id == profile_id).first()
    print("got something ")
    
    if not profile:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="StudentProfile not found")
    user = db.query(User).filter(User.id == profile.user_id).first()
    image_b64 = base64.b64encode(user.image).decode('utf-8') if user and user.image else None
    # Demo cgpa value
    print("before return ")
    return StudentProfileResponse(
        id=profile.id,
        user_id=profile.user_id,
        student_id=profile.student_id,
        email=profile.email,
        full_name=profile.full_name,
        phone=profile.phone,
        batch=profile.batch,
        semester=profile.semester,
        dept=profile.dept,
        cgpa=profile.cgpa,
        image=image_b64
    )

def update_student_profile(db: Session, profile_id: str, profile_in: StudentProfileUpdate) -> StudentProfileResponse:
    profile = db.query(StudentProfile).filter(StudentProfile.id == profile_id).first()
    if not profile:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="StudentProfile not found")
    for field, value in profile_in.model_dump(exclude_unset=True).items():
        setattr(profile, field, value)
    db.commit()
    db.refresh(profile)
    return get_student_profile(db, profile.id)

def update_student_image(db: Session, profile_id: str, image_in: StudentProfileImageUpdate) -> StudentProfileResponse:
    profile = db.query(StudentProfile).filter(StudentProfile.id == profile_id).first()
    if not profile:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="StudentProfile not found")
    user = db.query(User).filter(User.id == profile.user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    user.image = base64.b64decode(image_in.image)
    db.commit()
    return get_student_profile(db, profile.id)

def get_students_by_semester(db: Session, semester):
    students = db.query(StudentProfile).filter(StudentProfile.semester == semester).all()
    return [
        {
            "id": str(student.id),
            "user_id": str(student.user_id),
            "student_id": student.student_id,
            "full_name": student.full_name,
            "email": student.email,
            "phone": student.phone,
            "batch": student.batch,
            "semester": student.semester,
            "cgpa": student.cgpa,
            "dept": student.dept
        }
        for student in students
    ]