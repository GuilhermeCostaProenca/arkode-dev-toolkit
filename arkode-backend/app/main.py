from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api import studio, orion, agency, knowledge, auth

app = FastAPI(
    title="Arkode Backend API",
    description="API backend para o Arkode Dev Toolkit",
    version="1.0.0"
)

# Configuração CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclusão das rotas
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(studio.router, prefix="/api/studio", tags=["Studio"])
app.include_router(orion.router, prefix="/api/orion", tags=["Orion AI"])
app.include_router(agency.router, prefix="/api/agency", tags=["Agency"])
app.include_router(knowledge.router, prefix="/api/kb", tags=["Knowledge"])

@app.get("/")
async def root():
    return {"message": "Arkode Backend API is running!"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
