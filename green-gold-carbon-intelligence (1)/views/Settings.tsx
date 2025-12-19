import React, { useState } from 'react';
// Fix: named export useNavigate from react-router-dom
import { useNavigate } from 'react-router-dom';

const Settings: React.FC<{ role: string }> = ({ role }) => {
  const navigate = useNavigate();
  const [ssoEnforced, setSsoEnforced] = useState(false);
  const [aiAutopilotLevel, setAiAutopilotLevel] = useState('Suggestion Mode');
  const [costAlerts, setCostAlerts] = useState(true);
  
  // Profile States
  const [firstName, setFirstName] = useState('Sustainability');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('Manager');
  const [email, setEmail] = useState('lead@carbonintel.ai');
  const [phone, setPhone] = useState('+44 20 7946 0000');
  const [address, setAddress] = useState('123 Green Lane, Eco District, London, UK');
  const [language, setLanguage] = useState('English (UK)');

  const languages = [
    'English (UK)', 'English (US)', 'French', 'German', 'Spanish', 
    'Italian', 'Portuguese', 'Dutch', 'Russian', 'Chinese (Simplified)', 
    'Japanese', 'Korean', 'Arabic', 'Hindi', 'Bengali', 'Punjabi', 'Telugu',
    'Marathi', 'Tamil', 'Urdu', 'Turkish', 'Vietnamese', 'Polish', 'Thai', 
    'Greek', 'Swedish', 'Danish', 'Finnish', 'Norwegian', 'Czech', 'Hebrew'
  ];

  const handleApplyChanges = () => {
    // Simulate API call to persist settings
    const settingsPayload = { 
      ssoEnforced, 
      aiAutopilotLevel, 
      costAlerts, 
      firstName, 
      middleName, 
      lastName, 
      email, 
      phone, 
      address, 
      language 
    };
    console.log('Applying settings:', settingsPayload);
    alert('Global preferences and user profile updated successfully!');
  };

  return (
    <div className="max-w-5xl space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-gray-900">Platform Preferences</h2>
          <p className="text-sm text-gray-500">Manage your identity and organization-wide sustainability controls.</p>
        </div>
        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-100 px-3 py-1 rounded-full">
          Tier: {role === 'ADMIN' ? 'Enterprise Admin' : 'Professional User'}
        </span>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          {/* Administrator Exclusive Section */}
          {role === 'ADMIN' && (
            <div className="space-y-6">
              <div className="bg-purple-900 text-white p-8 rounded-3xl shadow-xl shadow-purple-200 overflow-hidden relative">
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <span>🔐</span> Administrator Governance
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white/10 rounded-2xl border border-white/5">
                      <div>
                        <p className="font-bold">SSO Enforcement</p>
                        <p className="text-xs opacity-60">Force secure Single Sign-On for all company members</p>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={ssoEnforced}
                        onChange={(e) => setSsoEnforced(e.target.checked)}
                        className="w-6 h-6 accent-purple-400 cursor-pointer" 
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/10 rounded-2xl border border-white/5">
                      <div>
                        <p className="font-bold">AI Autopilot Level</p>
                        <p className="text-xs opacity-60">Autonomous decision threshold for carbon offsets</p>
                      </div>
                      <select 
                        value={aiAutopilotLevel}
                        onChange={(e) => setAiAutopilotLevel(e.target.value)}
                        className="bg-purple-800 border border-white/20 rounded-lg text-sm px-3 py-2 outline-none"
                      >
                        <option>Suggestion Mode</option>
                        <option>Semi-Autonomous</option>
                        <option>Full Autopilot</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="absolute -right-10 -bottom-10 text-9xl opacity-10 pointer-events-none select-none">⚖️</div>
              </div>

              {/* Quick User Provisioning for Admins */}
              <div className="bg-white p-8 rounded-3xl border border-dashed border-purple-200 shadow-sm flex items-center justify-between group hover:border-purple-400 transition-colors">
                <div className="space-y-1">
                  <h4 className="font-bold text-gray-800">Identity Management</h4>
                  <p className="text-sm text-gray-400">Add new sustainability leads to your organizational unit.</p>
                </div>
                <button 
                  onClick={() => navigate('/dashboard/users')}
                  className="bg-purple-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-purple-100 group-hover:bg-purple-700 transition-all flex items-center gap-2 active:scale-95"
                >
                  <span className="text-xl">+</span> Provision New Identity
                </button>
              </div>
            </div>
          )}

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center font-bold">👤</div>
                <h3 className="text-lg font-bold text-gray-800">Identity Profile</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">First Name</label>
                  <input 
                    type="text" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Middle Name</label>
                  <input 
                    type="text" 
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Last Name</label>
                  <input 
                    type="text" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Phone Number</label>
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 font-mono" 
                  />
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Official Address</label>
                <textarea 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 min-h-[120px]" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Localization / Language</label>
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
                >
                  {languages.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-50 flex gap-4">
              <button 
                onClick={handleApplyChanges}
                className={`flex-1 py-5 rounded-2xl font-bold text-white shadow-xl transition-all active:scale-95 hover:brightness-110 flex items-center justify-center gap-2 ${role === 'ADMIN' ? 'bg-purple-600 shadow-purple-200' : 'bg-emerald-600 shadow-emerald-200'}`}
              >
                <span>💾</span> Apply Profile Updates
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>🛡️</span> Security Core
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">2FA Verification</span>
                <span className="text-emerald-500 font-bold uppercase text-[10px] bg-emerald-50 px-2 py-0.5 rounded">Enabled</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Session Key</span>
                <span className="font-mono text-[10px] bg-gray-50 px-2 py-1 rounded">V4-ACTIVE</span>
              </div>
            </div>
            <button className="w-full mt-6 py-3 border border-gray-200 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-50 transition-colors">
              Reset Security Token
            </button>
          </div>
          
          <div className="bg-emerald-600 p-6 rounded-3xl text-white shadow-xl shadow-emerald-200 relative overflow-hidden group">
            <div className="relative z-10">
              <h4 className="font-bold mb-2">Subscription Info</h4>
              <p className="text-4xl font-bold mb-4">Enterprise <span className="text-xs font-normal opacity-60">L3</span></p>
              <div className="space-y-2 mb-6 text-sm opacity-80">
                <p>Next Cycle: 12 Dec 2024</p>
              </div>
              <button onClick={() => navigate('/dashboard/subscription')} className="w-full bg-white/20 hover:bg-white/30 transition-colors py-3 rounded-xl text-xs font-bold backdrop-blur-md">
                Manage Billing Details
              </button>
            </div>
            <div className="absolute -bottom-10 -right-10 text-9xl opacity-10 group-hover:scale-110 transition-transform duration-500">💳</div>
          </div>

          <div className="bg-slate-900 p-6 rounded-3xl text-white shadow-xl">
             <h4 className="font-bold mb-4 flex items-center gap-2">
               <span>🌍</span> Carbon Neutrality Progress
             </h4>
             <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden mb-2">
               <div className="h-full bg-emerald-500 w-[74%] transition-all duration-1000"></div>
             </div>
             <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">74% Target Reached</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;