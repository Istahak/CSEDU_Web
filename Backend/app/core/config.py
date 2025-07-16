"""
Application configuration settings
"""
from typing import List
from pydantic_settings import BaseSettings
from pydantic import AnyHttpUrl


class Settings(BaseSettings):
    # API Configuration
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "CSEDU Web API"
    VERSION: str = "1.0.0"
    DESCRIPTION: str = "CSEDU Web Application API"
    
    # Security
    JWT_SECRET: str
    ALGO: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Database
    DB_URL: str
    BASE_URL: str
    
    # CORS
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = []
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379"
    
    # Development
    DEBUG: bool = False
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
