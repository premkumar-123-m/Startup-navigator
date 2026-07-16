import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Bot, TrendingUp } from 'lucide-react';
import heroBg from '../assets/hero-bg.png';

const Home = () => {
  return (
    <div className="flex flex-col bg-white">
      {/* Hero Section */}
      <section className="relative px-6 lg:px-8 py-24 sm:py-32 flex flex-col items-center justify-center text-center min-h-[80vh] overflow-hidden">
        <div 
          className="absolute inset-0 -z-20 bg-cover bg-center" 
          style={{ backgroundImage: `url(${heroBg})` }}
        ></div>
        {/* Semi-transparent overlay to ensure text readability */}
        <div className="absolute inset-0 -z-10 bg-white/60 backdrop-blur-[2px]"></div>
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100/80 border border-orange-200 mb-8 backdrop-blur-md shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-[#FF6A00] animate-pulse"></span>
          <span className="text-sm font-medium text-orange-800">New AI Search Features Available</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 max-w-4xl text-gray-900">
          Navigate your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A00] to-[#FF8C00]">startup journey</span><br/> with confidence.
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mb-10">
          The comprehensive, AI-powered guide for entrepreneurs. From company registration to fundraising, we've got you covered.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/explore" className="flex items-center justify-center gap-2 bg-[#FF6A00] text-white px-8 py-4 rounded-full font-bold hover:bg-[#E65100] transition-all hover:scale-105 shadow-lg shadow-orange-500/30">
            Explore Topics <ArrowRight className="w-5 h-5" />
          </Link>
          <Link to="/ai-search" className="flex items-center justify-center gap-2 bg-white backdrop-blur-sm border-2 border-gray-200 text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-gray-50 transition-all hover:border-[#FF8C00]">
            Try AI Search <Bot className="w-5 h-5 text-[#FF6A00]" />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Everything you need to succeed</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">Built like a fintech, run like a classroom. Get structured knowledge and instant answers tailored to your startup's needs.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-[#FF6A00]/50 hover:shadow-xl hover:shadow-orange-100 transition-all group">
              <div className="bg-orange-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6 text-[#FF6A00]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Comprehensive Guides</h3>
              <p className="text-gray-600 leading-relaxed">Deep dives into legal compliance, branding, marketing, taxation, and company registration.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-[#FF6A00]/50 hover:shadow-xl hover:shadow-orange-100 transition-all group">
              <div className="bg-orange-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Bot className="w-6 h-6 text-[#FF8C00]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">AI-Powered Search</h3>
              <p className="text-gray-600 leading-relaxed">Ask any question and get instant, accurate answers based on our curated startup knowledge base.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-[#FF6A00]/50 hover:shadow-xl hover:shadow-orange-100 transition-all group">
              <div className="bg-orange-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6 text-[#FF6A00]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Growth Resources</h3>
              <p className="text-gray-600 leading-relaxed">Access essential tools, templates, and insights to accelerate your fundraising and business growth.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
