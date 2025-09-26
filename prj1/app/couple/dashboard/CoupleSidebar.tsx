
'use client';

interface CoupleSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function CoupleSidebar({ activeTab, setActiveTab, isOpen, onClose }: CoupleSidebarProps) {
  const menuItems = [
    { id: 'overview', label: 'Genel Bakış', icon: 'ri-dashboard-line' },
    { id: 'profile', label: 'Profil Düzenle', icon: 'ri-user-heart-line' },
    { id: 'guests', label: 'Misafir Yönetimi', icon: 'ri-group-line' },
    { id: 'media', label: 'Medya Galerisi', icon: 'ri-image-line' },
    { id: 'voice-messages', label: 'Sesli Mesajlar', icon: 'ri-mic-line' },
    { id: 'invitations', label: 'Davetiye Tasarımı', icon: 'ri-mail-send-line' }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6">
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  onClose();
                }}
                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-rose-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <i className={`${item.icon} mr-3`}></i>
                {item.label}
                {item.id === 'voice-messages' && (
                  <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    3
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
