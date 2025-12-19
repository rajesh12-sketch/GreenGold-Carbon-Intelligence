import React, { useState } from 'react';
import { User, UserRole } from '../types';
// Fix: named exports useNavigate and Link from react-router-dom
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../components/Brand/Logo';

interface LoginProps {
  onLogin: (user: User, companyId?: string) => void;
}

const UserLogin: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mockUser: User = {
      id: 'USR-' + Math.random().toString(36).substr(2, 4),
      name: 'Sustainability Lead',
      email,
      role: 'USER',
      lastLogin: new Date().toISOString()
    };
    onLogin(mockUser, 'COMP-123');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-emerald-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 border border-emerald-100">
        <div className="text-center mb-8 flex flex-col items-center">
          <Logo className="mb-6 scale-110" />
          <h2 className="text-3xl font-bold text-gray-900">User Access</h2>
          <p className="text-gray-500 mt-2 text-sm">Manage your organization's footprint</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Work Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              placeholder="lead@company.com"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              required
              defaultValue="password"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 shadow-xl shadow-emerald-200 transition-all active:scale-95"
          >
            Sign In
          </button>
        </form>
        <div className="mt-8 text-center text-sm">
          <Link to="/login/admin" className="text-emerald-600 font-bold hover:underline">Are you an Administrator?</Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;