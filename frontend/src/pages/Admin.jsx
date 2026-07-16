import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/client';
import { ShieldAlert, Plus, Trash2, Loader2, FileText } from 'lucide-react';

const Admin = () => {
  const { userProfile, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Redirect if not admin
    if (!authLoading && userProfile?.role !== 'admin') {
      navigate('/');
      return;
    }

    if (userProfile?.role === 'admin') {
      fetchArticles();
    }
  }, [userProfile, authLoading, navigate]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/articles/');
      setArticles(response.data);
    } catch (err) {
      console.error("Failed to fetch articles:", err);
      setError("Failed to load articles.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateArticle = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const newArticle = {
        title,
        category,
        content,
        tags: tags.split(',').map(t => t.trim()).filter(t => t)
      };

      await apiClient.post('/articles/', newArticle);
      
      // Reset form and refresh list
      setTitle('');
      setCategory('');
      setContent('');
      setTags('');
      fetchArticles();
      
    } catch (err) {
      console.error("Failed to create article:", err);
      setError("Failed to create article.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;
    
    try {
      await apiClient.delete(`/articles/${id}`);
      setArticles(articles.filter(a => a.id !== id));
    } catch (err) {
      console.error("Failed to delete article:", err);
      alert("Failed to delete article");
    }
  };

  if (authLoading || loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-red-500" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24 min-h-screen">
      <div className="mb-8 border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <ShieldAlert className="w-8 h-8 text-red-500" />
          Admin Dashboard
        </h1>
        <p className="text-gray-600 mt-2">Manage the Startup Knowledge Base.</p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-8 border border-red-100">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Create Article Form */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-red-500" /> Add New Article
            </h2>
            <form onSubmit={handleCreateArticle} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  placeholder="e.g., Guide to SAFE Notes"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  placeholder="e.g., Funding"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  placeholder="e.g., legal, startup, seed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea
                  required
                  rows={6}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-red-500 focus:border-red-500 outline-none resize-none"
                  placeholder="Article content here..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors flex justify-center items-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Publish Article'}
              </button>
            </form>
          </div>
        </div>

        {/* Article List */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-500" /> Knowledge Base Articles
            </h2>
            
            {articles.length === 0 ? (
              <p className="text-gray-500 italic">No articles found. Add one to get started!</p>
            ) : (
              <div className="space-y-4">
                {articles.map((article) => (
                  <div key={article.id} className="border border-gray-200 rounded-xl p-4 hover:border-red-200 transition-colors flex justify-between items-start gap-4 group">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{article.title}</h3>
                      <div className="flex gap-2 items-center mt-1">
                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full font-medium">
                          {article.category}
                        </span>
                        {article.tags?.map(tag => (
                          <span key={tag} className="text-gray-400 text-xs">#{tag}</span>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500 mt-3 line-clamp-2">{article.content}</p>
                    </div>
                    
                    <button
                      onClick={() => handleDelete(article.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      title="Delete Article"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
