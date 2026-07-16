from fastapi import APIRouter, HTTPException, Depends, Header
from typing import Optional
from firebase_config import verify_token, get_db

router = APIRouter(prefix="/auth", tags=["auth"])

def get_current_user(authorization: Optional[str] = Header(None)):
    """Dependency to extract and verify Firebase token from Authorization header."""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid or missing Authorization header")
    
    token = authorization.split("Bearer ")[1]
    decoded_token = verify_token(token)
    
    if not decoded_token:
        raise HTTPException(status_code=401, detail="Invalid Firebase token")
    
    return decoded_token

@router.post("/sync")
def sync_user(current_user: dict = Depends(get_current_user)):
    """Syncs the Firebase user with Firestore, creating a profile if it doesn't exist."""
    db = get_db()
    if not db:
        raise HTTPException(status_code=503, detail="Database not connected")
        
    uid = current_user.get("uid")
    email = current_user.get("email")
    
    user_ref = db.collection("users").document(uid)
    user_doc = user_ref.get()
    
    if not user_doc.exists:
        # Create new user profile
        new_profile = {
            "uid": uid,
            "email": email,
            "role": "user",
            "searches": [],
            "saved_articles": []
        }
        user_ref.set(new_profile)
        return {"status": "created", "profile": new_profile}
    
    return {"status": "synced", "profile": user_doc.to_dict()}
