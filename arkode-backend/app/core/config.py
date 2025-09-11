from pydantic_settings import BaseSettings
from typing import List
import os

class Settings(BaseSettings):
    # Configurações do banco de dados
    DATABASE_URL: str = "postgresql://user:password@localhost/arkode_db"
    
    # Configurações de segurança
    SECRET_KEY: str = "your-secret-key-here"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Configurações CORS
    ALLOWED_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:5173"]
    
    # Configurações do Supabase
    SUPABASE_URL: str = ""
    SUPABASE_KEY: str = ""
    
    # Configurações de APIs externas
    OPENAI_API_KEY: str = ""
    GITHUB_TOKEN: str = ""
    
    class Config:
        env_file = ".env"

settings = Settings()
