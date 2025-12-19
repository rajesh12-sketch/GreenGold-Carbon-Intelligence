
import React, { useState, useEffect } from 'react';
import { getAIInsights } from '../../services/geminiService';
import { AIRecommendation } from '../../types';

const AIInsights: React.FC = () => {
  const [insights, setInsights] = useState<AIRecommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      setLoading(true);
      const data = await getAIInsights({
        industry: "Care Sector",
        emissions: 32.4,
        cost: 850,
        efficiency: 84
      });
      setInsights(data);
      setLoading(false);
    };

    fetchInsights();
  }, []);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 rounded-2xl text-white shadow-xl animate-pulse">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span>🧠</span> AI Intelligence Analyzing...
        </h3>
        <div className="space-y-3">
          <div className="h-4 bg-white/20 rounded w-3/4"></div>
          <div className="h-4 bg-white/20 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 rounded-2xl text-white shadow-xl">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <span>🧠</span> Carbon Intelligence
      </h3>
      <div className="space-y-4">
        {insights.slice(0, 2).map((insight, idx) => (
          <div key={idx} className="bg-white/10 hover:bg-white/20 p-4 rounded-xl border border-white/10 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-sm leading-tight">{insight.title}</h4>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                insight.impact === 'High' ? 'bg-red-500/80' : 'bg-emerald-500/80'
              }`}>
                {insight.impact}
              </span>
            </div>
            <p className="text-xs text-white/80 line-clamp-2 mb-2">{insight.description}</p>
            <div className="flex justify-between items-center text-xs font-medium border-t border-white/10 pt-2 mt-2">
              <span>Potential Gain:</span>
              <span className="text-emerald-300">£{insight.savings} /mo</span>
            </div>
          </div>
        ))}
        <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold transition-all border border-white/20">
          View Detailed Roadmap
        </button>
      </div>
    </div>
  );
};

export default AIInsights;
