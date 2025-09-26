
'use client';

import { useState } from 'react';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import StatsCards from './StatsCards';
import Analytics from './Analytics';
import CoupleManagement from './CoupleManagement';
import VenueManagement from './VenueManagement';
import MediaManagement from './MediaManagement';
import SystemSettings from './SystemSettings';
import ActivityLogs from './ActivityLogs';
import DownloadLogs from './DownloadLogs';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <StatsCards />
            <Analytics />
          </div>
        );
      case 'couples':
        return <CoupleManagement />;
      case 'venues':
        return <VenueManagement />;
      case 'settings':
        return <SystemSettings />;
      case 'activity-logs':
        return <ActivityLogs />;
      default:
        return (
          <div className="space-y-6">
            <StatsCards />
            <Analytics />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex">
        <AdminSidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        <main className="flex-1 lg:ml-64 p-4 lg:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
