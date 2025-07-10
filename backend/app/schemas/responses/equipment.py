from pydantic import BaseModel
from uuid import UUID
from typing import Optional

class EquipmentResponse(BaseModel):
    id: UUID
    name: str
    details: Optional[str] = None
    amount: float

    class Config:
        from_attributes = True
