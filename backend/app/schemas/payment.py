from pydantic import BaseModel, Field
from uuid import UUID
from typing import Optional

class PaymentBase(BaseModel):
    description: str = Field(..., max_length=255)
    amount: float
    semester: str = Field(..., max_length=50)

class PaymentCreate(PaymentBase):
    pass

class PaymentUpdate(PaymentBase):
    pass

class PaymentInDBBase(PaymentBase):
    id: UUID

    class Config:
        orm_mode = True

class Payment(PaymentInDBBase):
    pass

class PaymentList(BaseModel):
    payments: list[Payment]
