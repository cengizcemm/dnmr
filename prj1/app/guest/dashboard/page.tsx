
'use client';

import { useState } from 'react';
import Link from 'next/link';
import GuestHeader from './GuestHeader';
import GuestSidebar from './GuestSidebar';

export default function GuestDashboard() {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <GuestHeader />
      
      <div className="flex">
        <GuestSidebar />
        
        <main className="flex-1 lg:ml-64 p-4 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {/* Welcome Section */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">Hoş geldiniz, Emma!</h1>
                  <p className="text-gray-600">Sarah & Michael'ın düğün misafiri paneline hoş geldiniz</p>
                </div>
                <div className="relative">
                  <button
                    onClick={() => setShowProfile(!showProfile)}
                    className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors cursor-pointer"
                  >
                    <img
                      src="https://readdy.ai/api/search-image?query=Happy%20young%20woman%20portrait%2C%20smiling%20female%20guest%2C%20wedding%20attendee%2C%20friendly%20face%2C%20professional%20headshot%2C%20warm%20smile&width=100&height=100&seq=guest-avatar&orientation=squarish"
                      alt="Emma"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="font-medium">Emma Wilson</span>
                    <i className="ri-arrow-down-s-line text-gray-400"></i>
                  </button>
                  
                  {showProfile && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-10">
                      <div className="p-2">
                        <Link 
                          href="/guest/profile" 
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer flex items-center"
                          onClick={() => setShowProfile(false)}
                        >
                          <i className="ri-user-line mr-3"></i>
                          Profil Ayarları
                        </Link>
                        <Link href="/guest/privacy" className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer flex items-center">
                          <i className="ri-shield-user-line mr-3"></i>
                          Gizlilik Ayarları
                        </Link>
                        <hr className="my-2" />
                        <Link href="/auth/login" className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 cursor-pointer flex items-center">
                          <i className="ri-logout-box-line mr-3"></i>
                          Çıkış Yap
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center">
                    <i className="ri-calendar-event-line text-rose-600 text-xl"></i>
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">12</p>
                    <p className="text-gray-600 text-sm">Gün Kaldı</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i className="ri-image-line text-blue-600 text-xl"></i>
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">24</p>
                    <p className="text-gray-600 text-sm">Yüklediğim Fotoğraf</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <i className="ri-mic-line text-green-600 text-xl"></i>
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">5</p>
                    <p className="text-gray-600 text-sm">Sesli Mesaj</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <i className="ri-heart-line text-purple-600 text-xl"></i>
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">47</p>
                    <p className="text-gray-600 text-sm">Beğeni</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Son Aktiviteler</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center">
                      <i className="ri-image-line text-rose-600 text-sm"></i>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">3 yeni fotoğraf yüklediniz</p>
                      <p className="text-xs text-gray-500">2 saat önce</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <i className="ri-heart-line text-blue-600 text-sm"></i>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">Sarah'ın fotoğrafını beğendiniz</p>
                      <p className="text-xs text-gray-500">1 gün önce</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <i className="ri-mic-line text-green-600 text-sm"></i>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">Sesli tebrik mesajı gönderdiniz</p>
                      <p className="text-xs text-gray-500">2 gün önce</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Düğün Bilgileri</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <i className="ri-calendar-line text-gray-400"></i>
                    <div>
                      <p className="font-medium">15 Haziran 2024, Cumartesi</p>
                      <p className="text-sm text-gray-600">16:00</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <i className="ri-map-pin-line text-gray-400"></i>
                    <div>
                      <p className="font-medium">Grand Palace Hotel</p>
                      <p className="text-sm text-gray-600">Beyoğlu, İstanbul</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <i className="ri-group-line text-gray-400"></i>
                    <div>
                      <p className="font-medium">156 Davetli</p>
                      <p className="text-sm text-gray-600">142 Katılacak</p>
                    </div>
                  </div>
                </div>
                
                <Link 
                  href="/w/wedding-sarah-michael/profile/couple"
                  className="mt-4 w-full bg-rose-500 hover:bg-rose-600 text-white py-2 px-4 rounded-lg font-medium transition-colors cursor-pointer flex items-center justify-center"
                >
                  <i className="ri-eye-line mr-2"></i>
                  Düğün Profilini Görüntüle
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
