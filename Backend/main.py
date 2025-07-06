from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.exc import OperationalError

from app.api.v1.api import api_router
from app.core.config import settings
from app.core.database import Base, engine

# Create FastAPI app
app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Set up CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[str(origin) for origin in settings.CORS_ORIGINS],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API router
app.include_router(api_router, prefix=settings.API_V1_STR)


@app.on_event("startup")
def create_tables():
    """Create database tables on startup."""
    try:
        Base.metadata.create_all(bind=engine)
    except OperationalError as e:
        print(f"Database error: {e}")
        print("Make sure your PostgreSQL server is running and the database exists.")


@app.get("/")
def root():
    """Root endpoint."""
    return {"message": "Welcome to CSEDU Web API. Go to /docs for documentation."}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
