'use client';

import { useState } from 'react';

export default function ProfileSettings() {
  const [profileData, setProfileData] = useState({
    name: 'Emma Wilson',
    email: 'emma.wilson@email.com',
    phone: '+90 532 123 45 67',
    bio: 'Sarah ve Michael\'ın yakın arkadaşıyım. Onların mutluluğunu paylaşmaktan çok mutluyum!',
    avatar: 'https://readdy.ai/api/search-image?query=Happy%20young%20woman%20portrait%2C%20smiling%20female%20guest%2C%20wedding%20attendee%2C%20friendly%20face%2C%20professional%20headshot%2C%20warm%20smile&width=200&height=200&seq=guest-profile-1&orientation=squarish',
    notifications: {
      emailUpdates: true,
      smsReminders: false,
      newPhotos: true,
      voiceMessages: true,
      weddingUpdates: true
    },
    privacy: {
      showEmail: false,
      showPhone: false, 
      allowMessages: true,
      showInGuestList: true
    }
  });

  const [activeSection, setActiveSection] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setProfileData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: value
      }
    }));
  };

  const handlePrivacyChange = (field: string, value: boolean) => {
    setProfileData(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Kaydetme işlemi simülasyonu
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    
    // Başarı mesajı
    const successDiv = document.createElement('div');
    successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    successDiv.textContent = 'Profil ayarlarınız başarıyla güncellendi!';
    document.body.appendChild(successDiv);
    setTimeout(() => {
      document.body.removeChild(successDiv);
    }, 3000);
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prev => ({
          ...prev,
          avatar: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Profil Ayarları</h1>
        <p className="text-gray-600">Profil bilgilerinizi düzenleyin ve gizlilik ayarlarınızı yönetin</p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="flex border-b">
          {[
            { id: 'profile', label: 'Profil Bilgileri', icon: 'ri-user-line' },
            { id: 'notifications', label: 'Bildirimler', icon: 'ri-notification-line' },
            { id: 'privacy', label: 'Gizlilik', icon: 'ri-shield-user-line' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`flex-1 py-4 px-6 text-center border-r last:border-r-0 font-medium transition-colors cursor-pointer ${
                activeSection === tab.id
                  ? 'bg-rose-50 text-rose-600 border-b-2 border-rose-500'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <i className={`${tab.icon} mr-2`}></i>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Profil Bilgileri */}
          {activeSection === 'profile' && (
            <div className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <img
                    src={profileData.avatar}
                    alt="Profil Fotoğrafı"
                    className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                  />
                  <label className="absolute bottom-0 right-0 bg-rose-500 hover:bg-rose-600 text-white w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors">
                    <i className="ri-camera-line text-sm"></i>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Profil Fotoğrafı</h3>
                  <p className="text-gray-600 text-sm">JPG, PNG formatında, maksimum 5MB</p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ad Soyad *
                  </label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="Ad Soyad"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-posta Adresi *
                  </label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="ornek@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon Numarası
                  </label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="+90 5XX XXX XX XX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hakkımda
                </label>
                <textarea
                  value={profileData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={4}
                  maxLength={300}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none"
                  placeholder="Kendiniz hakkında kısa bir açıklama yazın..."
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">{profileData.bio.length}/300 karakter</p>
              </div>
            </div>
          )}

          {/* Bildirimler */}
          {activeSection === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Bildirim Tercihleri</h3>
                <p className="text-gray-600 mb-6">Hangi bildirimler almak istediğinizi seçin</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">E-posta Güncellemeleri</label>
                    <p className="text-sm text-gray-600">Düğün hakkındaki önemli güncellemeler</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profileData.notifications.emailUpdates}
                      onChange={(e) => handleNotificationChange('emailUpdates', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">SMS Hatırlatmaları</label>
                    <p className="text-sm text-gray-600">Düğün öncesi hatırlatma mesajları</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profileData.notifications.smsReminders}
                      onChange={(e) => handleNotificationChange('smsReminders', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Yeni Fotoğraf Bildirimleri</label>
                    <p className="text-sm text-gray-600">Yeni fotoğraf eklendiğinde bildirim al</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profileData.notifications.newPhotos}
                      onChange={(e) => handleNotificationChange('newPhotos', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Sesli Mesaj Bildirimleri</label>
                    <p className="text-sm text-gray-600">Yeni sesli mesaj geldiğinde bildirim al</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profileData.notifications.voiceMessages}
                      onChange={(e) => handleNotificationChange('voiceMessages', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Düğün Güncellemeleri</label>
                    <p className="text-sm text-gray-600">Tarih, saat, mekan değişiklikleri</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profileData.notifications.weddingUpdates}
                      onChange={(e) => handleNotificationChange('weddingUpdates', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
                  </label>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-start">
                  <i className="ri-information-line text-blue-600 text-lg mr-3 mt-0.5"></i>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">Bildirim Ayarları</h4>
                    <p className="text-blue-800 text-sm">
                      Bildirim ayarlarınızı istediğiniz zaman değiştirebilirsiniz. 
                      Önemli güncellemeleri kaçırmamak için e-posta bildirimlerini açık tutmanızı öneririz.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Gizlilik */}
          {activeSection === 'privacy' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Gizlilik Ayarları</h3>
                <p className="text-gray-600 mb-6">Profil bilgilerinizin görünürlüğünü kontrol edin</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">E-posta Adresimi Göster</label>
                    <p className="text-sm text-gray-600">Diğer misafirler e-posta adresinizi görebilir</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profileData.privacy.showEmail}
                      onChange={(e) => handlePrivacyChange('showEmail', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Telefon Numaramı Göster</label>
                    <p className="text-sm text-gray-600">Diğer misafirler telefon numaranızı görebilir</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profileData.privacy.showPhone}
                      onChange={(e) => handlePrivacyChange('showPhone', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Mesaj Almaya İzin Ver</label>
                    <p className="text-sm text-gray-600">Diğer misafirler size mesaj gönderebilir</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profileData.privacy.allowMessages}
                      onChange={(e) => handlePrivacyChange('allowMessages', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium text-gray-900">Misafir Listesinde Görün</label>
                    <p className="text-sm text-gray-600">Profiliniz genel misafir listesinde görünsün</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profileData.privacy.showInGuestList}
                      onChange={(e) => handlePrivacyChange('showInGuestList', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
                  </label>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-lg p-4">
                <div className="flex items-start">
                  <i className="ri-shield-check-line text-yellow-600 text-lg mr-3 mt-0.5"></i>
                  <div>
                    <h4 className="font-semibold text-yellow-900 mb-1">Gizlilik Politikası</h4>
                    <p className="text-yellow-800 text-sm">
                      Kişisel bilgileriniz güvende tutulur ve sadece seçtiğiniz ayarlara göre paylaşılır. 
                      Bu ayarları istediğiniz zaman değiştirebilirsiniz.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="border-t bg-gray-50 px-6 py-4 rounded-b-lg">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Değişiklikler otomatik olarak kaydedilir
            </p>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-rose-500 hover:bg-rose-600 disabled:bg-rose-300 text-white px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer flex items-center whitespace-nowrap"
            >
              {isSaving ? (
                <>
                  <i className="ri-loader-4-line mr-2 animate-spin"></i>
                  Kaydediliyor...
                </>
              ) : (
                <>
                  <i className="ri-save-line mr-2"></i>
                  Değişiklikleri Kaydet
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}