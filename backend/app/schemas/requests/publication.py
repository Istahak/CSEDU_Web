from typing import List, Optional
from uuid import UUID
from pydantic import BaseModel

class PublicationAuthorIn(BaseModel):
    user_id: UUID
    ownership_rank: Optional[str] = None

class PublicationCreate(BaseModel):
    title: Optional[str] = None
    venue: Optional[str] = None
    year: Optional[str] = None
    type: Optional[str] = None
    link: Optional[str] = None
    not_listed_authors: Optional[str] = None
    authors: Optional[List[PublicationAuthorIn]] = None

class PublicationUpdate(BaseModel):
    title: Optional[str] = None
    venue: Optional[str] = None
    year: Optional[str] = None
    type: Optional[str] = None
    link: Optional[str] = None
    not_listed_authors: Optional[str] = None
    authors: Optional[List[PublicationAuthorIn]] = None
