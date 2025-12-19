
import React, { useState, useMemo } from 'react';

interface CompanySubscription {
  id: string;
  companyName: string;
  plan: 'Starter' | 'Professional' | 'Enterprise';
  status: 'Active' | 'Trialing' | 'Past Due' | 'Cancelled';
  mrr: number;
  renewalDate: string;
  users: number;
}

const AdminSubscriptions: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPlan, setFilterPlan] = useState('All');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeContext, setActiveContext] = useState<CompanySubscription | null>(null);

  const subscriptions: CompanySubscription[] = [
    { id: 'SUB-9001', companyName: 'Global Care Group', plan: 'Enterprise', status: 'Active', mrr: 2450, renewalDate: '2025-01-15', users: 142 },
    { id: 'SUB-8221', companyName: 'EcoLogistics Ltd', plan: 'Professional', status: 'Active', mrr: 49, renewalDate: '2024-12-20', users: 12 },
    { id: 'SUB-7554', companyName: 'Green Dine UK', plan: 'Professional', status: 'Past Due', mrr: 49, renewalDate: '2024-11-01', users: 5 },
    { id: 'SUB-6612', companyName: 'Horizon SMEs', plan: 'Starter', status: 'Trialing', mrr: 0, renewalDate: '2024-12-05', users: 2 },
    { id: 'SUB-5509', companyName: 'TechVibe Office', plan: 'Enterprise', status: 'Active', mrr: 1200, renewalDate: '2025-03-10', users: 85 },
    { id: 'SUB-4410', companyName: 'Old Manor Care', plan: 'Professional', status: 'Cancelled', mrr: 0, renewalDate: '2024-10-15', users: 8 },
  ];

  const filteredSubs = useMemo(() => {
    return subscriptions.filter(sub => {
      const matchesSearch = sub.companyName.toLowerCase().includes(searchQuery.toLowerCase()) || sub.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPlan = filterPlan === 'All' || sub.plan === filterPlan;
      return matchesSearch && matchesPlan;
    });
  }, [searchQuery, filterPlan]);

  const totalMRR = filteredSubs.reduce((acc, sub) => acc + sub.mrr, 0);

  const handleAccessAction = (sub: CompanySubscription) => {
    setIsTransitioning(true);
    // Simulate context switching/impersonation logic
    setTimeout(() => {
      setIsTransitioning(false);
      setActiveContext(sub);
    }, 1500);
  };

  const handleExitContext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
      setActiveContext(null);
    }, 800);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative">
      {/* Impersonation Overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-900/40 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-6 shadow-2xl shadow-purple-500/20"></div>
          <p className="text-white font-bold text-xl tracking-tight">
            {activeContext ? 'Returning to Admin Console...' : 'Switching to Client Context...'}
          </p>
          <p className="text-purple-200 text-sm mt-2 font-medium">Validating Administrative Session Keys</p>
        </div>
      )}

      {/* Context Banner */}
      {activeContext && (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex justify-between items-center shadow-sm animate-in slide-in-from-top duration-500">
          <div className="flex items-center gap-3">
            <span className="text-xl">🔑</span>
            <div>
              <p className="text-xs font-bold text-amber-800 uppercase tracking-widest">Administrative Impersonation Mode</p>
              <p className="text-sm text-amber-700">Currently viewing as: <span className="font-bold">{activeContext.companyName}</span> ({activeContext.id})</p>
            </div>
          </div>
          <button 
            onClick={handleExitContext}
            className="bg-amber-800 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-amber-900 transition-all active:scale-95 shadow-lg shadow-amber-900/20"
          >
            Exit Client Context
          </button>
        </div>
      )}

      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Subscription Master</h2>
          <p className="text-gray-500">Enterprise-wide billing oversight and revenue analytics.</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-purple-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-purple-700 transition-all shadow-lg shadow-purple-200 active:scale-95">
            Export Billing Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total MRR</p>
          <p className="text-2xl font-bold text-purple-600">£{totalMRR.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Active Accounts</p>
          <p className="text-2xl font-bold text-emerald-600">{filteredSubs.filter(s => s.status === 'Active').length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Trial Conversion</p>
          <p className="text-2xl font-bold text-blue-600">24.5%</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Churn Rate</p>
          <p className="text-2xl font-bold text-red-500">1.2%</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 bg-slate-50 border-b border-gray-100 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-grow">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input 
              type="text" 
              placeholder="Search by Company or Subscription ID..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
            />
          </div>
          <div className="flex gap-2">
            <select 
              value={filterPlan}
              onChange={(e) => setFilterPlan(e.target.value)}
              className="px-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-purple-500/20"
            >
              <option value="All">All Plans</option>
              <option value="Enterprise">Enterprise</option>
              <option value="Professional">Professional</option>
              <option value="Starter">Starter</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Account & ID</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Plan Tier</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Current Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Users</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Monthly Rev</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Access Controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredSubs.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900 text-sm">{sub.companyName}</span>
                      <span className="text-[10px] text-gray-400 font-mono uppercase">{sub.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase ${
                      sub.plan === 'Enterprise' ? 'bg-purple-100 text-purple-700' :
                      sub.plan === 'Professional' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {sub.plan}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`flex items-center gap-1.5 text-xs font-bold ${
                      sub.status === 'Active' ? 'text-emerald-600' :
                      sub.status === 'Trialing' ? 'text-blue-500' :
                      sub.status === 'Past Due' ? 'text-amber-500' :
                      'text-gray-400'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${
                        sub.status === 'Active' ? 'bg-emerald-600' :
                        sub.status === 'Trialing' ? 'bg-blue-500' :
                        sub.status === 'Past Due' ? 'bg-amber-500 animate-pulse' :
                        'bg-gray-400'
                      }`}></span>
                      {sub.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-600 font-medium">
                    {sub.users} Seats
                  </td>
                  <td className="px-6 py-5">
                    <span className="font-mono font-bold text-gray-900">£{sub.mrr.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleAccessAction(sub)}
                        className="flex items-center gap-1.5 text-purple-600 hover:text-white font-bold text-[10px] bg-purple-50 hover:bg-purple-600 px-3 py-1.5 rounded-lg border border-purple-100 transition-all uppercase tracking-tight active:scale-95"
                      >
                        <span>🔑</span> Access
                      </button>
                      <button className="text-gray-500 hover:text-gray-700 font-bold text-[10px] bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200 transition-all uppercase tracking-tight active:scale-95">
                        Manage
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredSubs.length === 0 && (
          <div className="p-20 text-center">
            <span className="text-4xl block mb-2">🔎</span>
            <p className="text-gray-400 font-medium">No subscription records found matching your query.</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Revenue Growth</h3>
          <div className="h-48 bg-slate-50 rounded-2xl flex items-center justify-center text-gray-400 text-sm border border-dashed border-gray-200">
            [Chart Area: Monthly Subscription Growth]
          </div>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Retention Overview</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
              <span className="text-sm font-bold text-emerald-900">High Health Score</span>
              <span className="text-xl font-bold text-emerald-600">82%</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-amber-50 rounded-2xl border border-amber-100">
              <span className="text-sm font-bold text-amber-900">At Risk (Past Due)</span>
              <span className="text-xl font-bold text-amber-600">3 Accounts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSubscriptions;
