from pydantic import BaseModel
from uuid import UUID
from typing import Optional

class PaymentUserCreate(BaseModel):
    payment_id: UUID
    user_id: UUID
    is_paid: Optional[bool] = False

class PaymentUserUpdate(BaseModel):
    is_paid: Optional[bool] = None
