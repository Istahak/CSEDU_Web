from fastapi import APIRouter

from schemas.requests.user import (
    UserSignUp, UserSignIn, 
    ProfileUpdateRequest
)

from routers import token, auth, img, profile, homepage, faculty, notice, classroom, committee, committee_member, research_assistant, equipment, equipment_booking, office_room, payment, payment_user, project, publication, admin_profile, admin_profile, student_profile_get_all
from .user import router as user_router
from .room_booking import router as room_booking_router

# from .admin_profile import router as admin_profile_router

from .assignment import router as assignment_router
from .assignment_submission import router as assignment_submission_router
from .student_profile import router as student_profile_router
from .achievement import router as achievement_router
from .course import router as course_router
from .project import router as project_router
from .event import router as event_router
from .event_booking import router as event_booking_router
from .attendance import router as attendance_router
from .grade import router as grade_router
from .gpa import router as gpa_router
from .slot import router as slot_router
from .day import router as day_router
router = APIRouter(
    prefix="/api/v1"
)

router.include_router(student_profile_get_all.router)
router.include_router(student_profile_router)
router.include_router(assignment_router)
router.include_router(assignment_submission_router)


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
router.include_router(event.router)
router.include_router(event_booking.router)
router.include_router(attendance.router)
router.include_router(grade.router)
router.include_router(gpa.router)
router.include_router(room_booking_router)
router.include_router(slot_router)
router.include_router(day_router)

router.include_router(admin_profile.router)