from pydantic import BaseModel

class ProjectIn(BaseModel):
    workspace_id: int
    name: str

class ProjectOut(BaseModel):
    id: int
    name: str
    status: str
    class Config:
        from_attributes = True

class ProjectDetailOut(ProjectOut):
    stats: dict
