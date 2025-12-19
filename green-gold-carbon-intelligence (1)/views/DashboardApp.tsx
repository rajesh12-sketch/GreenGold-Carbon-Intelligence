import React, { useState } from 'react';
import Sidebar from '../components/Dashboard/Sidebar';
import MainDashboard from '../components/Dashboard/MainDashboard';
import Reports from '../components/Dashboard/Reports';
import Analytics from './Analytics';
import EnergyBills from './EnergyBills';
import Settings from './Settings';
import AdminOverview from './AdminOverview';
import AIStudio from './AIStudio';
import AdminUsers from './AdminUsers';
import AdminLogs from './AdminLogs';
import Subscription from './Subscription';
import EnterpriseTeam from './EnterpriseTeam';
import AdminSubscriptions from './AdminSubscriptions';
import AdminInquiries from './AdminInquiries';
// Fix: named exports from react-router-dom for routing components
import { Routes, Route, Navigate } from 'react-router-dom';
import { UserRole, User } from '../types';

interface DashboardAppProps {
  role: UserRole;
  user: User;
  companyId?: string;
  onLogout: () => void;
}

const DashboardApp: React.FC<DashboardAppProps> = ({ role, user, onLogout, companyId }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen-dynamic bg-gray-100 overflow-hidden relative">
      {/* Sidebar */}
      <Sidebar 
        role={role} 
        onLogout={onLogout} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex-grow flex flex-col min-w-0 h-full">
        <header className="bg-white h-16 border-b border-gray-200 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-30 shrink-0">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Mobile Hamburger - Larger touch area */}
            <button 
              onClick={toggleSidebar}
              className="lg:hidden w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-xl text-gray-600 transition-colors"
              aria-label="Toggle Sidebar"
            >
              <span className="text-2xl">☰</span>
            </button>

            <div className="flex flex-col">
              <h2 className="text-xs sm:text-lg font-bold text-gray-900 line-clamp-1 uppercase tracking-tight">
                {role === 'ADMIN' ? 'Enterprise Console' : 'Carbon Intel'}
              </h2>
              <span className={`inline-block px-1.5 py-0.5 rounded-[4px] text-[8px] sm:text-[10px] font-bold uppercase tracking-wider w-fit ${role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-emerald-100 text-emerald-700'}`}>
                {role === 'ADMIN' ? `ADMIN: ${companyId}` : 'Authorized User'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-900">{user.name}</p>
                <p className="text-[10px] text-gray-400 uppercase font-medium tracking-tight">ID: {user.id}</p>
              </div>
              <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-sm text-sm sm:text-base border-2 border-white ${role === 'ADMIN' ? 'bg-purple-600' : 'bg-emerald-600'}`}>
                {user.name[0]}
              </div>
            </div>
            
            <div className="h-6 w-px bg-gray-200 hidden xs:block"></div>
            
            <button 
              onClick={onLogout}
              className="flex items-center justify-center sm:gap-2 p-2 sm:px-4 sm:py-2 rounded-xl text-[10px] sm:text-xs font-bold text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all border border-gray-100 hover:border-red-100 group active:scale-95"
            >
              <span className="hidden sm:inline group-hover:translate-x-0.5 transition-transform">Logout</span>
              <span className="text-lg">🚪</span>
            </button>
          </div>
        </header>

        <main className="flex-grow overflow-y-auto overflow-x-hidden p-4 sm:p-8 pb-20 w-full max-w-7xl mx-auto custom-scrollbar">
          <Routes>
            <Route path="/analytics" element={<Analytics role={role} />} />
            <Route path="/bills" element={<EnergyBills role={role} />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings role={role} />} />
            <Route path="/users" element={<AdminUsers role={role} />} />
            <Route path="/enterprise-team" element={<EnterpriseTeam />} />

            {role === 'USER' && (
              <Route path="/subscription" element={<Subscription />} />
            )}

            <Route path="/" element={role === 'ADMIN' ? <AdminOverview companyId={companyId!} onLogout={onLogout} /> : <MainDashboard />} />

            {role === 'ADMIN' && (
              <>
                <Route path="/ai-studio" element={<AIStudio />} />
                <Route path="/inquiries" element={<AdminInquiries />} />
                <Route path="/logs" element={<AdminLogs />} />
                <Route path="/admin-subscriptions" element={<AdminSubscriptions />} />
              </>
            )}

            <Route path="*" element={<Navigate to="/dashboard/" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default DashboardApp;