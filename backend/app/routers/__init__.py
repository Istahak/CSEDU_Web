from fastapi import APIRouter
from routers import token, auth, img, profile, homepage, faculty, course, notice_fixed

router = APIRouter(
    prefix="/api/v1"
)

router.include_router(token.router)
router.include_router(auth.router)
router.include_router(img.router)
router.include_router(profile.router)
router.include_router(homepage.router)
router.include_router(faculty.router)
router.include_router(course.router)
router.include_router(notice_fixed.router)
