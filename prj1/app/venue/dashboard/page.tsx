
'use client';

import { useState } from 'react';
import VenueHeader from './VenueHeader';
import VenueSidebar from './VenueSidebar';
import VenueStats from './VenueStats';
import CouplesList from './CouplesList';
import VenueProfile from './VenueProfile';
import MediaManagement from './MediaManagement';

export default function VenueDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleStatClick = (statType: string) => {
    switch(statType) {
      case 'couples':
        setActiveTab('couples');
        break;
      case 'bookings':
        setActiveTab('overview');
        break;
      case 'revenue':
        setActiveTab('overview');
        break;
      case 'media':
        setActiveTab('media');
        break;
    }
  };

  const handleWeddingAction = (action: string, weddingId: number) => {
    console.log(`${action} action for wedding ${weddingId}`);
    // Action logic here
  };

  const handleActivityClick = (activityId: number) => {
    console.log(`Clicked activity ${activityId}`);
    // Navigate to related section
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <i className="ri-error-warning-line text-6xl text-red-500 mb-4"></i>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Bir Hata Oluştu</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer"
          >
            Sayfayı Yenile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <VenueHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex">
        <VenueSidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        <main className="flex-1 p-6 ml-0 lg:ml-64">
          {isLoading ? (
            <div className="flex items-center justify-center min-h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Yükleniyor...</p>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Grand Palace Hotel</h1>
                <p className="text-gray-600">Mekan yönetim paneline hoş geldiniz</p>
              </div>

              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <VenueStats onStatClick={handleStatClick} />
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg shadow p-6">
                      <h3 className="text-lg font-semibold mb-4">Yaklaşan Düğünler</h3>
                      <div className="space-y-3">
                        {[
                          { id: 1, couple: 'Sarah & Michael', date: '15 Haziran 2024', guests: 120, status: 'confirmed' },
                          { id: 2, couple: 'Emma & James', date: '22 Haziran 2024', guests: 85, status: 'planning' },
                          { id: 3, couple: 'Lisa & David', date: '5 Temmuz 2024', guests: 200, status: 'confirmed' },
                          { id: 4, couple: 'Anna & Robert', date: '12 Temmuz 2024', guests: 150, status: 'planning' }
                        ].map((wedding) => (
                          <div key={wedding.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <p className="font-medium">{wedding.couple}</p>
                              <p className="text-sm text-gray-600">{wedding.date} • {wedding.guests} misafir</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                wedding.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                              }`}>
                                {wedding.status === 'confirmed' ? 'Onaylandı' : 'Planlama'}
                              </span>
                              <div className="flex space-x-1">
                                <button 
                                  onClick={() => handleWeddingAction('view', wedding.id)}
                                  className="text-blue-600 hover:text-blue-900 p-1 cursor-pointer"
                                  title="Görüntüle"
                                >
                                  <i className="ri-eye-line text-sm"></i>
                                </button>
                                <button 
                                  onClick={() => handleWeddingAction('edit', wedding.id)}
                                  className="text-gray-600 hover:text-gray-900 p-1 cursor-pointer"
                                  title="Düzenle"
                                >
                                  <i className="ri-edit-line text-sm"></i>
                                </button>
                                <button 
                                  onClick={() => handleWeddingAction('guests', wedding.id)}
                                  className="text-green-600 hover:text-green-900 p-1 cursor-pointer"
                                  title="Misafir Listesi"
                                >
                                  <i className="ri-group-line text-sm"></i>
                                </button>
                                <button 
                                  onClick={() => handleWeddingAction('message', wedding.id)}
                                  className="text-purple-600 hover:text-purple-900 p-1 cursor-pointer"
                                  title="Mesaj Gönder"
                                >
                                  <i className="ri-message-line text-sm"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow p-6">
                      <h3 className="text-lg font-semibold mb-4">Son Aktiviteler</h3>
                      <div className="space-y-3">
                        {[
                          { id: 1, activity: 'Sarah & Michael çifti 25 yeni fotoğraf yükledi', time: '2 saat önce', icon: 'ri-image-line', type: 'media' },
                          { id: 2, activity: 'Emma & James düğün detaylarını güncelledi', time: '5 saat önce', icon: 'ri-edit-line', type: 'edit' },
                          { id: 3, activity: 'Lisa & David misafir listesini onayladı', time: '1 gün önce', icon: 'ri-user-line', type: 'guests' },
                          { id: 4, activity: 'Yeni çift başvurusu alındı', time: '2 gün önce', icon: 'ri-heart-line', type: 'new' }
                        ].map((item) => (
                          <div key={item.id} className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center flex-shrink-0">
                              <i className={`${item.icon} text-sm`}></i>
                            </div>
                            <div className="flex-1">
                              <button 
                                onClick={() => handleActivityClick(item.id)}
                                className="text-sm hover:text-blue-600 text-left cursor-pointer"
                              >
                                {item.activity}
                              </button>
                              <p className="text-xs text-gray-500">{item.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'couples' && <CouplesList />}
              {activeTab === 'profile' && <VenueProfile />}
              {activeTab === 'media' && <MediaManagement />}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
