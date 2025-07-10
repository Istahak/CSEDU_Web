from pydantic import BaseModel, EmailStr
from datetime import date
from uuid import UUID

class AdminProfileResponse(BaseModel):
    id: UUID
    full_name: str
    role: str
    email: EmailStr
    dept: str | None = None
    phone: str | None = None
    joining_date: date
    user_id: UUID

    class Config:
        orm_mode = True
