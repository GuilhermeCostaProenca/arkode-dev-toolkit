from fastapi import APIRouter

router = APIRouter()

@router.get("/articles")
async def get_articles():
    """Endpoint para artigos da base de conhecimento"""
    return {"message": "Knowledge base articles"}
