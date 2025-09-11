from fastapi import APIRouter

router = APIRouter()

@router.post("/generate")
async def generate_content():
    """Endpoint para geração de conteúdo com Orion AI"""
    return {"message": "Orion AI content generation"}
