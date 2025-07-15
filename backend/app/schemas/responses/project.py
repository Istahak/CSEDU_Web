from typing import List, Optional
from uuid import UUID
from pydantic import BaseModel

class ProjectAuthorOut(BaseModel):
    id: UUID
    user_id: UUID
    ownership_rank: Optional[str] = None

class ProjectResponse(BaseModel):
    id: UUID
    title: Optional[str] = None
    abstract: Optional[str] = None
    keywords: Optional[str] = None
    link: Optional[str] = None
    is_thesis: Optional[bool] = None
    supervisor_id: Optional[UUID] = None
    authors: Optional[List[ProjectAuthorOut]] = None
    created_at: Optional[str] = None
    updated_at: Optional[str] = None
