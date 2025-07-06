from fastapi import APIRouter

from app.api.v1.endpoints import auth, homepage

api_router = APIRouter()

# Include auth endpoints
api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])

# Include homepage endpoints
api_router.include_router(homepage.router, prefix="/homepage", tags=["homepage"])
