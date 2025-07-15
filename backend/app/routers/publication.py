from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from db import get_db
from schemas.requests.publication import PublicationCreate, PublicationUpdate
from schemas.responses.publication import PublicationResponse, PublicationAuthorOut
from services import publication_service

router = APIRouter(prefix="/publication", tags=["Publication"])

def publication_to_response(publication):
    return PublicationResponse(
        id=publication.id,
        title=publication.title,
        venue=publication.venue,
        year=publication.year,
        type=publication.type,
        link=publication.link,
        not_listed_authors=publication.not_listed_authors,
        authors=[PublicationAuthorOut(
            id=author.id,
            user_id=author.user_id,
            ownership_rank=author.ownership_rank
        ) for author in publication.authors] if publication.authors else [],
        created_at=str(getattr(publication, 'created_at', None)),
        updated_at=str(getattr(publication, 'updated_at', None)),
    )

@router.get("/", response_model=List[PublicationResponse])
def get_all_publications(db: Session = Depends(get_db)):
    publications = publication_service.get_all_publications(db)
    return [publication_to_response(p) for p in publications]

@router.get("/{publication_id}", response_model=PublicationResponse)
def get_publication_by_id(publication_id: UUID, db: Session = Depends(get_db)):
    publication = publication_service.get_publication_by_id(db, publication_id)
    if not publication:
        raise HTTPException(status_code=404, detail="Publication not found")
    return publication_to_response(publication)

@router.get("/by-author/{author_id}", response_model=List[PublicationResponse])
def get_publications_by_author_id(author_id: UUID, db: Session = Depends(get_db)):
    publications = publication_service.get_publications_by_author_id(db, author_id)
    return [publication_to_response(p) for p in publications]

@router.post("/", response_model=PublicationResponse, status_code=201)
def create_publication(data: PublicationCreate, db: Session = Depends(get_db)):
    publication = publication_service.create_publication(db, data)
    return publication_to_response(publication)

@router.put("/{publication_id}", response_model=PublicationResponse)
def update_publication(publication_id: UUID, data: PublicationUpdate, db: Session = Depends(get_db)):
    publication = publication_service.update_publication(db, publication_id, data)
    if not publication:
        raise HTTPException(status_code=404, detail="Publication not found")
    return publication_to_response(publication)

@router.delete("/{publication_id}", status_code=204)
def delete_publication(publication_id: UUID, db: Session = Depends(get_db)):
    deleted = publication_service.delete_publication(db, publication_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Publication not found")
    return None
