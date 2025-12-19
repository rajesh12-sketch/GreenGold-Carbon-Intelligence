import React, { useState } from 'react';
import { UserRole, User } from '../types';
// Fix: named export useNavigate from react-router-dom
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  onLogin: (user: User, companyId?: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [role, setRole] = useState<UserRole>('USER');
  const [email, setEmail] = useState('');
  const [companyId, setCompanyId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: role === 'ADMIN' ? 'Admin Manager' : 'Sustainability Lead',
      email,
      role,
      lastLogin: new Date().toISOString()
    };
    onLogin(mockUser, role === 'ADMIN' ? companyId : 'COMP-123');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-emerald-600 rounded-xl mx-auto flex items-center justify-center mb-4">
            <span className="text-white font-bold text-2xl">C</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Sign In</h2>
          <p className="text-gray-500 mt-2">Access your CarbonIntel Intelligence</p>
        </div>

        <div className="flex gap-2 p-1 bg-gray-100 rounded-xl mb-8">
          <button 
            onClick={() => setRole('USER')}
            className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all ${role === 'USER' ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-500'}`}
          >
            User Login
          </button>
          <button 
            onClick={() => setRole('ADMIN')}
            className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all ${role === 'ADMIN' ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-500'}`}
          >
            Administrator
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {role === 'ADMIN' && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Company ID (Required for Admins)</label>
              <input 
                type="text" 
                required
                value={companyId}
                onChange={(e) => setCompanyId(e.target.value)}
                placeholder="Enter Organization Identifier"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              required
              defaultValue="password123"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all active:scale-95"
          >
            Enter Platform
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;