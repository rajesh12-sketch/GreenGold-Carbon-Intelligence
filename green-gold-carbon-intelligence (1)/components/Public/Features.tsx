
import React from 'react';

const Features: React.FC = () => {
  const features = [
    {
      title: 'Reduce Costs',
      description: 'Identify operational waste and lower energy bills with intelligent monitoring.',
      icon: '💰',
      color: 'bg-blue-100'
    },
    {
      title: 'Lower Carbon',
      description: 'Automated CO2e calculations across Scope 1, 2, and 3 emissions.',
      icon: '🌱',
      color: 'bg-emerald-100'
    },
    {
      title: 'Audit-Ready Reports',
      description: 'Generate professional, compliant sustainability reports in seconds.',
      icon: '📋',
      color: 'bg-purple-100'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, idx) => (
          <div key={idx} className="pt-6">
            <div className="flow-root bg-gray-50 rounded-2xl px-6 pb-8 h-full border border-transparent hover:border-emerald-100 transition-all hover:shadow-lg">
              <div className="-mt-6">
                <div>
                  <span className={`inline-flex items-center justify-center p-3 rounded-xl shadow-lg text-3xl ${feature.color}`}>
                    {feature.icon}
                  </span>
                </div>
                <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{feature.title}</h3>
                <p className="mt-5 text-base text-gray-500">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
