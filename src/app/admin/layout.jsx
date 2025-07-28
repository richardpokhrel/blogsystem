'use client';
import React, { useEffect, useState } from 'react';
import { Sidebar, Header } from '@/components/dashboard/admin'; 
import Dashboard from '@/components/dashboard/dashboard';
import BlogManagement from '@/components/dashboard/BlogManagement';
import CommentsManagement from '@/components/dashboard/Componenet';
import Analytics from '@/components/dashboard/Analystics';
import Settings from '@/components/dashboard/setting';
import { useAuthGuard } from '@/hooks/AuthGuard';

const AdminLayout = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { checking } = useAuthGuard();

  useEffect(() => {
    if (!checking) {
      return;
    }
  }, [checking]);

  if (checking) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-12 border border-neutral-100">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-neutral-200 rounded-full animate-spin border-t-violet-500"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-pulse border-t-violet-300"></div>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">Authenticating</h3>
              <p className="text-neutral-500">Securing your session...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "blogs":
        return <BlogManagement />;
      case "comments":
        return <CommentsManagement />;
      case "analytics":
        return <Analytics />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        <Header setIsMobileOpen={setIsMobileOpen} />

        <main className="flex-1 overflow-y-auto px-6 py-4 bg-gray-50">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
