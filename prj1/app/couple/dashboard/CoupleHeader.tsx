
'use client';

import { useState } from 'react';
import Link from 'next/link';

interface CoupleHeaderProps {
  onMenuClick: () => void;
}

export default function CoupleHeader({ onMenuClick }: CoupleHeaderProps) {
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
            <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-sm font-medium">
              Çift Paneli
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Profil Görüntüle Button */}
          <Link
            href="/w/WEDDING-2024-SARAH-MICHAEL/profile/couple"
            className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center"
          >
            <i className="ri-eye-line mr-2"></i>
            <span className="hidden md:inline">Profil Görüntüle</span>
            <span className="md:hidden">Profil</span>
          </Link>

          {/* Share Button */}
          <button className="text-gray-600 hover:text-gray-900 px-3 py-2 cursor-pointer">
            <i className="ri-share-line text-xl"></i>
          </button>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <img
                src="https://readdy.ai/api/search-image?query=Happy%20wedding%20couple%20portrait%2C%20bride%20and%20groom%20smiling%2C%20romantic%20engagement%20photo%2C%20love%20and%20happiness%2C%20wedding%20photography&width=100&height=100&seq=couple-avatar&orientation=squarish"
                alt="Couple"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="hidden md:block text-sm font-medium">Sarah & Michael</span>
              <i className="ri-arrow-down-s-line text-gray-400"></i>
            </button>
            
            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl">
                <div className="p-2">
                  <Link href="/couple/profile" className="block px-3 py-2 text-sm hover:bg-gray-50 rounded cursor-pointer">
                    Profil Ayarları
                  </Link>
                  <Link href="/couple/privacy" className="block px-3 py-2 text-sm hover:bg-gray-50 rounded cursor-pointer">
                    Gizlilik Ayarları
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
