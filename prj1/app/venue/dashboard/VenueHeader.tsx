
'use client';

import { useState } from 'react';
import Link from 'next/link';

interface VenueHeaderProps {
  onMenuClick: () => void;
}

export default function VenueHeader({ onMenuClick }: VenueHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showAddCoupleModal, setShowAddCoupleModal] = useState(false);
  const [newCouple, setNewCouple] = useState({
    brideName: '',
    groomName: '',
    weddingDate: '',
    guestCount: '',
    email: '',
    phone: ''
  });

  const handleAddCouple = (e: React.FormEvent) => {
    e.preventDefault();
    // Add couple logic here
    console.log('Adding couple:', newCouple);
    setShowAddCoupleModal(false);
    setNewCouple({
      brideName: '',
      groomName: '',
      weddingDate: '',
      guestCount: '',
      email: '',
      phone: ''
    });
    // Show success message
    alert('Çift başarıyla eklendi!');
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-4 relative z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="lg:hidden w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 cursor-pointer mr-4"
            >
              <i className="ri-menu-line text-xl"></i>
            </button>
            
            <Link href="/" className="text-2xl font-['Pacifico'] text-rose-800">
              Wedding Moments
            </Link>
            
            <div className="ml-8 hidden md:block">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                Mekan Paneli
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Add Couple Button */}
            <button 
              onClick={() => setShowAddCoupleModal(true)}
              className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-heart-add-line mr-2"></i>
              <span className="hidden md:inline">Çift Ekle</span>
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 relative cursor-pointer"
              >
                <i className="ri-notification-line text-xl"></i>
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  2
                </span>
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-xl">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-semibold">Bildirimler</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {[
                      { message: 'Sarah & Michael 15 yeni fotoğraf yükledi', time: '10 dk önce', type: 'upload' },
                      { message: 'Emma & James düğün tarihi güncellendi', time: '1 saat önce', type: 'update' }
                    ].map((notification, index) => (
                      <div key={index} className="p-4 hover:bg-gray-50 border-b border-gray-100 last:border-0 cursor-pointer">
                        <p className="text-sm font-medium">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <img
                  src="https://readdy.ai/api/search-image?query=Professional%20wedding%20venue%20manager%20portrait%2C%20welcoming%20smile%2C%20elegant%20hotel%20lobby%20background%2C%20hospitality%20industry%20professional&width=100&height=100&seq=venue-avatar&orientation=squarish"
                  alt="Venue Manager"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="hidden md:block text-sm font-medium">Mekan Yöneticisi</span>
                <i className="ri-arrow-down-s-line text-gray-400"></i>
              </button>
              
              {showProfile && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl">
                  <div className="p-2">
                    <button 
                      onClick={() => {/* Navigate to profile */}}
                      className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded cursor-pointer"
                    >
                      Mekan Profili
                    </button>
                    <button 
                      onClick={() => {/* Navigate to settings */}}
                      className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded cursor-pointer"
                    >
                      Ayarlar
                    </button>
                    <hr className="my-2" />
                    <Link href="/auth/login" className="block px-3 py-2 text-sm hover:bg-gray-50 rounded text-red-600 cursor-pointer">
                      Çıkış Yap
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Add Couple Modal */}
      {showAddCoupleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Yeni Çift Ekle</h3>
                <button
                  onClick={() => setShowAddCoupleModal(false)}
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
            </div>
            
            <form onSubmit={handleAddCouple} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gelin Adı
                  </label>
                  <input
                    type="text"
                    required
                    value={newCouple.brideName}
                    onChange={(e) => setNewCouple({...newCouple, brideName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Damat Adı
                  </label>
                  <input
                    type="text"
                    required
                    value={newCouple.groomName}
                    onChange={(e) => setNewCouple({...newCouple, groomName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Düğün Tarihi
                </label>
                <input
                  type="date"
                  required
                  value={newCouple.weddingDate}
                  onChange={(e) => setNewCouple({...newCouple, weddingDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Misafir Sayısı
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={newCouple.guestCount}
                  onChange={(e) => setNewCouple({...newCouple, guestCount: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-posta Adresi
                </label>
                <input
                  type="email"
                  required
                  value={newCouple.email}
                  onChange={(e) => setNewCouple({...newCouple, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefon Numarası
                </label>
                <input
                  type="tel"
                  required
                  value={newCouple.phone}
                  onChange={(e) => setNewCouple({...newCouple, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm"
                />
              </div>
              
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddCoupleModal(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-rose-500 hover:bg-rose-600 text-white py-2 px-4 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer"
                >
                  Çift Ekle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
