'use client';

import { useState } from 'react';
import Link from 'next/link';

interface AdminHeaderProps {
  onMenuClick: () => void;
}

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
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
            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
              Admin Panel
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2">
            <i className="ri-search-line text-gray-400 mr-2"></i>
            <input
              type="text"
              placeholder="Ara..."
              className="bg-transparent border-none outline-none text-sm w-48"
            />
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 relative cursor-pointer"
            >
              <i className="ri-notification-line text-xl"></i>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-xl">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="font-semibold">Bildirimler</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {[
                    { message: 'Yeni mekan kaydı onay bekliyor', time: '5 dk önce', type: 'warning' },
                    { message: 'Sistem yedeklemesi tamamlandı', time: '1 saat önce', type: 'success' },
                    { message: 'Yüksek trafik algılandı', time: '2 saat önce', type: 'info' }
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
                src="https://readdy.ai/api/search-image?query=Professional%20business%20administrator%20portrait%2C%20friendly%20smile%2C%20modern%20office%20background%2C%20confident%20pose%2C%20business%20attire&width=100&height=100&seq=admin-avatar&orientation=squarish"
                alt="Admin"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="hidden md:block text-sm font-medium">Admin</span>
              <i className="ri-arrow-down-s-line text-gray-400"></i>
            </button>
            
            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl">
                <div className="p-2">
                  <Link href="/admin/profile" className="block px-3 py-2 text-sm hover:bg-gray-50 rounded cursor-pointer">
                    Profil Ayarları
                  </Link>
                  <Link href="/admin/logs" className="block px-3 py-2 text-sm hover:bg-gray-50 rounded cursor-pointer">
                    Sistem Logları
                  </Link>
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
  );
}