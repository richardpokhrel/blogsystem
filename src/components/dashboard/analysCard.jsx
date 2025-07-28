import React from 'react';
import { TrendingUp } from 'lucide-react';

const AnalyticsCards = () => {
  const stats = [
    {
      title: 'Total Posts',
      value: '24',
      change: '+12%',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Total Views',
      value: '8,542',
      change: '+18%',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Comments',
      value: '156',
      change: '+7%',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Avg Rating',
      value: '4.3',
      change: '+0.2',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-full ${stat.bgColor}`}>
              <TrendingUp className={`h-5 w-5 ${stat.color}`} />
            </div>
          </div>
          <div className="mt-4">
            <span className={`text-sm font-medium ${stat.color}`}>{stat.change}</span>
            <span className="text-sm text-gray-500 ml-1">vs last month</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnalyticsCards;
