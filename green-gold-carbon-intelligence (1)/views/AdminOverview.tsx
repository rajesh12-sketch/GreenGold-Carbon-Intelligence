import React from 'react';
import MetricCard from '../components/Dashboard/MetricCard';
// Fix: named export useNavigate from react-router-dom
import { useNavigate } from 'react-router-dom';

interface AdminOverviewProps {
  companyId: string;
  onLogout: () => void;
}

const AdminOverview: React.FC<AdminOverviewProps> = ({ companyId, onLogout }) => {
  const navigate = useNavigate();
  
  const userIdentities = [
    { name: 'Sarah Jones', role: 'Operations', lastActive: '2 mins ago', id: 'USR-001' },
    { name: 'David Smith', role: 'Finance', lastActive: '1 day ago', id: 'USR-002' },
    { name: 'Emma Watson', role: 'Sustainability', lastActive: '10 mins ago', id: 'USR-003' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-purple-900 text-white p-8 rounded-3xl shadow-xl flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold mb-2">Enterprise Overview</h2>
          <p className="opacity-80">Aggregate management for Company ID: <strong>{companyId}</strong></p>
        </div>
        <div className="flex gap-4">
          <div className="text-center px-6 border-r border-white/20">
            <p className="text-2xl font-bold">12</p>
            <p className="text-xs uppercase font-bold opacity-60">Total Users</p>
          </div>
          <div className="text-center px-6">
            <p className="text-2xl font-bold">100%</p>
            <p className="text-xs uppercase font-bold opacity-60">Compliance</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard 
          label="Total Managed Carbon"
          value="1,452"
          subValue="tCO2e"
          icon="🌍"
          trend="down"
          trendValue="12%"
          colorClass="bg-purple-100 text-purple-600"
        />
        <MetricCard 
          label="Total Managed Cost"
          value="£42k"
          subValue="GBP"
          icon="💎"
          trend="down"
          trendValue="5%"
          colorClass="bg-emerald-100 text-emerald-600"
        />
        <MetricCard 
          label="Reporting Rate"
          value="98%"
          icon="📈"
          colorClass="bg-blue-100 text-blue-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold mb-6">User Identities & Access</h3>
          <div className="space-y-4">
            {userIdentities.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold">
                    {user.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{user.name}</h4>
                    <p className="text-xs text-gray-500">{user.role} • {user.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">Last active</p>
                  <p className="text-xs font-bold text-emerald-600">{user.lastActive}</p>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => navigate('/dashboard/users')}
            className="w-full mt-6 py-3 text-sm font-bold text-purple-600 border border-purple-100 rounded-xl hover:bg-purple-50 transition-colors"
          >
            View All Users
          </button>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold mb-6">Admin Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => navigate('/dashboard/reports')}
              className="p-6 bg-gray-50 rounded-2xl hover:bg-purple-50 hover:text-purple-600 transition-all border border-transparent hover:border-purple-100"
            >
              <span className="text-2xl block mb-2">📄</span>
              <span className="font-bold">Master Report</span>
            </button>
            <button 
              onClick={() => navigate('/dashboard/users')}
              className="p-6 bg-gray-50 rounded-2xl hover:bg-emerald-50 hover:text-emerald-600 transition-all border border-transparent hover:border-emerald-100"
            >
              <span className="text-2xl block mb-2">👤</span>
              <span className="font-bold">Add New User</span>
            </button>
            <button 
              onClick={() => navigate('/dashboard/logs')}
              className="p-6 bg-gray-50 rounded-2xl hover:bg-blue-50 hover:text-blue-600 transition-all border border-transparent hover:border-blue-100"
            >
              <span className="text-2xl block mb-2">🔐</span>
              <span className="font-bold">Audit Logs</span>
            </button>
            <button 
              onClick={() => navigate('/dashboard/settings')}
              className="p-6 bg-gray-50 rounded-2xl hover:bg-amber-50 hover:text-amber-600 transition-all border border-transparent hover:border-amber-100"
            >
              <span className="text-2xl block mb-2">⚡</span>
              <span className="font-bold">Global Settings</span>
            </button>
            <button 
              onClick={onLogout}
              className="p-6 bg-red-50 rounded-2xl hover:bg-red-100 text-red-600 transition-all border border-transparent hover:border-red-200 col-span-2 mt-2"
            >
              <span className="text-2xl block mb-2">🚪</span>
              <span className="font-bold">Secure Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;