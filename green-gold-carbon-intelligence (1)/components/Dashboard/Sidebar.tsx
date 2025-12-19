import React from 'react';
// Fix: named export NavLink from react-router-dom
import { NavLink } from 'react-router-dom';
import { UserRole } from '../../types';

interface SidebarProps {
  role: UserRole;
  onLogout: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ role, onLogout, isOpen = false, onClose }) => {
  const commonItems = [
    { label: role === 'ADMIN' ? 'Overview' : 'Dashboard', path: '/dashboard/', icon: '📊' },
    { label: 'Analytics', path: '/dashboard/analytics', icon: '📈' },
    { label: 'Energy Bills', path: '/dashboard/bills', icon: '🧾' },
    { label: 'Reports', path: '/dashboard/reports', icon: '📑' },
  ];

  const adminOnlyItems = [
    { label: 'AI Studio', path: '/dashboard/ai-studio', icon: '✨' },
    { label: 'Inquiries', path: '/dashboard/inquiries', icon: '✉️' },
    { label: 'User Identities', path: '/dashboard/users', icon: '👥' },
    { label: 'Subscription Mgmt', path: '/dashboard/admin-subscriptions', icon: '💎' },
    { label: 'Audit Logs', path: '/dashboard/logs', icon: '📜' },
  ];

  const userOnlyItems = [
    { label: 'Team Directory', path: '/dashboard/users', icon: '👥' },
    { label: 'Subscription', path: '/dashboard/subscription', icon: '💳' },
  ];

  const bottomItems = [
    { label: 'Enterprise Team', path: '/dashboard/enterprise-team', icon: '🤝' },
    { label: 'Settings', path: '/dashboard/settings', icon: '⚙️' },
  ];

  return (
    <aside 
      className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 flex flex-col text-slate-400 shrink-0 transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:block
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      <div className="p-6 flex items-center justify-between">
        {/* Abbreviated Name replacing the full logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-slate-900 font-black text-xs">
            G
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">GGCI</span>
        </div>
        
        {/* Close button for mobile */}
        <button 
          onClick={onClose}
          className="lg:hidden p-2 hover:bg-slate-800 rounded-lg text-slate-400"
        >
          ✕
        </button>
      </div>

      <nav className="flex-grow px-4 space-y-1.5 mt-6 overflow-y-auto custom-scrollbar">
        <div className="mb-4">
          <p className="px-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2">Main Navigation</p>
          {commonItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/dashboard/'}
              onClick={onClose}
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                  isActive 
                    ? `${role === 'ADMIN' ? 'bg-purple-600/10 text-purple-400 border border-purple-600/20' : 'bg-emerald-600/10 text-emerald-400 border border-emerald-600/20'} shadow-sm` 
                    : 'hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>

        {role === 'ADMIN' ? (
          <div className="mb-4">
            <p className="px-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2">Enterprise Admin</p>
            {adminOnlyItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) => 
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                    isActive 
                      ? 'bg-purple-600/10 text-purple-400 border border-purple-600/20 shadow-sm' 
                      : 'hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        ) : (
          <div className="mb-4">
            <p className="px-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2">Organization</p>
            {userOnlyItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) => 
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                    isActive 
                      ? 'bg-emerald-600/10 text-emerald-400 border border-emerald-600/20 shadow-sm' 
                      : 'hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        )}
      </nav>

      <div className="p-4 border-t border-slate-800">
        {bottomItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onClose}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm mb-1 ${
                isActive 
                  ? 'bg-slate-800 text-white' 
                  : 'hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-colors text-sm font-medium mt-1 text-left"
        >
          <span className="text-lg">🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;