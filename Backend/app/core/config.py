import os
from pydantic_settings import BaseSettings
from typing import Optional, List, Any
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


class Settings(BaseSettings):
    """
    Application settings.
    """
    API_V1_STR: str = os.getenv("API_V1_STR", "/api/v1")
    PROJECT_NAME: str = os.getenv("PROJECT_NAME", "CSEDU Web API")
    
    # Database
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", 
        "postgresql://postgres:123123@localhost/CSEDU_WEB"
    )
    
    # Security
    SECRET_KEY: str = os.getenv(
        "SECRET_KEY", 
        "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
    )
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
    
    # CORS
    BACKEND_CORS_ORIGINS: List[str] = os.getenv(
        "BACKEND_CORS_ORIGINS", 
        "[\"http://localhost:5173\", \"http://localhost:3000\"]"
    )
    
    # Parse CORS origins from string to list if needed
    @property
    def CORS_ORIGINS(self) -> List[str]:
        if isinstance(self.BACKEND_CORS_ORIGINS, str):
            import json
            return json.loads(self.BACKEND_CORS_ORIGINS)
        return self.BACKEND_CORS_ORIGINS

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
