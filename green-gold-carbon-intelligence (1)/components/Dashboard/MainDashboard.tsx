
import React from 'react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import MetricCard from './MetricCard';
import AIInsights from './AIInsights';

const data = [
  { month: 'Jan', carbon: 45, energy: 2400 },
  { month: 'Feb', carbon: 42, energy: 2300 },
  { month: 'Mar', carbon: 48, energy: 2800 },
  { month: 'Apr', carbon: 38, energy: 2100 },
  { month: 'May', carbon: 35, energy: 1900 },
  { month: 'Jun', carbon: 32, energy: 1800 },
];

const MainDashboard: React.FC = () => {
  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        <MetricCard 
          label="Carbon Footprint"
          value="32.4"
          subValue="tCO2e"
          icon="🌱"
          trend="down"
          trendValue="8.4%"
          colorClass="bg-emerald-100 text-emerald-600"
        />
        <MetricCard 
          label="Efficiency Score"
          value="84"
          subValue="/100"
          icon="⚡"
          trend="up"
          trendValue="2pts"
          colorClass="bg-amber-100 text-amber-600"
        />
        <MetricCard 
          label="Potential Savings"
          value="£245"
          subValue="GBP/mo"
          icon="🚀"
          colorClass="bg-purple-100 text-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
            <h3 className="text-lg font-bold text-gray-900">Emissions Trend</h3>
            <select className="w-full sm:w-auto text-xs font-bold border-gray-200 rounded-xl bg-gray-50 px-4 py-2 outline-none">
              <option>Last 6 months</option>
              <option>Year to date</option>
            </select>
          </div>
          <div className="h-64 sm:h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorCarbon" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#9ca3af', fontSize: 10}} 
                  dy={10} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#9ca3af', fontSize: 10}} 
                />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontSize: '12px'}}
                />
                <Area 
                  type="monotone" 
                  dataKey="carbon" 
                  stroke="#10b981" 
                  fillOpacity={1} 
                  fill="url(#colorCarbon)" 
                  strokeWidth={3} 
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex flex-col gap-6 sm:gap-8 min-w-0">
          <AIInsights />
          
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm flex-grow">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Activity Journal</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                <span className="text-emerald-600 mt-0.5 text-lg">✅</span>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-emerald-900 line-clamp-1">Reduced Kitchen Waste</h4>
                  <p className="text-[10px] text-emerald-700 leading-tight">Composting initiative saved 0.5t CO2e this month.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-red-50 rounded-xl border border-red-100">
                <span className="text-red-600 mt-0.5 text-lg">⚠️</span>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-red-900 line-clamp-1">Heating Anomaly Detected</h4>
                  <p className="text-[10px] text-red-700 leading-tight">Basement radiator active 24/7 in zone B.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                <span className="text-blue-600 mt-0.5 text-lg">💡</span>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-blue-900 line-clamp-1">Smart Upgrade Potential</h4>
                  <p className="text-[10px] text-blue-700 leading-tight">Replacing 10 bulbs could save £12/mo.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
