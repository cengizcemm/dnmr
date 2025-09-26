
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import QRScanner from '@/components/QRScanner';
import { useRouter } from 'next/navigation';

export default function ScanPage() {
  const [language, setLanguage] = useState('en');
  const [scannedCode, setScannedCode] = useState('');
  const [showScanner, setShowScanner] = useState(false);
  const router = useRouter();

  const translations = {
    en: {
      title: 'Scan Wedding QR Code',
      subtitle: 'Enter the wedding code or scan QR to view invitation',
      enterCode: 'Enter Wedding Code',
      scanQR: 'Scan QR Code',
      view: 'View Invitation',
      register: 'Register to Upload',
      alreadyRegistered: 'Already registered?',
      login: 'Login',
      guestAccess: 'Guest Access',
      placeholder: 'Enter wedding code...',
      stopScanning: 'Stop Scanning'
    },
    tr: {
      title: 'Düğün QR Kodu Tara',
      subtitle: 'Düğün kodunu girin veya davetiyeyi görüntülemek için QR tara',
      enterCode: 'Düğün Kodunu Gir',
      scanQR: 'QR Kod Tara',
      view: 'Davetiyeyi Görüntüle',
      register: 'Yükleme için Kayıt Ol',
      alreadyRegistered: 'Zaten kayıtlı mısınız?',
      login: 'Giriş Yap',
      guestAccess: 'Misafir Erişimi',
      placeholder: 'Düğün kodunu girin...',
      stopScanning: 'Taramayı Durdur'
    }
  };

  const t = translations[language as keyof typeof translations];

  const handleScan = () => {
    if (scannedCode.trim()) {
      router.push(`/invitation/${scannedCode.trim()}`);
    }
  };

  const handleQRResult = (result: string) => {
    setScannedCode(result);
    setShowScanner(false);
    // Use useEffect to handle navigation
    setTimeout(() => {
      router.push(`/invitation/${result}`);
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        {/* Language Selector */}
        <div className="flex justify-end mb-8">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${language === 'en' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('tr')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${language === 'tr' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
            >
              Türkçe
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-qr-code-line text-2xl text-rose-600"></i>
            </div>
            <h1 className="text-2xl font-['Pacifico'] text-rose-800 mb-2">{t.title}</h1>
            <p className="text-gray-600">{t.subtitle}</p>
          </div>

          {showScanner ? (
            <div className="space-y-4">
              <QRScanner onResult={handleQRResult} />
              <button
                onClick={() => setShowScanner(false)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer"
              >
                {t.stopScanning}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.enterCode}
                </label>
                <input
                  type="text"
                  value={scannedCode}
                  onChange={(e) => setScannedCode(e.target.value)}
                  placeholder={t.placeholder}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm text-center font-mono"
                />
              </div>

              <button
                onClick={handleScan}
                disabled={!scannedCode.trim()}
                className="w-full bg-rose-500 hover:bg-rose-600 disabled:bg-gray-300 text-white py-3 px-4 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer"
              >
                {t.view}
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>

              <button
                onClick={() => setShowScanner(true)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center whitespace-nowrap cursor-pointer"
              >
                <i className="ri-camera-line mr-2"></i>
                {t.scanQR}
              </button>

              <div className="text-center pt-4">
                <span className="text-gray-600 text-sm">{t.alreadyRegistered} </span>
                <Link href="/auth/login" className="text-rose-600 hover:text-rose-700 text-sm cursor-pointer">
                  {t.login}
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-rose-600 hover:text-rose-700 text-sm cursor-pointer">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
