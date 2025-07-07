from fastapi import APIRouter
from routers import token, auth, img, profile

router = APIRouter(
    prefix="/api/v1"
)

router.include_router(token.router)
router.include_router(auth.router)
router.include_router(img.router)
router.include_router(profile.router)



