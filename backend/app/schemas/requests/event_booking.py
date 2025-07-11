from typing import Optional
from uuid import UUID
from pydantic import BaseModel, EmailStr

class EventBookingCreate(BaseModel):
    event_id: UUID
    first_name: str
    last_name: str
    email: EmailStr
    phone_number: str
    department: Optional[str] = None
    special_requests: Optional[str] = None

class EventBookingUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone_number: Optional[str] = None
    department: Optional[str] = None
    special_requests: Optional[str] = None
    is_approved: Optional[bool] = None

class EventBookingApprove(BaseModel):
    is_approved: bool = True
