# Startup Navigator - Comprehensive Guide to Startups

A modern, AI-powered web application designed to help entrepreneurs explore and navigate the complexities of building a startup. From company registration and legal compliance to funding and growth strategies, this platform provides structured guides and instant, AI-generated answers based on a curated knowledge base.

## 🏛 Architecture

The application is built using a decoupled client-server architecture:

### Frontend (Client)
- **Framework**: React (bootstrapped with Vite for high performance).
- **Styling**: Tailwind CSS v4, utilizing a custom "fintech-inspired" color palette (Dark mode defaults, #11201A background, #FFB13C and #8CE26B accents).
- **Routing**: React Router for seamless Single Page Application (SPA) navigation.
- **Icons**: Lucide React.
- **Pages**: Home, Explore Topics, AI Search, Resources, Dashboard, About, and Contact.

### Backend (API Server)
- **Framework**: Python with FastAPI (chosen for its asynchronous capabilities, speed, and ease of AI integration).
- **Database**: Firebase Firestore (NoSQL document database) for storing articles, user profiles, and search history.
- **Authentication**: Firebase Authentication.
- **AI Integration**: Google Generative AI (Gemini 1.5 Flash).

## 🤖 AI Tools & Integration

This platform implements a **Retrieval-Augmented Generation (RAG)** approach to ensure that the AI provides accurate, context-aware answers rather than relying solely on its pre-trained data.

1. **Retrieval**: When a user asks a question via the frontend, the FastAPI backend queries the Firestore `articles` collection to retrieve documents relevant to the startup ecosystem.
2. **Augmentation**: The retrieved articles are injected into a system prompt as context.
3. **Generation**: The Google Gemini API processes the prompt and the context to generate a precise, professional response.

### Core Prompt Used
```text
You are an expert AI assistant for a platform called 'Startup Navigator'.
Your job is to answer questions from entrepreneurs based on the following curated context.
If the context does not contain the answer, use your general knowledge but mention that it's outside the official curated guide.

Context:
{context}

User Query: {query}

Answer clearly and professionally:
```

## 🚀 Deployment Process

The application is designed to be deployed across two separate environments:

### 1. Frontend Deployment (Vercel / Netlify)
1. Push the repository to GitHub.
2. Import the `frontend/` directory into Vercel or Netlify.
3. The build command will automatically be detected as `npm run build` and the output directory as `dist`.
4. Add the backend API URL to the frontend environment variables (e.g., `VITE_API_URL`).

### 2. Backend Deployment (Render / Railway)
1. Connect the repository to Render (Web Service) or Railway.
2. Set the Root Directory to `backend/`.
3. Build Command: `pip install -r requirements.txt`
4. Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. **Critical Environment Variables**:
   - `GOOGLE_API_KEY`: Your Google Gemini API key.
   - `FIREBASE_SERVICE_ACCOUNT_PATH`: The relative path to your `serviceAccountKey.json` file.

## 🔧 Local Setup

1. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

2. **Backend**:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # Or .\venv\Scripts\activate on Windows
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```
