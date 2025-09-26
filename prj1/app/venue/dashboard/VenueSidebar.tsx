'use client';

interface VenueSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function VenueSidebar({ activeTab, onTabChange, isOpen, onClose }: VenueSidebarProps) {
  const menuItems = [
    { id: 'overview', title: 'Genel Bakış', icon: 'ri-dashboard-line' },
    { id: 'couples', title: 'Çiftler', icon: 'ri-heart-line' },
    { id: 'profile', title: 'Mekan Profili', icon: 'ri-building-line' },
    { id: 'media', title: 'Medya Yönetimi', icon: 'ri-image-line' }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 z-50 lg:translate-x-0 lg:static lg:z-auto ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6 pt-20 lg:pt-6">
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  onClose();
                }}
                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <i className={`${item.icon} mr-3 text-lg`}></i>
                {item.title}
              </button>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}