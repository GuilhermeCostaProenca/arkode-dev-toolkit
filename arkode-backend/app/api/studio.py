from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_studio_projects():
    """Endpoint para projetos do Studio"""
    return {"message": "Studio projects endpoint"}
