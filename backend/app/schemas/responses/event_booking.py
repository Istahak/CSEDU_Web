from typing import Optional
from uuid import UUID
from pydantic import BaseModel, EmailStr

class EventBookingResponse(BaseModel):
    id: UUID
    event_id: UUID
    first_name: str
    last_name: str
    email: EmailStr
    phone_number: str
    department: Optional[str] = None
    special_requests: Optional[str] = None
    is_approved: bool

    class Config:
        orm_mode = True
