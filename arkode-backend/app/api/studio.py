from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from app.core.auth import get_current_user
from app.db.session import get_db, Base, engine
from app.models.workspace import Workspace
from app.models.project import Project
from app.schemas.workspace_schema import WorkspaceIn, WorkspaceOut
from app.schemas.project_schema import ProjectIn, ProjectOut, ProjectDetailOut

router = APIRouter()
Base.metadata.create_all(bind=engine)

def slugify(name: str) -> str:
    return "-".join(name.lower().strip().split())

@router.get("/workspaces", response_model=list[WorkspaceOut])
def list_workspaces(db: Session = Depends(get_db), user=Depends(get_current_user)):
    return db.query(Workspace).all()

@router.post("/workspaces", response_model=WorkspaceOut)
def create_workspace(payload: WorkspaceIn, db: Session = Depends(get_db), user=Depends(get_current_user)):
    slug = slugify(payload.name)
    if db.query(Workspace).filter_by(slug=slug).first():
        raise HTTPException(400, "workspace slug already exists")
    ws = Workspace(name=payload.name, slug=slug)
    db.add(ws); db.commit(); db.refresh(ws)
    return ws

@router.get("/projects", response_model=list[ProjectOut])
def list_projects(workspace_id: int = Query(...), db: Session = Depends(get_db), user=Depends(get_current_user)):
    return db.query(Project).filter_by(workspace_id=workspace_id).all()

@router.post("/projects", response_model=ProjectOut)
def create_project(payload: ProjectIn, db: Session = Depends(get_db), user=Depends(get_current_user)):
    p = Project(**payload.model_dump())
    db.add(p); db.commit(); db.refresh(p)
    return p

@router.get("/projects/{pid}", response_model=ProjectDetailOut)
def project_detail(pid: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    p = db.query(Project).get(pid)
    if not p:
        raise HTTPException(404, "project not found")
    return {"id": p.id, "name": p.name, "status": p.status, "stats": {"stories": 0, "tasks": 0}}
