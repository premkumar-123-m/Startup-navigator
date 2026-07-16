import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#0a1310] border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-white mb-4">Startup Navigator</h3>
            <p className="text-gray-400 max-w-sm">
              Your comprehensive guide to building, scaling, and succeeding in the startup ecosystem. Powered by AI.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="space-y-2">
              <li><Link to="/explore" className="text-gray-400 hover:text-[#8CE26B] transition-colors">Explore Topics</Link></li>
              <li><Link to="/ai-search" className="text-gray-400 hover:text-[#8CE26B] transition-colors">AI Search</Link></li>
              <li><Link to="/resources" className="text-gray-400 hover:text-[#8CE26B] transition-colors">Resources</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-[#FFB13C] transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-[#FFB13C] transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Startup Navigator. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
