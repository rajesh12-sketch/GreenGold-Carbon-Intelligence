
import React, { useState } from 'react';
import { UserRole } from '../types';

interface UserIdentity {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
  lastActive: string;
}

const AdminUsers: React.FC<{ role?: UserRole }> = ({ role = 'ADMIN' }) => {
  const isAdmin = role === 'ADMIN';
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<UserIdentity | null>(null);
  const [users, setUsers] = useState<UserIdentity[]>([
    { id: 'USR-8212', name: 'Sarah Miller', email: 'sarah@horizon.co', role: 'Operations', status: 'Active', lastActive: '2h ago' },
    { id: 'USR-3190', name: 'James Wilson', email: 'j.wilson@horizon.co', role: 'Sustainability', status: 'Active', lastActive: '10m ago' },
    { id: 'USR-1102', name: 'Linda Chen', email: 'linda@horizon.co', role: 'Finance', status: 'Inactive', lastActive: '5d ago' },
    { id: 'USR-5561', name: 'Robert Fox', email: 'robert.fox@horizon.co', role: 'Reporting', status: 'Active', lastActive: '1d ago' },
  ]);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Operations'
  });

  const openAddModal = () => {
    if (!isAdmin) return;
    setEditingUser(null);
    setFormData({ name: '', email: '', role: 'Operations' });
    setShowModal(true);
  };

  const openEditModal = (user: UserIdentity) => {
    if (!isAdmin) return;
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role });
    setShowModal(true);
  };

  const toggleUserStatus = (id: string) => {
    if (!isAdmin) return;
    setUsers(users.map(u => 
      u.id === id 
        ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } 
        : u
    ));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      // Update
      setUsers(users.map(u => 
        u.id === editingUser.id 
          ? { ...u, ...formData } 
          : u
      ));
    } else {
      // Create
      const newUser: UserIdentity = {
        id: 'USR-' + Math.floor(Math.random() * 9000 + 1000),
        ...formData,
        status: 'Active',
        lastActive: 'Just now'
      };
      setUsers([newUser, ...users]);
    }
    setShowModal(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{isAdmin ? 'User Identity Management' : 'Organization Directory'}</h2>
          <p className="text-gray-500">
            {isAdmin 
              ? 'Provision, edit, and manage security access for organizational members.' 
              : 'View all active members and sustainability leads in your organization.'}
          </p>
        </div>
        {isAdmin && (
          <button 
            onClick={openAddModal}
            className="bg-purple-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-purple-700 transition-all flex items-center gap-2 shadow-lg shadow-purple-200 active:scale-95"
          >
            <span className="text-xl">+</span> Provision New Identity
          </button>
        )}
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Identity</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Department</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Access Status</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Last Auth</th>
              {isAdmin && <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Controls</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.map((user) => (
              <tr key={user.id} className={`hover:bg-slate-50/50 transition-colors ${user.status === 'Inactive' ? 'opacity-60 grayscale-[0.5]' : ''}`}>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 ${
                      user.status === 'Active' ? (isAdmin ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100') : 'bg-gray-100 text-gray-400 border-gray-200'
                    }`}>
                      {user.name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 leading-tight">{user.name}</p>
                      <p className="text-xs text-gray-400 font-mono uppercase">{user.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="text-sm text-gray-600 font-medium">{user.role}</span>
                </td>
                <td className="px-6 py-5">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${
                    user.status === 'Active' 
                      ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                      : 'bg-red-50 text-red-700 border border-red-100'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <span className="text-sm text-gray-400">{user.lastActive}</span>
                </td>
                {isAdmin && (
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end items-center gap-3">
                      <button 
                        onClick={() => openEditModal(user)}
                        className="text-gray-400 hover:text-purple-600 transition-colors font-bold text-sm bg-gray-50 px-3 py-1 rounded-lg border border-gray-100 hover:border-purple-200"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => toggleUserStatus(user.id)}
                        className={`font-bold text-sm px-3 py-1 rounded-lg border transition-all ${
                          user.status === 'Active' 
                          ? 'text-red-600 bg-red-50 border-red-100 hover:bg-red-100' 
                          : 'text-emerald-600 bg-emerald-50 border-emerald-100 hover:bg-emerald-100'
                        }`}
                      >
                        {user.status === 'Active' ? 'Disable' : 'Enable'}
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAdmin && showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl animate-in zoom-in duration-300 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                {editingUser ? 'Update Identity' : 'Provision New Identity'}
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleSave} className="space-y-5">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest text-[10px]">Full Legal Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-3.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all" 
                  placeholder="e.g. John Doe" 
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest text-[10px]">Corporate Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full p-3.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all" 
                  placeholder="john@horizon.co" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest text-[10px]">Department</label>
                  <select 
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full p-3.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                  >
                    <option>Operations</option>
                    <option>Sustainability</option>
                    <option>Finance</option>
                    <option>Reporting</option>
                    <option>Compliance</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest text-[10px]">Access Tier</label>
                  <select className="w-full p-3.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-purple-500/20 transition-all">
                    <option>Standard User</option>
                    <option>Read Only</option>
                    <option>Data Entry</option>
                  </select>
                </div>
              </div>

              <div className="pt-6 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-4 bg-gray-100 rounded-xl font-bold text-gray-600 hover:bg-gray-200 transition-all active:scale-95"
                >
                  Discard
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-4 bg-purple-600 rounded-xl font-bold text-white hover:bg-purple-700 transition-all shadow-xl shadow-purple-100 active:scale-95"
                >
                  {editingUser ? 'Apply Updates' : 'Confirm Provisioning'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
