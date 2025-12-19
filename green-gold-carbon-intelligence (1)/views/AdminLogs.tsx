
import React, { useState, useMemo } from 'react';

interface LogEntry {
  timestamp: string;
  user: string;
  action: string;
  target: string;
  ip: string;
  severity: 'Info' | 'Security' | 'System';
}

const AdminLogs: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState('All');

  const logs: LogEntry[] = [
    { timestamp: '2024-11-20 14:22:10', user: 'Admin Director', action: 'Identity Provisioned', target: 'USR-8212', ip: '192.168.1.1', severity: 'Security' },
    { timestamp: '2024-11-20 13:05:45', user: 'Sarah Miller', action: 'Energy Bill Upload', target: 'BILL-OCT-24', ip: '192.168.1.52', severity: 'Info' },
    { timestamp: '2024-11-20 11:40:12', user: 'James Wilson', action: 'Sustainability Report Generated', target: 'QR-Q3-24', ip: '10.0.0.4', severity: 'Info' },
    { timestamp: '2024-11-19 18:15:33', user: 'System', action: 'AI Model Re-training', target: 'GEMINI-LITE-V2', ip: '0.0.0.0', severity: 'System' },
    { timestamp: '2024-11-19 15:20:01', user: 'Linda Chen', action: 'Settings Updated', target: 'Fiscal Year Dates', ip: '192.168.1.22', severity: 'System' },
    { timestamp: '2024-11-19 10:00:05', user: 'Robert Fox', action: 'Password Changed', target: 'USR-5561', ip: '192.168.1.33', severity: 'Security' },
  ];

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchesSearch = 
        log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.target.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSeverity = severityFilter === 'All' || log.severity === severityFilter;
      
      return matchesSearch && matchesSeverity;
    });
  }, [searchQuery, severityFilter]);

  const handleExportCSV = () => {
    const headers = "Timestamp,User,Action,Target,IP,Severity\n";
    const csvContent = "data:text/csv;charset=utf-8," + headers + 
      filteredLogs.map(l => `${l.timestamp},${l.user},${l.action},${l.target},${l.ip},${l.severity}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "audit_logs.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Enterprise Audit Logs</h2>
          <p className="text-gray-500">Chronological record of system-wide actions for compliance and security.</p>
        </div>
        <button 
          onClick={handleExportCSV}
          className="text-purple-600 font-bold hover:underline bg-purple-50 px-4 py-2 rounded-lg transition-colors"
        >
          Export Full Log (CSV)
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 bg-slate-50 border-b flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input 
              type="text" 
              placeholder="Filter by user, action, or target..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all" 
            />
          </div>
          <select 
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="p-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all min-w-[180px]"
          >
            <option value="All">All Severity Levels</option>
            <option value="Security">Security Only</option>
            <option value="System">System Events</option>
            <option value="Info">Information</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Timestamp</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Initiator</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Action Performed</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Target Object</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">IP Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredLogs.map((log, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors font-mono text-xs">
                  <td className="px-6 py-4 text-gray-400">{log.timestamp}</td>
                  <td className="px-6 py-4 font-bold text-slate-700">{log.user}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded-md font-bold uppercase tracking-tighter ${
                      log.severity === 'Security' ? 'bg-red-50 text-red-600' :
                      log.severity === 'System' ? 'bg-blue-50 text-blue-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{log.target}</td>
                  <td className="px-6 py-4 text-gray-400">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredLogs.length === 0 && (
          <div className="p-12 text-center text-gray-400 italic">
            No audit records match your current filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLogs;
