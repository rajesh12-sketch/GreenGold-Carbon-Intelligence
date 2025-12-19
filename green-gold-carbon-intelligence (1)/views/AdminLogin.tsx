import React, { useState } from 'react';
import { User } from '../types';
// Fix: named exports useNavigate and Link from react-router-dom
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../components/Brand/Logo';

interface LoginProps {
  onLogin: (user: User, companyId?: string) => void;
}

const AdminLogin: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [companyId, setCompanyId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyId) return;
    const mockUser: User = {
      id: 'ADM-' + Math.random().toString(36).substr(2, 4),
      name: 'Admin Director',
      email,
      role: 'ADMIN',
      lastLogin: new Date().toISOString()
    };
    onLogin(mockUser, companyId);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10">
        <div className="text-center mb-8 flex flex-col items-center">
          <Logo className="mb-6 scale-110" />
          <h2 className="text-3xl font-bold text-gray-900">Admin Portal</h2>
          <p className="text-gray-500 mt-2 text-sm">Enterprise-level oversight & controls</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Company ID</label>
            <input 
              type="text" 
              required
              value={companyId}
              onChange={(e) => setCompanyId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-purple-100 focus:border-purple-500 outline-none transition-all font-mono"
              placeholder="ENTER-CORP-ID"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Admin Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-purple-100 focus:border-purple-500 outline-none transition-all"
              placeholder="admin@enterprise.com"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Password</label>
            <input 
              type="password" 
              required
              defaultValue="admin123"
              className="w-full px-4 py-3 rounded-xl border-2 border-purple-100 focus:border-purple-500 outline-none transition-all"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-purple-700 shadow-xl shadow-purple-200 transition-all active:scale-95"
          >
            Authenticate Admin
          </button>
        </form>
        <div className="mt-8 text-center text-sm">
          <Link to="/login/user" className="text-purple-600 font-bold hover:underline">Switch to Standard User Login</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;