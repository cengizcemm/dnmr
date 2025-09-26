
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface GuestHeaderProps {
  showBackButton?: boolean;
  backButtonText?: string;
  backButtonHref?: string;
}

export default function GuestHeader({ 
  showBackButton = false, 
  backButtonText = 'Ana Sayfaya Dön',
  backButtonHref = '/guest/dashboard'
}: GuestHeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [user, setUser] = useState({ name: '', email: '', avatar: null });
  const [loading, setLoading] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    // Simulate loading user data
    const loadUserData = async () => {
      // In a real app, this would fetch from your auth system
      const userData = {
        name: 'Ahmet Yılmaz',
        email: 'ahmet@email.com',
        avatar: null
      };
      setUser(userData);
      setLoading(false);
    };

    loadUserData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setShowMobileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Token ve cookie'leri temizle
    localStorage.clear();
    sessionStorage.clear();
    
    // Cookie'leri temizle
    document.cookie.split(";").forEach((c) => {
      const eqPos = c.indexOf("=");
      const name = eqPos > -1 ? c.substr(0, eqPos) : c;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    });

    // Giriş sayfasına yönlendir
    router.push('/auth/login');
  };

  const getInitials = (name: string) => {
    if (!name) return 'U';
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  if (loading) {
    return (
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="ml-3 w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Back Button */}
          <div className="flex items-center">
            {showBackButton ? (
              <Link href={backButtonHref} className="flex items-center space-x-3 text-rose-600 hover:text-rose-700 transition-colors">
                <i className="ri-arrow-left-line text-xl"></i>
                <span className="font-medium">{backButtonText}</span>
              </Link>
            ) : (
              <Link href="/guest/dashboard" className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center">
                  <i className="ri-heart-fill text-white"></i>
                </div>
                <span className="text-xl font-['Pacifico'] text-rose-700">WeddingMemories</span>
              </Link>
            )}
          </div>

          {/* Desktop Navigation */}
          {!showBackButton && (
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/guest/dashboard" className="text-gray-700 hover:text-rose-600 transition-colors cursor-pointer">
                Dashboard
              </Link>
              <Link href="/guest/invitations" className="text-gray-700 hover:text-rose-600 transition-colors cursor-pointer">
                Davetiyeler
              </Link>
              <Link href="/guest/gallery" className="text-gray-700 hover:text-rose-600 transition-colors cursor-pointer">
                Galeri
              </Link>
              <Link href="/guest/gifts" className="text-gray-700 hover:text-rose-600 transition-colors cursor-pointer">
                Hediyeler
              </Link>
            </nav>
          )}

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer min-h-[44px]"
              >
                <div className="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    getInitials(user.name)
                  )}
                </div>
                <span className="text-gray-700 font-medium">{user.name}</span>
                <i className={`ri-arrow-down-s-line text-gray-500 transition-transform ${showUserMenu ? 'rotate-180' : ''}`}></i>
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border py-2 z-50">
                  <div className="px-4 py-3 border-b">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  
                  <Link href="/guest/profile" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer min-h-[44px]">
                    <i className="ri-user-line mr-3 text-base"></i>
                    Profilim
                  </Link>
                  
                  <button className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer min-h-[44px]">
                    <i className="ri-settings-line mr-3 text-base"></i>
                    Ayarlar
                  </button>
                  
                  <hr className="my-2" />
                  
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer min-h-[44px]"
                  >
                    <i className="ri-logout-box-line mr-3 text-base"></i>
                    Çıkış Yap
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden" ref={mobileMenuRef}>
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <i className={`ri-${showMobileMenu ? 'close' : 'menu'}-line text-xl text-gray-700`}></i>
            </button>

            {/* Mobile Dropdown */}
            {showMobileMenu && (
              <div className="absolute right-4 top-16 w-64 bg-white rounded-lg shadow-lg border py-2 z-50">
                {/* User Info */}
                <div className="px-4 py-3 border-b">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center text-white font-medium">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        getInitials(user.name)
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </div>

                {/* Navigation Links - only if not showing back button */}
                {!showBackButton && (
                  <>
                    <Link href="/guest/dashboard" 
                          onClick={() => setShowMobileMenu(false)}
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer min-h-[44px]">
                      <i className="ri-dashboard-line mr-3 text-base"></i>
                      Dashboard
                    </Link>
                    
                    <Link href="/guest/invitations" 
                          onClick={() => setShowMobileMenu(false)}
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer min-h-[44px]">
                      <i className="ri-mail-line mr-3 text-base"></i>
                      Davetiyeler
                    </Link>
                    
                    <Link href="/guest/gallery" 
                          onClick={() => setShowMobileMenu(false)}
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer min-h-[44px]">
                      <i className="ri-gallery-line mr-3 text-base"></i>
                      Galeri
                    </Link>
                    
                    <Link href="/guest/gifts" 
                          onClick={() => setShowMobileMenu(false)}
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer min-h-[44px]">
                      <i className="ri-gift-line mr-3 text-base"></i>
                      Hediyeler
                    </Link>

                    <hr className="my-2" />
                  </>
                )}

                {/* Profile & Settings */}
                <Link href="/guest/profile" 
                      onClick={() => setShowMobileMenu(false)}
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer min-h-[44px]">
                  <i className="ri-user-line mr-3 text-base"></i>
                  Profilim
                </Link>
                
                <button 
                  onClick={() => setShowMobileMenu(false)}
                  className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer min-h-[44px]">
                  <i className="ri-settings-line mr-3 text-base"></i>
                  Ayarlar
                </button>

                <hr className="my-2" />

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer min-h-[44px]"
                >
                  <i className="ri-logout-box-line mr-3 text-base"></i>
                  Çıkış Yap
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
