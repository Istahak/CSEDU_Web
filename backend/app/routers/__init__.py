from fastapi import APIRouter

from schemas.requests.user import (
    UserSignUp, UserSignIn, 
    ProfileUpdateRequest
)

from routers import token, auth, img, profile, homepage, faculty, notice, classroom, committee, committee_member, research_assistant, equipment, equipment_booking, office_room, payment, payment_user, project, publication
from .user import router as user_router
from .student_profile import router as student_profile_router
from .achievement import router as achievement_router
from .course import router as course_router
from .project import router as project_router
router = APIRouter(
    prefix="/api/v1"
)

router.include_router(student_profile_router)

router.include_router(token.router)
router.include_router(auth.router)
router.include_router(img.router)
router.include_router(profile.router)
router.include_router(homepage.router)
router.include_router(faculty.router)
router.include_router(notice.router)
router.include_router(classroom.router)
router.include_router(committee.router)
router.include_router(committee_member.router)
router.include_router(research_assistant.router)
router.include_router(equipment.router)
router.include_router(equipment_booking.router)
router.include_router(office_room.router)
router.include_router(payment.router)
router.include_router(payment_user.router)
router.include_router(achievement.router)
router.include_router(course.router)
router.include_router(project.router)
router.include_router(publication.router)
