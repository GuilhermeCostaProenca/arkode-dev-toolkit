from pydantic import BaseModel

class WorkspaceIn(BaseModel):
    name: str

class WorkspaceOut(BaseModel):
    id: int
    name: str
    slug: str
    class Config:
        from_attributes = True
