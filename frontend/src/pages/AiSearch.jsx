import { useState } from 'react';
import { Send, Bot, User, Sparkles, Loader2, BookOpen } from 'lucide-react';
import apiClient from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

const AiSearch = () => {
  const location = useLocation();
  const [query, setQuery] = useState(location.state?.initialQuery || '');
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: 'Hello! I am your AI Startup Navigator. Ask me anything about company registration, funding, marketing, or legal compliance.' }
  ]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    if (!currentUser) {
      // Require login to use AI
      navigate('/login', { state: { from: { pathname: '/ai-search' } } });
      return;
    }
    
    // Add user message
    const userMessageId = Date.now();
    const newMessages = [...messages, { id: userMessageId, type: 'user', text: query }];
    setMessages(newMessages);
    const currentQuery = query;
    setQuery('');
    setIsLoading(true);
    
    try {
      const response = await apiClient.post('/ai/search', { query: currentQuery });
      
      setMessages([...newMessages, { 
        id: Date.now() + 1, 
        type: 'bot', 
        text: response.data.answer,
        sources: response.data.sources
      }]);
    } catch (error) {
      console.error("AI Search Error:", error);
      setMessages([...newMessages, { 
        id: Date.now() + 1, 
        type: 'bot', 
        text: 'Sorry, I encountered an error while trying to answer your question. Please ensure you are logged in and the backend is running.',
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24 h-screen flex flex-col">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            AI Search <Sparkles className="w-6 h-6 text-[#FF6A00]" />
          </h1>
          <p className="text-gray-600 mt-1">Get instant answers from our curated startup knowledge base.</p>
        </div>
      </div>

      <div className="flex-1 bg-white border border-gray-200 rounded-2xl flex flex-col overflow-hidden shadow-xl shadow-orange-100">
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-4 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.type === 'bot' && (
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0 border border-orange-200">
                  <Bot className="w-5 h-5 text-[#FF6A00]" />
                </div>
              )}
              
              <div className={`max-w-[80%] flex flex-col gap-2 ${
                msg.type === 'user' 
                  ? 'items-end' 
                  : 'items-start'
              }`}>
                <div className={`p-4 rounded-2xl ${
                  msg.type === 'user' 
                    ? 'bg-[#FF6A00] text-white rounded-tr-sm shadow-md shadow-orange-500/20' 
                    : msg.isError 
                      ? 'bg-red-50 border border-red-200 text-red-700 rounded-tl-sm'
                      : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm shadow-sm'
                }`}>
                  <p className={msg.type === 'user' ? 'font-medium' : 'leading-relaxed whitespace-pre-wrap'}>{msg.text}</p>
                </div>
                
                {/* Sources block */}
                {msg.sources && msg.sources.length > 0 && (
                  <div className="bg-gray-100/80 border border-gray-200 rounded-lg p-3 text-sm text-gray-600 w-full max-w-md">
                    <div className="flex items-center gap-2 font-medium mb-1 text-gray-700">
                      <BookOpen className="w-4 h-4" />
                      Sources
                    </div>
                    <ul className="list-disc list-inside space-y-1">
                      {msg.sources.map((src, idx) => (
                        <li key={idx}>{src}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {msg.type === 'user' && (
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0 border border-orange-200 overflow-hidden">
                  <User className="w-5 h-5 text-[#FF6A00]" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-4 justify-start">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0 border border-orange-200">
                <Bot className="w-5 h-5 text-[#FF6A00]" />
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm shadow-sm p-4 flex items-center gap-2 text-gray-500">
                <Loader2 className="w-5 h-5 animate-spin text-[#FF6A00]" />
                Searching knowledge base...
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-200">
          <form onSubmit={handleSearch} className="relative flex items-center">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={isLoading}
              placeholder={currentUser ? "Ask a question (e.g., 'What is a SAFE note?')" : "Please login to ask questions"}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-full pl-6 pr-14 py-4 focus:outline-none focus:border-[#FF6A00] focus:ring-1 focus:ring-[#FF6A00] transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!query.trim() || isLoading}
              className="absolute right-2 p-2 bg-[#FF6A00] hover:bg-[#E65100] text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          <div className="text-center mt-3">
            <p className="text-xs text-gray-500">AI can make mistakes. Verify important information.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiSearch;
