from sqlalchemy.orm import Session
from uuid import UUID
from typing import List, Optional
from models.project import Project
from models.author_project import AuthorProject
from models.student_profile import StudentProfile
from schemas.requests.project import ProjectCreate, ProjectUpdate, ProjectAuthorIn
from schemas.responses.supervised_student import SupervisedStudentOut
from sqlalchemy import or_


def get_projects_by_supervisor_id(db: Session, supervisor_id: UUID) -> List[Project]:
    return db.query(Project).filter(Project.supervisor_id == supervisor_id).all()


def get_supervised_students(db: Session, supervisor_id: UUID):
    # Get all projects supervised by supervisor_id
    projects = db.query(Project).filter(Project.supervisor_id == supervisor_id).all()
    result = []
    for project in projects:
        # For each project, get all author user_ids
        author_links = db.query(AuthorProject).filter(AuthorProject.project_id == project.id).all()
        for author in author_links:
            # For each author, get the student profile
            student_profile = db.query(StudentProfile).filter(StudentProfile.user_id == author.user_id).first()
            if student_profile:
                result.append(SupervisedStudentOut(
                    name=student_profile.full_name,
                    project_title=project.title,
                    batch=student_profile.batch,
                    email=student_profile.email,
                    phone=student_profile.phone
                ))
    return result

def get_projects_by_author_id(db: Session, author_id: UUID) -> List[Project]:
    project_ids = db.query(AuthorProject.project_id).filter(AuthorProject.user_id == author_id).all()
    project_ids = [pid[0] for pid in project_ids]
    if not project_ids:
        return []
    return db.query(Project).filter(Project.id.in_(project_ids)).all()


def get_all_projects(db: Session) -> List[Project]:
    return db.query(Project).all()


def get_project_by_id(db: Session, project_id: UUID) -> Optional[Project]:
    return db.query(Project).filter(Project.id == project_id).first()


def create_project(db: Session, data: ProjectCreate) -> Project:
    project = Project(
        title=data.title,
        abstract=data.abstract,
        keywords=data.keywords,
        link=data.link,
        is_thesis=data.is_thesis,
        supervisor_id=data.supervisor_id
    )
    db.add(project)
    db.flush()  # get project.id before adding authors
    if data.authors:
        for author in data.authors:
            author_obj = AuthorProject(
                project_id=project.id,
                user_id=author.user_id,
                ownership_rank=author.ownership_rank
            )
            db.add(author_obj)
    db.commit()
    db.refresh(project)
    return project


def update_project(db: Session, project_id: UUID, data: ProjectUpdate) -> Optional[Project]:
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        return None
    for key, value in data.dict(exclude_unset=True).items():
        if key == "authors":
            continue
        setattr(project, key, value)
    if data.authors is not None:
        db.query(AuthorProject).filter(AuthorProject.project_id == project_id).delete()
        for author in data.authors:
            author_obj = AuthorProject(
                project_id=project_id,
                user_id=author.user_id,
                ownership_rank=author.ownership_rank
            )
            db.add(author_obj)
    db.commit()
    db.refresh(project)
    return project


def delete_project(db: Session, project_id: UUID) -> bool:
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        return False
    db.delete(project)
    db.commit()
    return True
