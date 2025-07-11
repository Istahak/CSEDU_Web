from pydantic import BaseModel, EmailStr, Field
from datetime import date
from uuid import UUID

class AdminProfileCreateRequest(BaseModel):
    full_name: str = Field(..., max_length=100)
    role: str = Field(..., max_length=50)
    email: EmailStr
    dept: str | None = None
    phone: str | None = None
    joining_date: date
    user_id: UUID

class AdminProfileUpdateRequest(BaseModel):
    full_name: str | None = Field(None, max_length=100)
    role: str | None = Field(None, max_length=50)
    email: EmailStr | None = None
    dept: str | None = None
    phone: str | None = None
    joining_date: date | None = None
    user_id: UUID | None = None
