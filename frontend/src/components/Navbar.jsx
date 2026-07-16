import { Link, useLocation } from 'react-router-dom';
import { Compass, Menu, X, LogOut, User, ShieldAlert } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { currentUser, userProfile, logout } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore', path: '/explore' },
    { name: 'AI Search', path: '/ai-search' },
    { name: 'Resources', path: '/resources' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <Compass className="h-8 w-8 text-[#FF6A00] group-hover:rotate-45 transition-transform duration-300" />
              <span className="font-bold text-xl tracking-tight text-gray-900">Startup Navigator</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`${
                    isActive(link.path)
                      ? 'text-[#FF6A00] font-semibold'
                      : 'text-gray-600 hover:text-[#FF8C00]'
                  } transition-colors duration-200 text-sm`}
                >
                  {link.name}
                </Link>
              ))}

              {userProfile?.role === 'admin' && (
                <Link
                  to="/admin"
                  className={`${
                    isActive('/admin') ? 'text-red-600 font-semibold' : 'text-gray-500 hover:text-red-500'
                  } transition-colors duration-200 text-sm flex items-center gap-1`}
                >
                  <ShieldAlert className="w-4 h-4" /> Admin
                </Link>
              )}
              
              {currentUser ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="max-w-[120px] truncate">{currentUser.email}</span>
                  </div>
                  <button
                    onClick={() => logout()}
                    className="text-gray-500 hover:text-red-500 transition-colors"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="bg-[#FF6A00] text-white px-5 py-2 rounded-full font-bold hover:bg-[#E65100] transition-colors duration-200 shadow-md shadow-orange-500/20"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`${
                  isActive(link.path)
                    ? 'text-[#FF6A00] font-semibold bg-orange-50'
                    : 'text-gray-600 hover:bg-gray-50'
                } block px-3 py-2 rounded-md text-base`}
              >
                {link.name}
              </Link>
            ))}

            {userProfile?.role === 'admin' && (
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className={`${
                  isActive('/admin') ? 'text-red-600 font-semibold bg-red-50' : 'text-gray-500 hover:bg-gray-50'
                } block px-3 py-2 rounded-md text-base flex items-center gap-2`}
              >
                <ShieldAlert className="w-4 h-4" /> Admin Panel
              </Link>
            )}
            
            {currentUser ? (
              <div className="border-t border-gray-100 mt-2 pt-2">
                <div className="px-3 py-2 text-sm text-gray-500 truncate">
                  {currentUser.email}
                </div>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-red-500 font-medium hover:bg-red-50 rounded-md"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-[#FF6A00] font-bold mt-2"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
