from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.db.session import Base

class Workspace(Base):
    __tablename__ = "workspaces"
    id = Column(Integer, primary_key=True)
    name = Column(String(160), nullable=False)
    slug = Column(String(160), unique=True, index=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
