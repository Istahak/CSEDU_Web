import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from starlette.middleware.base import BaseHTTPMiddleware
from db import Base, engine, SessionLocal
from routers import router
from middleware import log_middleware
from models.role import Role

app = FastAPI()

# Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)

# Initialize roles
def initialize_roles():
    db = SessionLocal()
    try:
        # Check if roles already exist
        existing_roles = db.query(Role).all()
        role_names = [role.name for role in existing_roles]
        
        # Define required roles
        required_roles = ["student", "faculty", "admin"]
        
        # Add any missing roles
        for role_name in required_roles:
            if role_name not in role_names:
                new_role = Role(name=role_name)
                db.add(new_role)
                print(f"Created role: {role_name}")
        
        db.commit()
    except Exception as e:
        print(f"Error initializing roles: {e}")
        db.rollback()
    finally:
        db.close()

# Run role initialization
initialize_roles()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(BaseHTTPMiddleware,dispatch=log_middleware)

os.makedirs("media", exist_ok=True)
app.mount("/media", StaticFiles(directory="media"), name="media")

@app.get("/")
def root():
        return{
                "Intro":"Welcome to CSEDU Web backend"
        }

#routing
app.include_router(router)
