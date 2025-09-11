from fastapi import APIRouter

router = APIRouter()

@router.get("/leads")
async def get_leads():
    """Endpoint para leads da agência"""
    return {"message": "Agency leads endpoint"}
