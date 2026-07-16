from pydantic import BaseModel
from typing import Optional, List

class Article(BaseModel):
    title: str
    content: str
    category: str
    tags: Optional[List[str]] = []
    created_at: Optional[str] = None

class ArticleResponse(Article):
    id: str

class SearchHistory(BaseModel):
    query: str
    timestamp: str

class UserProfile(BaseModel):
    uid: str
    email: str
    role: str = "user" # 'user' or 'admin'
    searches: Optional[List[SearchHistory]] = []
    saved_articles: Optional[List[str]] = [] # List of article IDs
