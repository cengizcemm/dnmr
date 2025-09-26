'use client';

import { useState } from 'react';

export default function SystemSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [autoApproval, setAutoApproval] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Sistem Ayarları</h2>
        <p className="text-gray-600">Platform ayarlarını yönetin ve konfigüre edin</p>
      </div>

      {/* General Settings */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Genel Ayarlar</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Email Bildirimleri</h4>
              <p className="text-sm text-gray-600">Yeni kayıtlar ve önemli olaylar için email gönder</p>
            </div>
            <button
              onClick={() => setEmailNotifications(!emailNotifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                emailNotifications ? 'bg-rose-500' : 'bg-gray-300'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                emailNotifications ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Otomatik Onay</h4>
              <p className="text-sm text-gray-600">Yeni mekan kayıtlarını otomatik olarak onayla</p>
            </div>
            <button
              onClick={() => setAutoApproval(!autoApproval)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                autoApproval ? 'bg-rose-500' : 'bg-gray-300'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                autoApproval ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Bakım Modu</h4>
              <p className="text-sm text-gray-600">Sistemi geçici olarak kullanıma kapat</p>
            </div>
            <button
              onClick={() => setMaintenanceMode(!maintenanceMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                maintenanceMode ? 'bg-red-500' : 'bg-gray-300'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                maintenanceMode ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* Upload Settings */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Upload Ayarları</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maksimum Dosya Boyutu (MB)
            </label>
            <input
              type="number"
              defaultValue={10}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Günlük Upload Limiti
            </label>
            <input
              type="number"
              defaultValue={100}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              İzin Verilen Formatlar
            </label>
            <input
              type="text"
              defaultValue="jpg, jpeg, png, mp4, mov"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Video Uzunluğu Limiti (saniye)
            </label>
            <input
              type="number"
              defaultValue={300}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Payment Settings */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Ödeme Ayarları</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mekan Komisyon Oranı (%)
            </label>
            <input
              type="number"
              defaultValue={15}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Ödeme Tutarı (₺)
            </label>
            <input
              type="number"
              defaultValue={100}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Güvenlik Ayarları</h3>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Şifre Minimum Uzunluğu
              </label>
              <input
                type="number"
                defaultValue={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Oturum Süresi (dakika)
              </label>
              <input
                type="number"
                defaultValue={120}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex gap-4 pt-4">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer">
              <i className="ri-download-line mr-2"></i>
              Sistem Yedeği Al
            </button>
            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer">
              <i className="ri-refresh-line mr-2"></i>
              Cache Temizle
            </button>
          </div>
        </div>
      </div>

      {/* Save Settings */}
      <div className="flex justify-end">
        <button className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer">
          <i className="ri-save-line mr-2"></i>
          Ayarları Kaydet
        </button>
      </div>
    </div>
  );
}