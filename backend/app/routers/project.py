from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from db import get_db
from schemas.requests.project import ProjectCreate, ProjectUpdate
from schemas.responses.project import ProjectResponse, ProjectAuthorOut
from services import project_service

router = APIRouter(prefix="/project", tags=["Project"])

@router.get("/by-supervisor/{supervisor_id}", response_model=List[ProjectResponse])
def get_projects_by_supervisor_id(supervisor_id: UUID, db: Session = Depends(get_db)):
    projects = project_service.get_projects_by_supervisor_id(db, supervisor_id)
    return [project_to_response(p) for p in projects]

@router.get("/by-author/{author_id}", response_model=List[ProjectResponse])
def get_projects_by_author_id(author_id: UUID, db: Session = Depends(get_db)):
    projects = project_service.get_projects_by_author_id(db, author_id)
    return [project_to_response(p) for p in projects]

def project_to_response(project):
    return ProjectResponse(
        id=project.id,
        title=project.title,
        abstract=project.abstract,
        keywords=project.keywords,
        link=project.link,
        is_thesis=project.is_thesis,
        supervisor_id=project.supervisor_id,
        authors=[ProjectAuthorOut(
            id=author.id,
            user_id=author.user_id,
            ownership_rank=author.ownership_rank
        ) for author in project.authors] if project.authors else [],
        created_at=str(getattr(project, 'created_at', None)),
        updated_at=str(getattr(project, 'updated_at', None)),
    )

@router.get("/", response_model=List[ProjectResponse])
def get_all_projects(db: Session = Depends(get_db)):
    projects = project_service.get_all_projects(db)
    return [project_to_response(p) for p in projects]

@router.get("/{project_id}", response_model=ProjectResponse)
def get_project_by_id(project_id: UUID, db: Session = Depends(get_db)):
    project = project_service.get_project_by_id(db, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project_to_response(project)

@router.post("/", response_model=ProjectResponse, status_code=201)
def create_project(data: ProjectCreate, db: Session = Depends(get_db)):
    project = project_service.create_project(db, data)
    return project_to_response(project)

@router.put("/{project_id}", response_model=ProjectResponse)
def update_project(project_id: UUID, data: ProjectUpdate, db: Session = Depends(get_db)):
    project = project_service.update_project(db, project_id, data)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project_to_response(project)

@router.delete("/{project_id}", status_code=204)
def delete_project(project_id: UUID, db: Session = Depends(get_db)):
    deleted = project_service.delete_project(db, project_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Project not found")
    return None
