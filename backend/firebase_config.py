import os
import json
import firebase_admin
from firebase_admin import credentials, firestore, auth

# Path to the service account key (fallback for local dev)
SERVICE_ACCOUNT_PATH = os.getenv("FIREBASE_SERVICE_ACCOUNT_PATH", "serviceAccountKey.json")

def initialize_firebase():
    """Initializes Firebase Admin SDK if not already initialized."""
    if not firebase_admin._apps:
        try:
            # 1. Try to load from JSON string in environment variable (Production)
            firebase_creds_json = os.getenv("FIREBASE_CREDENTIALS_JSON")
            if firebase_creds_json:
                cred_dict = json.loads(firebase_creds_json)
                cred = credentials.Certificate(cred_dict)
                firebase_admin.initialize_app(cred)
                print("Firebase initialized successfully from environment variable.")
            # 2. Fall back to local service account file (Local Dev)
            elif os.path.exists(SERVICE_ACCOUNT_PATH):
                cred = credentials.Certificate(SERVICE_ACCOUNT_PATH)
                firebase_admin.initialize_app(cred)
                print("Firebase initialized successfully from file.")
            else:
                print("Warning: No Firebase credentials found. Firebase is NOT initialized.")
        except Exception as e:
            print(f"Error initializing Firebase: {e}")

# Initialize at module import
initialize_firebase()

def get_db():
    """Returns the Firestore database client."""
    if firebase_admin._apps:
        return firestore.client()
    return None

def verify_token(token: str):
    """Verifies a Firebase ID token and returns the decoded token."""
    if firebase_admin._apps:
        try:
            decoded_token = auth.verify_id_token(token)
            return decoded_token
        except Exception as e:
            print(f"Token verification failed: {e}")
            return None
    return None
