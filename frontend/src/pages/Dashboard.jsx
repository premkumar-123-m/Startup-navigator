import { Book, FileText, Video, ExternalLink, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import apiClient from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login', { state: { from: { pathname: '/dashboard' } } });
      return;
    }

    const fetchStats = async () => {
      try {
        const response = await apiClient.get('/dashboard/stats');
        setStats(response.data);
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [currentUser, navigate]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24 min-h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#FF6A00] mb-4" />
        <p className="text-gray-500">Loading your dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="bg-red-50 text-red-600 p-6 rounded-2xl max-w-md w-full border border-red-100">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here is an overview of your activity.</p>
        </div>
        <div className="px-4 py-2 bg-orange-50 border border-orange-200 rounded-full text-sm font-medium text-gray-800">
          User: <span className="text-[#FF6A00]">{currentUser?.email}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
          <p className="text-gray-500 text-sm mb-1">Total AI Searches</p>
          <h3 className="text-4xl font-bold text-gray-900 mb-4">{stats?.total_searches || 0}</h3>
          <div className="w-full bg-gray-100 rounded-full h-1.5">
            <div className="bg-[#FF6A00] h-1.5 rounded-full" style={{ width: `${Math.min(100, (stats?.total_searches || 0) * 5)}%` }}></div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
          <p className="text-gray-500 text-sm mb-1">Articles Saved</p>
          <h3 className="text-4xl font-bold text-gray-900 mb-4">{stats?.saved_articles || 0}</h3>
          <div className="w-full bg-gray-100 rounded-full h-1.5">
            <div className="bg-[#FF8C00] h-1.5 rounded-full" style={{ width: `${Math.min(100, (stats?.saved_articles || 0) * 10)}%` }}></div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
          <p className="text-gray-500 text-sm mb-1">Topics Explored</p>
          <h3 className="text-4xl font-bold text-gray-900 mb-4">{stats?.topics_explored || 0}</h3>
          <div className="flex gap-1 mt-4">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            <span className="w-2 h-2 rounded-full bg-red-400"></span>
            <span className="w-2 h-2 rounded-full bg-[#FF6A00]"></span>
            <span className="w-2 h-2 rounded-full bg-[#FF8C00]"></span>
            <span className="w-2 h-2 rounded-full bg-purple-400"></span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Searches */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recent AI Searches</h2>
          {stats?.recent_searches?.length > 0 ? (
            <div className="space-y-4">
              {stats.recent_searches.map((query, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50/50 transition-colors cursor-pointer">
                  <p className="text-gray-700 text-sm">{query}</p>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No searches yet. Try asking the AI Navigator something!</p>
          )}
        </div>

        {/* Quick Links / Saved */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Saved Articles</h2>
          <div className="space-y-4">
            <div className="flex gap-3 items-start">
              <div className="p-2 bg-blue-50 rounded-lg shrink-0">
                <Book className="w-4 h-4 text-blue-500" />
              </div>
              <div>
                <h4 className="text-gray-900 text-sm font-medium mb-1 hover:text-[#FF6A00] cursor-pointer transition-colors">The Ultimate Guide to Y-Combinator</h4>
                <p className="text-xs text-gray-500">Funding & Investment</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <div className="p-2 bg-red-50 rounded-lg shrink-0">
                <FileText className="w-4 h-4 text-red-500" />
              </div>
              <div>
                <h4 className="text-gray-900 text-sm font-medium mb-1 hover:text-[#FF6A00] cursor-pointer transition-colors">Understanding Term Sheets</h4>
                <p className="text-xs text-gray-500">Legal Compliance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
