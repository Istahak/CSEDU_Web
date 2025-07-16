"""
Item Pydantic schemas
"""
from typing import Optional
from pydantic import BaseModel


class ItemBase(BaseModel):
    """Base item schema"""
    title: str
    description: Optional[str] = None


class ItemCreate(ItemBase):
    """Schema for creating an item"""
    pass


class ItemUpdate(ItemBase):
    """Schema for updating an item"""
    title: Optional[str] = None


class ItemInDB(ItemBase):
    """Schema for item as stored in database"""
    id: int
    owner_id: int
    
    class Config:
        from_attributes = True


class Item(ItemBase):
    """Schema for item as returned by API"""
    id: int
    owner_id: int
    
    class Config:
        from_attributes = True
