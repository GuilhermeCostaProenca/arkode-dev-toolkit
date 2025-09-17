from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime
from app.db.session import Base

class Project(Base):
    __tablename__ = "projects"
    id = Column(Integer, primary_key=True)
    workspace_id = Column(Integer, ForeignKey("workspaces.id"), index=True, nullable=False)
    name = Column(String(160), nullable=False)
    status = Column(String(32), default="draft")  # draft|active|done
    created_at = Column(DateTime, default=datetime.utcnow)
