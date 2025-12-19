import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../Brand/Logo';

const PublicNavbar: React.FC = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 glass-effect border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="cursor-pointer" onClick={() => navigate('/')}>
            <Logo />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
            <Link to="/about" className="hover:text-emerald-600">About</Link>
            <Link to="/careers" className="hover:text-emerald-600">Careers</Link>
            <Link to="/blog" className="hover:text-emerald-600">Intelligence</Link>
            <Link to="/contact" className="hover:text-emerald-600">Contact</Link>
            <div className="h-6 w-px bg-gray-200"></div>
            <button onClick={() => navigate('/login/user')} className="text-emerald-700 hover:text-emerald-900 font-bold transition-colors">
              Log In
            </button>
            <button onClick={() => navigate('/login/admin')} className="bg-slate-900 text-white px-5 py-2 rounded-full hover:bg-slate-800 transition-colors shadow-sm text-xs font-bold uppercase tracking-wider">
              Admin
            </button>
          </div>

          {/* Mobile Nav Toggle */}
          <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="text-2xl">{isMobileMenuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 animate-in slide-in-from-top duration-300">
          <div className="px-4 py-6 space-y-4 flex flex-col items-center">
            <Link to="/about" className="text-lg font-medium text-gray-600" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
            <Link to="/careers" className="text-lg font-medium text-gray-600" onClick={() => setIsMobileMenuOpen(false)}>Careers</Link>
            <Link to="/blog" className="text-lg font-medium text-gray-600" onClick={() => setIsMobileMenuOpen(false)}>Intelligence</Link>
            <Link to="/contact" className="text-lg font-medium text-gray-600" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
            <button onClick={() => navigate('/login/user')} className="text-lg font-bold text-emerald-600">Log In</button>
            <button onClick={() => navigate('/login/admin')} className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold">Admin Portal</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default PublicNavbar;