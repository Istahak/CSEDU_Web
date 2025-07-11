from pydantic import BaseModel, Field
from typing import Optional
from uuid import UUID

class EquipmentCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100, description="Equipment name")
    details: Optional[str] = Field(None, description="Details about the equipment")
    amount: float = Field(..., gt=0, description="Amount/quantity of equipment")

class EquipmentUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    details: Optional[str] = Field(None)
    amount: Optional[float] = Field(None, gt=0)
