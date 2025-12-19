
import React from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon: string;
  colorClass: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, subValue, trend, trendValue, icon, colorClass }) => {
  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-lg sm:text-xl ${colorClass}`}>
          {icon}
        </div>
        {trend && (
          <span className={`text-[10px] sm:text-xs font-bold flex items-center gap-1 px-2 py-0.5 rounded-full ${
            trend === 'down' ? 'bg-emerald-50 text-emerald-600' : trend === 'up' ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-500'
          }`}>
            {trend === 'down' ? '↓' : trend === 'up' ? '↑' : '•'} {trendValue}
          </span>
        )}
      </div>
      <h3 className="text-gray-500 text-[11px] sm:text-sm font-bold uppercase tracking-widest mb-1">{label}</h3>
      <div className="flex items-baseline flex-wrap gap-x-2 gap-y-0">
        <span className="text-xl sm:text-2xl font-extrabold text-gray-900 leading-none">{value}</span>
        {subValue && <span className="text-[10px] sm:text-sm text-gray-400 font-bold">{subValue}</span>}
      </div>
    </div>
  );
};

export default MetricCard;
