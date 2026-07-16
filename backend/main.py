from dotenv import load_dotenv
load_dotenv()

import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from routers import auth, articles, dashboard, ai_search

app = FastAPI(title="Startup Navigator API")

# Allow requests from the Vite frontend
allowed_origins_env = os.getenv("ALLOWED_ORIGINS")
origins = allowed_origins_env.split(",") if allowed_origins_env else ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router)
app.include_router(articles.router)
app.include_router(dashboard.router)
app.include_router(ai_search.router)

class HealthCheck(BaseModel):
    status: str

@app.get("/", response_model=HealthCheck)
def read_root():
    return {"status": "ok", "message": "Startup Navigator API is running"}

