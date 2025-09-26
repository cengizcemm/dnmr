
'use client';

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ activeTab, setActiveTab, isOpen, onClose }: AdminSidebarProps) {
  const menuItems = [
    { id: 'overview', label: 'Genel Bakış', icon: 'ri-dashboard-line' },
    { id: 'couples', label: 'Çift Yönetimi', icon: 'ri-heart-line' },
    { id: 'venues', label: 'Mekan Yönetimi', icon: 'ri-building-line' },
    { id: 'media', label: 'Medya Yönetimi', icon: 'ri-image-line' },
    { id: 'activity-logs', label: 'Aktivite Kayıtları', icon: 'ri-file-list-3-line' },
    { id: 'download-logs', label: 'İndirme Kayıtları', icon: 'ri-download-line' },
    { id: 'settings', label: 'Sistem Ayarları', icon: 'ri-settings-line' }
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
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <i className={`${item.icon} mr-3`}></i>
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
