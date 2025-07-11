from pydantic import BaseModel
from uuid import UUID

class PaymentUserResponse(BaseModel):
    id: UUID
    payment_id: UUID
    user_id: UUID
    is_paid: bool

    class Config:
        orm_mode = True

class PaymentUserList(BaseModel):
    payment_users: list[PaymentUserResponse]
