from pydantic import BaseModel, EmailStr
from datetime import date
from uuid import UUID
from typing import Optional

# class AdminProfileResponse(BaseModel):
#     id: UUID
#     full_name: str
#     role: str
#     email: EmailStr
#     dept: str | None = None
#     phone: str | None = None
#     joining_date: date
#     user_id: UUID

#     class Config:
#         orm_mode = True

class AdminProfileResponse(BaseModel):
    id: Optional[UUID] = None
    full_name: Optional[str] = None
    role: Optional[str] = None
    email: Optional[EmailStr] = None
    dept: Optional[str] = None
    phone: Optional[str] = None
    joining_date: Optional[date] = None
    user_id: Optional[UUID] = None