from fastapi import APIRouter, HTTPException, Depends
from firebase_config import get_db
from routers.auth import get_current_user

router = APIRouter(prefix="/dashboard", tags=["dashboard"])

@router.get("/stats")
def get_dashboard_stats(current_user: dict = Depends(get_current_user)):
    """Retrieve dashboard statistics for the logged-in user."""
    db = get_db()
    if not db:
        # Mock data if not connected
        return {
            "total_searches": 24,
            "saved_articles": 12,
            "topics_explored": 5,
            "recent_searches": ["Mock query 1", "Mock query 2"]
        }
        
    user_doc = db.collection("users").document(current_user["uid"]).get()
    if not user_doc.exists:
        raise HTTPException(status_code=404, detail="User profile not found")
        
    data = user_doc.to_dict()
    searches = data.get("searches") or []
    saved = data.get("saved_articles") or []
    
    return {
        "total_searches": len(searches),
        "saved_articles": len(saved),
        "topics_explored": len(set([s.get("category", "General") for s in searches])), # simplified
        "recent_searches": [s.get("query") for s in searches[-5:]] # last 5
    }
