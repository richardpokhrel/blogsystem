import React from 'react';
import { mockBlogs, mockComments } from '../data/mockData';
import AnalyticsCards from './analysCard'; // adjust to your actual file path

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Heading */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your blog.</p>
      </div>

      {/* Analytics Overview */}
      <AnalyticsCards />

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Posts */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Posts</h3>
          <div className="space-y-4">
            {mockBlogs.slice(0, 3).map((blog) => (
              <div key={blog.id} className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-gray-900">{blog.title}</p>
                  <p className="text-sm text-gray-500">{blog.date}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    blog.status === 'published'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {blog.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Comments */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Comments</h3>
          <div className="space-y-4">
            {mockComments.map((comment) => (
              <div key={comment.id} className="py-2 border-b border-gray-100 last:border-none">
                <p className="font-medium text-gray-900">{comment.author}</p>
                <p className="text-sm text-gray-600">{comment.content}</p>
                <p className="text-xs text-gray-500 mt-1">On: {comment.blogTitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
