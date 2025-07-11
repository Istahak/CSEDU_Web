from sqlalchemy.orm import Session
from uuid import UUID
from typing import List, Optional
from models.publication import Publication
from models.author_publication import AuthorPublication
from schemas.requests.publication import PublicationCreate, PublicationUpdate, PublicationAuthorIn


def get_all_publications(db: Session) -> List[Publication]:
    return db.query(Publication).all()


def get_publication_by_id(db: Session, publication_id: UUID) -> Optional[Publication]:
    return db.query(Publication).filter(Publication.id == publication_id).first()


def get_publications_by_author_id(db: Session, author_id: UUID) -> List[Publication]:
    publication_ids = db.query(AuthorPublication.publication_id).filter(AuthorPublication.user_id == author_id).all()
    publication_ids = [pid[0] for pid in publication_ids]
    if not publication_ids:
        return []
    return db.query(Publication).filter(Publication.id.in_(publication_ids)).all()


def create_publication(db: Session, data: PublicationCreate) -> Publication:
    publication = Publication(
        title=data.title,
        venue=data.venue,
        year=data.year,
        type=data.type,
        link=data.link,
        not_listed_authors=data.not_listed_authors
    )
    db.add(publication)
    db.flush()
    if data.authors:
        for author in data.authors:
            author_obj = AuthorPublication(
                publication_id=publication.id,
                user_id=author.user_id,
                ownership_rank=author.ownership_rank
            )
            db.add(author_obj)
    db.commit()
    db.refresh(publication)
    return publication


def update_publication(db: Session, publication_id: UUID, data: PublicationUpdate) -> Optional[Publication]:
    publication = db.query(Publication).filter(Publication.id == publication_id).first()
    if not publication:
        return None
    for key, value in data.dict(exclude_unset=True).items():
        if key == "authors":
            continue
        setattr(publication, key, value)
    if data.authors is not None:
        db.query(AuthorPublication).filter(AuthorPublication.publication_id == publication_id).delete()
        for author in data.authors:
            author_obj = AuthorPublication(
                publication_id=publication_id,
                user_id=author.user_id,
                ownership_rank=author.ownership_rank
            )
            db.add(author_obj)
    db.commit()
    db.refresh(publication)
    return publication


def delete_publication(db: Session, publication_id: UUID) -> bool:
    publication = db.query(Publication).filter(Publication.id == publication_id).first()
    if not publication:
        return False
    db.delete(publication)
    db.commit()
    return True
