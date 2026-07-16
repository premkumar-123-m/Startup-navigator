import os
import google.generativeai as genai
from firebase_config import get_db

# Configure Gemini API
# This requires a GOOGLE_API_KEY environment variable to be set.
api_key = os.getenv("GOOGLE_API_KEY", "mock_api_key_for_now")
if api_key != "mock_api_key_for_now":
    genai.configure(api_key=api_key)

def search_articles(query: str):
    """
    Simple RAG implementation.
    Fetches articles from Firestore to act as context.
    In a production app, this would use vector embeddings and cosine similarity.
    """
    db = get_db()
    if not db:
        return [{"title": "Mock Article", "content": "This is mock context because the DB is not connected."}]
        
    # Naive search: grab recent articles to build context.
    # A real RAG would query a vector DB (e.g. Pinecone) or use Firestore vector search.
    docs = db.collection("articles").limit(5).stream()
    context = []
    for doc in docs:
        data = doc.to_dict()
        context.append({"title": data.get("title", ""), "content": data.get("content", "")})
    
    return context

def generate_answer(query: str, context: list) -> str:
    """Uses Gemini to generate an answer based on the provided context."""
    if api_key == "mock_api_key_for_now":
        return f"[Mock Response] Based on the query '{query}', here is a simulated AI answer. Please add your GOOGLE_API_KEY to the environment variables to enable live AI responses."
        
    prompt = f"""
    You are an expert AI assistant for a platform called 'Startup Navigator'.
    Your job is to answer questions from entrepreneurs based on the following curated context.
    If the context does not contain the answer, use your general knowledge but mention that it's outside the official curated guide.
    
    Context:
    {context}
    
    User Query: {query}
    
    Answer clearly and professionally:
    """
    
    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Error generating AI response: {e}")
        return "Sorry, I encountered an error while trying to process your request."
