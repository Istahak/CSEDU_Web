from fastapi import APIRouter
<<<<<<< HEAD
from routers import token, auth, img, profile, homepage, faculty, course, notice, classroom, committee, committee_member, research_assistant, equipment, equipment_booking
=======
from routers import token, auth, img, profile, homepage, faculty, notice, classroom, committee, committee_member, research_assistant, office_room, faculty
>>>>>>> fc486b2d5daa44effe5d5eac9e64b9e3610f2359

router = APIRouter(
    prefix="/api/v1"
)

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
<<<<<<< HEAD
router.include_router(equipment.router)
router.include_router(equipment_booking.router)
=======
router.include_router(office_room.router)
router.include_router(faculty.router)
>>>>>>> fc486b2d5daa44effe5d5eac9e64b9e3610f2359
