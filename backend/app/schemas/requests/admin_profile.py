from typing import Optional
from pydantic import BaseModel, Field, EmailStr
from datetime import date
from uuid import UUID

class AdminProfileCreateRequest(BaseModel):
    full_name: str = Field(..., max_length=100)
    role: str = Field(..., max_length=50)
    email: EmailStr
    dept: Optional[str] = None
    phone: Optional[str] = None
    joining_date: date
  

class AdminProfileUpdateRequest(BaseModel):
    full_name: Optional[str] = Field(None, max_length=100)
    role: Optional[str] = Field(None, max_length=50)
    email: Optional[EmailStr] = None
    dept: Optional[str] = None
    phone: Optional[str] = None
    joining_date: Optional[date] = None
