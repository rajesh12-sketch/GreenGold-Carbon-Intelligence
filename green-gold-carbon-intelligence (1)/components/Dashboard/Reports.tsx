
import React from 'react';

const Reports: React.FC = () => {
  const reports = [
    { name: 'Sustainability Audit Report - Oct 2024', date: 'Nov 01, 2024', type: 'PDF', size: '2.4 MB' },
    { name: 'Quarterly Scope 1,2,3 Summary Q3', date: 'Oct 05, 2024', type: 'PDF', size: '4.1 MB' },
    { name: 'Waste Management Evidence Pack', date: 'Sep 28, 2024', type: 'ZIP', size: '12.8 MB' },
    { name: 'Energy Consumption Detail v1', date: 'Sep 15, 2024', type: 'XLSX', size: '1.2 MB' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Reporting & Evidence</h2>
          <p className="text-gray-500">Download audit-ready documentation for regulatory compliance.</p>
        </div>
        <button className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-emerald-700 transition-colors flex items-center gap-2 shadow-lg">
          <span>⚡</span> Generate New Report
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Report Name</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date Generated</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">File Type</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Size</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {reports.map((report, idx) => (
              <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded flex items-center justify-center font-bold text-xs uppercase">
                      {report.type}
                    </div>
                    <span className="font-medium text-gray-900">{report.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-500 text-sm">{report.date}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded uppercase tracking-wider">
                    {report.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500 text-sm">{report.size}</td>
                <td className="px-6 py-4">
                  <button className="text-emerald-600 hover:text-emerald-800 font-bold text-sm flex items-center gap-1">
                    <span>⬇️</span> Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold mb-4">Report Customization</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Inclusion Period</label>
              <select className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm">
                <option>Current Fiscal Year (2024)</option>
                <option>Last 12 Months</option>
                <option>Custom Range</option>
              </select>
            </div>
            <div className="flex items-center gap-4 py-2">
              <input type="checkbox" id="sc3" defaultChecked className="w-4 h-4 text-emerald-600" />
              <label htmlFor="sc3" className="text-sm text-gray-700">Include Scope 3 Indirect Emissions</label>
            </div>
            <div className="flex items-center gap-4 py-2">
              <input type="checkbox" id="bench" defaultChecked className="w-4 h-4 text-emerald-600" />
              <label htmlFor="bench" className="text-sm text-gray-700">Add Industry Benchmark Comparisons</label>
            </div>
          </div>
        </div>

        <div className="bg-emerald-600 p-8 rounded-2xl text-white shadow-xl flex flex-col justify-center items-center text-center">
          <div className="text-4xl mb-4">🌳</div>
          <h3 className="text-xl font-bold mb-2">Plant Your Impact</h3>
          <p className="text-emerald-100 mb-6 text-sm">For every report generated, we contribute to reforestation projects in partnership with Carbon Neutral Britain.</p>
          <button className="bg-white text-emerald-600 px-6 py-2 rounded-xl font-bold hover:bg-emerald-50 transition-all text-sm">
            View My Planting Forest
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;
