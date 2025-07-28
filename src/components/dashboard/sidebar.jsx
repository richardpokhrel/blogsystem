import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  Settings, 
  X, 
  TrendingUp,
} from 'lucide-react';

// Sidebar Component

const Sidebar = ({ activeTab, setActiveTab, isMobileOpen, setIsMobileOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'blogs', label: 'Blog Posts', icon: FileText },
    { id: 'comments', label: 'Comments', icon: MessageSquare },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <SidebarHeader setIsMobileOpen={setIsMobileOpen} />
        <SidebarNavigation 
          menuItems={menuItems}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setIsMobileOpen={setIsMobileOpen}
        />
      </div>
    </>
  );
};

const SidebarHeader = ({ setIsMobileOpen }) => (
  <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
    <h1 className="text-xl font-bold text-gray-900">Blog Admin</h1>
    <button 
      onClick={() => setIsMobileOpen(false)}
      className="lg:hidden"
    >
      <X className="h-6 w-6" />
    </button>
  </div>
);

const SidebarNavigation = ({ menuItems, activeTab, setActiveTab, setIsMobileOpen }) => (
  <nav className="mt-6">
    {menuItems.map((item) => {
      const Icon = item.icon;
      return (
        <button
          key={item.id}
          onClick={() => {
            setActiveTab(item.id);
            setIsMobileOpen(false);
          }}
          className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
            activeTab === item.id ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' : 'text-gray-700'
          }`}
        >
          <Icon className="h-5 w-5 mr-3" />
          {item.label}
        </button>
      );
    })}
  </nav>
);

export default Sidebar;
