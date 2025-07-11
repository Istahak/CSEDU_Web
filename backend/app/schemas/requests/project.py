from typing import List, Optional
from uuid import UUID
from pydantic import BaseModel

class ProjectAuthorIn(BaseModel):
    user_id: UUID
    ownership_rank: Optional[str] = None

class ProjectCreate(BaseModel):
    title: Optional[str] = None
    abstract: Optional[str] = None
    keywords: Optional[str] = None
    link: Optional[str] = None
    is_thesis: Optional[bool] = None
    supervisor_id: Optional[UUID] = None
    authors: Optional[List[ProjectAuthorIn]] = None

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    abstract: Optional[str] = None
    keywords: Optional[str] = None
    link: Optional[str] = None
    is_thesis: Optional[bool] = None
    supervisor_id: Optional[UUID] = None
    authors: Optional[List[ProjectAuthorIn]] = None
