import React from 'react';
import { FileText, MessageSquare, Users, Star } from 'lucide-react';
import AnalyticsCards from  './analysCard'
import { mockBlogs } from '../data/mockData'; // Adjust path


const Analytics = () => {
  const sortedBlogs = [...mockBlogs].sort((a, b) => b.views - a.views); // clone before sort

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
      </div>

      <AnalyticsCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Posts */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Posts</h3>
          <div className="space-y-4">
            {sortedBlogs.map((blog, index) => (
              <div key={blog.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="bg-gray-100 text-gray-800 text-sm font-medium mr-3 px-2.5 py-0.5 rounded">
                    #{index + 1}
                  </span>
                  <div>
                    <p className="font-medium text-gray-900">{blog.title}</p>
                    <p className="text-sm text-gray-500">{blog.views} views</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="text-sm text-gray-600">{blog.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              {
                icon: <FileText className="h-4 w-4 text-blue-600" />,
                bg: "bg-blue-100",
                text: "New blog post published",
                time: "2 minutes ago",
              },
              {
                icon: <MessageSquare className="h-4 w-4 text-green-600" />,
                bg: "bg-green-100",
                text: "New comment received",
                time: "15 minutes ago",
              },
              {
                icon: <Users className="h-4 w-4 text-purple-600" />,
                bg: "bg-purple-100",
                text: "User registered",
                time: "1 hour ago",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start space-x-3">
                <div className={`${item.bg} p-2 rounded-full`}>{item.icon}</div>
                <div>
                  <p className="text-sm text-gray-900">{item.text}</p>
                  <p className="text-xs text-gray-500">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
