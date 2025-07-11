from typing import List, Optional
from uuid import UUID
from pydantic import BaseModel

class PublicationAuthorOut(BaseModel):
    id: UUID
    user_id: UUID
    ownership_rank: Optional[str] = None

class PublicationResponse(BaseModel):
    id: UUID
    title: Optional[str] = None
    venue: Optional[str] = None
    year: Optional[str] = None
    type: Optional[str] = None
    link: Optional[str] = None
    not_listed_authors: Optional[str] = None
    authors: Optional[List[PublicationAuthorOut]] = None
    created_at: Optional[str] = None
    updated_at: Optional[str] = None
