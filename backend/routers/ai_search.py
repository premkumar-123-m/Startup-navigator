from fastapi import APIRouter, Depends
from pydantic import BaseModel
from ai_service import search_articles, generate_answer
from firebase_config import get_db
from routers.auth import get_current_user
from datetime import datetime, timezone
from google.cloud.firestore import ArrayUnion

router = APIRouter(prefix="/ai", tags=["ai"])

class SearchRequest(BaseModel):
    query: str

class SearchResponse(BaseModel):
    answer: str
    sources: list

@router.post("/search", response_model=SearchResponse)
def ai_search(request: SearchRequest, current_user: dict = Depends(get_current_user)):
    """
    Takes a user query, retrieves relevant articles, and uses Gemini to answer.
    Saves the query to the user's search history.
    """
    query = request.query
    
    # 1. Retrieve context (RAG)
    context_articles = search_articles(query)
    
    # 2. Generate Answer
    answer = generate_answer(query, context_articles)
    
    # 3. Log search history
    db = get_db()
    if db:
        user_ref = db.collection("users").document(current_user["uid"])
        try:
            user_ref.update({
                "searches": ArrayUnion([{
                    "query": query,
                    "timestamp": datetime.now(timezone.utc).isoformat()
                }])
            })
        except Exception as e:
            print(f"Failed to log search history: {e}")
            
    return {
        "answer": answer,
        "sources": [c["title"] for c in context_articles]
    }
