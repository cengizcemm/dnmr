
'use client';

import { useState } from 'react';
import CoupleHeader from './CoupleHeader';
import CoupleSidebar from './CoupleSidebar';
import WeddingOverview from './WeddingOverview';
import ProfileEditor from './ProfileEditor';
import GuestManagement from './GuestManagement';
import MediaGallery from './MediaGallery';
import InvitationDesign from './InvitationDesign';
import VoiceMessages from './VoiceMessages';

export default function CoupleDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <WeddingOverview />;
      case 'profile':
        return <ProfileEditor />;
      case 'guests':
        return <GuestManagement />;
      case 'media':
        return <MediaGallery />;
      case 'invitations':
        return <InvitationDesign />;
      case 'voice-messages':
        return <VoiceMessages />;
      default:
        return <WeddingOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CoupleHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex">
        <CoupleSidebar 
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
