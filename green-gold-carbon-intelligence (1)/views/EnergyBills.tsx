
import React, { useState } from 'react';

type UtilityType = 'All' | 'Electricity' | 'Gas' | 'Water' | 'Fuel' | 'Waste';

interface UtilityBill {
  id: string;
  type: Exclude<UtilityType, 'All'>;
  vendor: string;
  period: string;
  amount: string;
  status: 'Verified' | 'Anomalous' | 'Pending';
  emissions: string;
  icon: string;
  color: string;
}

const EnergyBills: React.FC<{ role: string }> = ({ role }) => {
  const isAdmin = role === 'ADMIN';
  const [activeFilter, setActiveFilter] = useState<UtilityType>('All');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [bills, setBills] = useState<UtilityBill[]>([
    { id: 'BILL-001', type: 'Electricity', vendor: 'British Gas Business', period: 'Oct 2024', amount: '£1,240.00', status: 'Verified', emissions: '2.4t CO2e', icon: '⚡', color: 'text-amber-500 bg-amber-50' },
    { id: 'BILL-002', type: 'Gas', vendor: 'EDF Energy', period: 'Oct 2024', amount: '£850.00', status: 'Verified', emissions: '3.1t CO2e', icon: '🔥', color: 'text-orange-500 bg-orange-50' },
    { id: 'BILL-003', type: 'Water', vendor: 'Thames Water', period: 'Q3 2024', amount: '£320.00', status: 'Verified', emissions: '0.2t CO2e', icon: '💧', color: 'text-blue-500 bg-blue-50' },
    { id: 'BILL-004', type: 'Fuel', vendor: 'Shell Fleet', period: 'Oct 2024', amount: '£2,100.00', status: 'Anomalous', emissions: '5.8t CO2e', icon: '⛽', color: 'text-slate-600 bg-slate-100' },
    { id: 'BILL-005', type: 'Waste', vendor: 'Biffa Services', period: 'Sep 2024', amount: '£450.00', status: 'Verified', emissions: '1.2t CO2e', icon: '🗑️', color: 'text-emerald-600 bg-emerald-50' },
    { id: 'BILL-006', type: 'Gas', vendor: 'EDF Energy', period: 'Sep 2024', amount: '£790.00', status: 'Verified', emissions: '2.9t CO2e', icon: '🔥', color: 'text-orange-500 bg-orange-50' },
  ]);

  const [newBill, setNewBill] = useState({
    type: 'Electricity' as Exclude<UtilityType, 'All'>,
    vendor: '',
    period: '',
    amount: '',
    emissions: ''
  });

  const filteredBills = activeFilter === 'All' 
    ? bills 
    : bills.filter(bill => bill.type === activeFilter);

  const filterOptions: UtilityType[] = ['All', 'Electricity', 'Gas', 'Water', 'Fuel', 'Waste'];

  const getUtilityMeta = (type: Exclude<UtilityType, 'All'>) => {
    switch(type) {
      case 'Electricity': return { icon: '⚡', color: 'text-amber-500 bg-amber-50' };
      case 'Gas': return { icon: '🔥', color: 'text-orange-500 bg-orange-50' };
      case 'Water': return { icon: '💧', color: 'text-blue-500 bg-blue-50' };
      case 'Fuel': return { icon: '⛽', color: 'text-slate-600 bg-slate-100' };
      case 'Waste': return { icon: '🗑️', color: 'text-emerald-600 bg-emerald-50' };
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const meta = getUtilityMeta(newBill.type);
    const amountNum = parseFloat(newBill.amount.replace('£', '').replace(',', '')) || 0;
    const emissionsVal = newBill.emissions.includes('t CO2e') ? newBill.emissions : `${newBill.emissions}t CO2e`;

    const billToAdd: UtilityBill = {
      id: `BILL-${Math.floor(Math.random() * 9000 + 1000)}`,
      type: newBill.type,
      vendor: newBill.vendor,
      period: newBill.period,
      amount: `£${amountNum.toLocaleString()}`,
      status: 'Pending',
      emissions: emissionsVal,
      ...meta
    };

    setBills([billToAdd, ...bills]);
    setShowUploadModal(false);
    setNewBill({ type: 'Electricity', vendor: '', period: '', amount: '', emissions: '' });
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(filteredBills, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", `CarbonIntel_Utility_Report_${activeFilter}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Resource Management</h2>
          <p className="text-xs sm:text-sm text-gray-500">Track and verify consumption across categories.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button 
            onClick={handleExport}
            className="flex-1 sm:flex-none bg-white text-gray-700 px-4 sm:px-6 py-2.5 rounded-xl font-bold border border-gray-200 hover:bg-gray-50 transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95 text-xs sm:text-sm"
          >
            <span>📊</span> Export
          </button>
          <button 
            onClick={() => setShowUploadModal(true)}
            className="flex-1 sm:flex-none bg-emerald-600 text-white px-4 sm:px-6 py-2.5 rounded-xl font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-100 active:scale-95 text-xs sm:text-sm"
          >
            <span>📤</span> Upload Bill
          </button>
        </div>
      </div>

      <div className="flex gap-2 pb-2 overflow-x-auto custom-scrollbar whitespace-nowrap -mx-1 px-1">
        {filterOptions.map((opt) => (
          <button
            key={opt}
            onClick={() => setActiveFilter(opt)}
            className={`px-4 py-2 rounded-full text-[10px] font-bold transition-all border shrink-0 ${
              activeFilter === opt 
              ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
              : 'bg-white text-gray-500 border-gray-200'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead className="bg-slate-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Resource Type</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Vendor</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Period</th>
                {isAdmin && <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Amount</th>}
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Impact</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredBills.map((bill) => (
                <tr key={bill.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-base ${bill.color}`}>
                        {bill.icon}
                      </div>
                      <span className="font-bold text-gray-900 text-xs">{bill.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-800 text-xs">{bill.vendor}</span>
                      <span className="text-[9px] text-gray-400 uppercase font-mono">{bill.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-gray-600">{bill.period}</span>
                  </td>
                  {isAdmin && (
                    <td className="px-6 py-4">
                      <span className="font-mono font-bold text-slate-900 text-xs">{bill.amount}</span>
                    </td>
                  )}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                      <span className="text-xs font-medium text-emerald-700">{bill.emissions}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-tight ${
                      bill.status === 'Verified' 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : bill.status === 'Anomalous' 
                      ? 'bg-red-100 text-red-700 animate-pulse' 
                      : 'bg-gray-100 text-gray-500 border border-gray-200'
                    }`}>
                      {bill.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredBills.length === 0 && (
          <div className="py-20 text-center">
            <div className="text-3xl mb-4 text-gray-300">🔍</div>
            <p className="text-gray-400 text-sm font-medium">No records found for {activeFilter}</p>
          </div>
        )}
      </div>

      <div className={`grid grid-cols-1 ${isAdmin ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-4 sm:gap-6`}>
        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 shadow-sm">
          <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">Total Carbon</p>
          <p className="text-xl sm:text-2xl font-bold text-emerald-900">
            {filteredBills.reduce((acc, b) => acc + parseFloat(b.emissions.split('t')[0]), 0).toFixed(1)}t CO2e
          </p>
        </div>
        {isAdmin && (
          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 shadow-sm">
            <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">Total Spend</p>
            <p className="text-xl sm:text-2xl font-bold text-blue-900">
              £{filteredBills.reduce((acc, b) => acc + parseFloat(b.amount.replace('£', '').replace(',', '')), 0).toLocaleString()}
            </p>
          </div>
        )}
        <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100 shadow-sm">
          <p className="text-[10px] font-bold text-purple-600 uppercase tracking-widest mb-1">Review Items</p>
          <p className="text-xl sm:text-2xl font-bold text-purple-900">
            {filteredBills.filter(b => b.status === 'Anomalous' || b.status === 'Pending').length} Pending
          </p>
        </div>
      </div>

      {showUploadModal && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-xl z-[60] flex items-center justify-center sm:p-4">
          <div className="bg-white w-full h-full sm:h-auto sm:max-w-lg sm:rounded-[2rem] p-6 sm:p-8 shadow-2xl animate-in zoom-in slide-in-from-bottom sm:slide-in-from-bottom-0 duration-300 overflow-y-auto custom-scrollbar">
            <div className="flex justify-between items-center mb-6 pt-safe">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">New Bill Record</h3>
              <button 
                onClick={() => setShowUploadModal(false)}
                className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 text-3xl font-light"
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleUploadSubmit} className="space-y-6 pb-20 sm:pb-0">
              <div className="space-y-3">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest">Utility Category</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(['Electricity', 'Gas', 'Water', 'Fuel', 'Waste'] as Exclude<UtilityType, 'All'>[]).map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setNewBill({...newBill, type})}
                      className={`p-3 rounded-xl border-2 text-[10px] font-bold uppercase transition-all ${
                        newBill.type === type 
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700' 
                        : 'border-gray-50 bg-gray-50 text-gray-400 hover:border-gray-200'
                      }`}
                    >
                      {getUtilityMeta(type).icon} {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest">Service Provider</label>
                <input 
                  type="text" 
                  required
                  value={newBill.vendor}
                  onChange={(e) => setNewBill({...newBill, vendor: e.target.value})}
                  className="w-full p-3.5 sm:p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all text-sm" 
                  placeholder="e.g. British Gas" 
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest">Billing Period</label>
                  <input 
                    type="text" 
                    required
                    value={newBill.period}
                    onChange={(e) => setNewBill({...newBill, period: e.target.value})}
                    className="w-full p-3.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-4 focus:ring-emerald-500/10 text-sm" 
                    placeholder="e.g. Oct 2024" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest">Total Amount (£)</label>
                  <input 
                    type="text" 
                    required={isAdmin}
                    value={newBill.amount}
                    onChange={(e) => setNewBill({...newBill, amount: e.target.value})}
                    className="w-full p-3.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-4 focus:ring-emerald-500/10 text-sm font-mono" 
                    placeholder="£0.00" 
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest">Carbon Impact (t CO2e)</label>
                <input 
                  type="text" 
                  required
                  value={newBill.emissions}
                  onChange={(e) => setNewBill({...newBill, emissions: e.target.value})}
                  className="w-full p-3.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-4 focus:ring-emerald-500/10 text-sm font-mono" 
                  placeholder="e.g. 2.4" 
                />
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button 
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 py-4 bg-gray-100 rounded-xl font-bold text-gray-600 hover:bg-gray-200 transition-all active:scale-95 text-sm order-2 sm:order-1"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-4 bg-emerald-600 rounded-xl font-bold text-white hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 active:scale-95 text-sm order-1 sm:order-2"
                >
                  Submit & Verify
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnergyBills;
