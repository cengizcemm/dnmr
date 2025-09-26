'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function NotFound() {
  const [language, setLanguage] = useState('en');

  const translations = {
    en: {
      title: '404',
      subtitle: 'Page Not Found',
      description: 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.',
      home: 'Go to Homepage',
      login: 'Go to Login',
      scan: 'Scan QR Code'
    },
    tr: {
      title: '404',
      subtitle: 'Sayfa Bulunamadı',
      description: 'Aradığınız sayfa kaldırılmış, adı değiştirilmiş veya geçici olarak kullanım dışı olabilir.',
      home: 'Ana Sayfaya Git',
      login: 'Giriş Sayfasına Git',
      scan: 'QR Kod Tara'
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {/* Language Selector */}
        <div className="flex justify-end mb-8">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                language === 'en' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('tr')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                language === 'tr' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              Türkçe
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Logo */}
          <div className="mb-8">
            <span className="text-2xl font-['Pacifico'] text-rose-800">Wedding Moments</span>
          </div>

          {/* 404 Icon */}
          <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="ri-error-warning-line text-3xl text-rose-600"></i>
          </div>

          {/* Content */}
          <h1 className="text-6xl font-bold text-rose-800 mb-4">{t.title}</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t.subtitle}</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">{t.description}</p>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              href="/"
              className="w-full bg-rose-500 hover:bg-rose-600 text-white py-3 px-4 rounded-lg font-medium transition-colors inline-block whitespace-nowrap cursor-pointer"
            >
              <i className="ri-home-line mr-2"></i>
              {t.home}
            </Link>
            <Link
              href="/auth/login"
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium transition-colors inline-block whitespace-nowrap cursor-pointer"
            >
              <i className="ri-login-box-line mr-2"></i>
              {t.login}
            </Link>
            <Link
              href="/scan"
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium transition-colors inline-block whitespace-nowrap cursor-pointer"
            >
              <i className="ri-qr-code-line mr-2"></i>
              {t.scan}
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <a 
            href="https://readdy.ai/?origin=logo" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-rose-600 hover:text-rose-700 text-sm cursor-pointer"
          >
            Made with Readdy
          </a>
        </div>
      </div>
    </div>
  );
}