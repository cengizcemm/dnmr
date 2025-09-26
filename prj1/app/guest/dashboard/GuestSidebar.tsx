
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function GuestSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    {
      label: 'Ana Sayfa',
      icon: 'ri-dashboard-line',
      href: '/guest/dashboard',
      active: pathname === '/guest/dashboard'
    },
    {
      label: 'Davetiyelerim',
      icon: 'ri-mail-line',
      href: '/guest/invitations',
      active: pathname === '/guest/invitations'
    },
    {
      label: 'Fotoğraf Galerim',
      icon: 'ri-gallery-line',
      href: '/guest/gallery',
      active: pathname === '/guest/gallery'
    },
    {
      label: 'Profilim',
      icon: 'ri-user-line',
      href: '/guest/profile',
      active: pathname === '/guest/profile'
    }
  ];

  return (
    <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center">
                  <i className="ri-user-heart-line text-rose-600 text-lg"></i>
                </div>
                <div>
                  <h2 className="font-['Pacifico'] text-lg text-rose-800">Misafir</h2>
                  <p className="text-xs text-gray-600">Panel</p>
                </div>
              </div>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              <i className={`ri-menu-${isCollapsed ? 'unfold' : 'fold'}-line text-gray-600`}></i>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                item.active 
                  ? 'bg-rose-50 text-rose-700 border-r-2 border-rose-500' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <i className={`${item.icon} text-lg`}></i>
              </div>
              {!isCollapsed && (
                <span className="font-medium text-sm">{item.label}</span>
              )}
            </Link>
          ))}
        </nav>

        {/* Quick Actions */}
        {!isCollapsed && (
          <div className="p-4 border-t border-gray-200">
            <div className="space-y-3">
              <Link
                href="/scan"
                className="flex items-center space-x-3 px-3 py-2 bg-rose-50 text-rose-700 rounded-lg hover:bg-rose-100 transition-colors cursor-pointer"
              >
                <i className="ri-qr-scan-line"></i>
                <span className="text-sm font-medium">QR Kod Tara</span>
              </Link>
              
              <button className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer w-full">
                <i className="ri-customer-service-line"></i>
                <span className="text-sm">Yardım</span>
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          {!isCollapsed && (
            <div className="text-xs text-gray-500 text-center">
              <p>Wedding Moments</p>
              <p>Misafir Paneli v1.0</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
