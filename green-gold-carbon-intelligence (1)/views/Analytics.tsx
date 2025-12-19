
import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell
} from 'recharts';
import { getDeepThinkingAnalysis } from '../services/geminiService';

const sectorData = [
  { name: 'Heating', value: 45 },
  { name: 'Transport', value: 25 },
  { name: 'Supply Chain', value: 20 },
  { name: 'Waste', value: 10 },
];

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6'];

const Analytics: React.FC<{ role: string }> = ({ role }) => {
  const [isThinking, setIsThinking] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);

  const handleDeepAnalysis = async () => {
    setIsThinking(true);
    try {
      const result = await getDeepThinkingAnalysis({ sectorData, currentScore: 84 });
      setAnalysis(result.text);
    } catch (err) {
      console.error(err);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Advanced Analytics</h2>
        <button 
          onClick={handleDeepAnalysis}
          disabled={isThinking}
          className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg disabled:opacity-50"
        >
          {isThinking ? '🧠 AI Thinking...' : '✨ Deep Thinking Analysis'}
        </button>
      </div>

      {analysis && (
        <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-2xl animate-in zoom-in duration-300">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">💡</span>
            <h3 className="text-indigo-900 font-bold">Strategic AI Roadmap</h3>
          </div>
          <div className="text-indigo-800 prose max-w-none text-sm whitespace-pre-wrap">
            {analysis}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold mb-6 text-gray-800">Emissions by Category</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sectorData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sectorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold mb-6 text-gray-800">Efficiency Benchmarking</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'Your Co', score: 84 },
                { name: 'Sector Avg', score: 62 },
                { name: 'Top 10%', score: 95 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                  <Cell fill="#10b981" />
                  <Cell fill="#9ca3af" />
                  <Cell fill="#fbbf24" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
