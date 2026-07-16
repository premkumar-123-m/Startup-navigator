from fastapi import APIRouter, HTTPException, Depends
from typing import List
from models import Article, ArticleResponse
from firebase_config import get_db
from routers.auth import get_current_user
from datetime import datetime, timezone

router = APIRouter(prefix="/articles", tags=["articles"])

# Dependency to check if user is admin
def require_admin(current_user: dict = Depends(get_current_user)):
    db = get_db()
    if not db:
        raise HTTPException(status_code=503, detail="Database not connected")
    
    user_doc = db.collection("users").document(current_user["uid"]).get()
    if not user_doc.exists or user_doc.to_dict().get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin privileges required")
    return current_user

@router.get("/", response_model=List[ArticleResponse])
def get_articles():
    """Retrieve all articles from Firestore."""
    db = get_db()
    if not db:
        # Return mock data if DB not connected yet
        return [{"id": "mock_id", "title": "Mock Article", "content": "Db not connected yet.", "category": "Legal", "tags": [], "created_at": "now"}]
        
    docs = db.collection("articles").stream()
    articles = []
    for doc in docs:
        data = doc.to_dict()
        data["id"] = doc.id
        articles.append(data)
    return articles

@router.get("/{article_id}", response_model=ArticleResponse)
def get_article(article_id: str):
    """Retrieve a single article by ID."""
    db = get_db()
    if not db:
        raise HTTPException(status_code=503, detail="Database not connected")
        
    doc = db.collection("articles").document(article_id).get()
    if not doc.exists:
        raise HTTPException(status_code=404, detail="Article not found")
        
    data = doc.to_dict()
    data["id"] = doc.id
    return data

@router.post("/", response_model=ArticleResponse)
def create_article(article: Article, _: dict = Depends(require_admin)):
    """Admin only: Create a new article."""
    db = get_db()
    if not db:
        raise HTTPException(status_code=503, detail="Database not connected")
        
    article_dict = article.model_dump()
    article_dict["created_at"] = datetime.now(timezone.utc).isoformat()
    
    doc_ref = db.collection("articles").document()
    doc_ref.set(article_dict)
    
    article_dict["id"] = doc_ref.id
    return article_dict

@router.delete("/{article_id}")
def delete_article(article_id: str, _: dict = Depends(require_admin)):
    """Admin only: Delete an article."""
    db = get_db()
    if not db:
        raise HTTPException(status_code=503, detail="Database not connected")
        
    db.collection("articles").document(article_id).delete()
    return {"status": "deleted"}
