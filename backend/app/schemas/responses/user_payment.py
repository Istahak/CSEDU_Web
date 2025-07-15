from pydantic import BaseModel
from uuid import UUID

class UserPaymentResponse(BaseModel):
    description: str
    amount: float
    semester: str
    id: UUID
    user_id: UUID
    is_paid: bool

    class Config:
        orm_mode = True

class UserPaymentsList(BaseModel):
    payments: list[UserPaymentResponse]
