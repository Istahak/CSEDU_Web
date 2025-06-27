"""
Items management endpoints
"""
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.item import Item, ItemCreate, ItemUpdate

router = APIRouter()


@router.get("/", response_model=List[Item])
async def read_items(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """
    Retrieve items
    """
    return {"message": "Get items endpoint"}


@router.post("/", response_model=Item)
async def create_item(
    item: ItemCreate,
    db: Session = Depends(get_db)
):
    """
    Create new item
    """
    return {"message": "Create item endpoint"}


@router.get("/{item_id}", response_model=Item)
async def read_item(
    item_id: int,
    db: Session = Depends(get_db)
):
    """
    Get item by ID
    """
    return {"message": f"Get item {item_id} endpoint"}


@router.put("/{item_id}", response_model=Item)
async def update_item(
    item_id: int,
    item: ItemUpdate,
    db: Session = Depends(get_db)
):
    """
    Update item
    """
    return {"message": f"Update item {item_id} endpoint"}


@router.delete("/{item_id}")
async def delete_item(
    item_id: int,
    db: Session = Depends(get_db)
):
    """
    Delete item
    """
    return {"message": f"Delete item {item_id} endpoint"}
