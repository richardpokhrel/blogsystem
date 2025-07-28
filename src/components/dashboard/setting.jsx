import React from 'react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

const Settings = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="siteTitle" className="block text-sm font-medium text-gray-700">
                Site Title
              </label>
              <Input
                id="siteTitle"
                type="text"
                defaultValue="My Blog"
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700">
                Site Description
              </label>
              <Textarea
                id="siteDescription"
                rows={3}
                defaultValue="A professional blog about web development"
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="allowComments" className="flex items-center cursor-pointer select-none">
                <input
                  id="allowComments"
                  type="checkbox"
                  className="mr-2"
                  defaultChecked
                />
                <span className="text-sm text-gray-700">Allow comments on posts</span>
              </label>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="adminUsername" className="block text-sm font-medium text-gray-700">
                Admin Username
              </label>
              <Input
                id="adminUsername"
                type="text"
                defaultValue="admin"
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="adminEmail" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                id="adminEmail"
                type="email"
                defaultValue="admin@blog.com"
                className="mt-1"
              />
            </div>
            <button
              type="button"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
