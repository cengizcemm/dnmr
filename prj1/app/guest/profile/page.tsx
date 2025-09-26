'use client';

import { useState } from 'react';
import Link from 'next/link';
import GuestHeader from '../dashboard/GuestHeader';

export default function GuestProfile() {
  const [profileData, setProfileData] = useState({
    name: 'Ahmet Yılmaz',
    email: 'ahmet@email.com',
    phone: '+90 555 123 4567',
    avatar: null,
    dateOfBirth: '1990-05-15',
    address: 'İstanbul, Türkiye',
    occupation: 'Yazılım Mühendisi',
    bio: 'Düğün fotoğrafçılığı ve organizasyonla ilgileniyorum. Dostlarımın mutlu anlarında bulunmaktan keyif alırım.',
    socialMedia: {
      instagram: '@ahmetyilmaz',
      facebook: 'Ahmet Yılmaz',
      twitter: '@ahmet_y'
    },
    preferences: {
      emailNotifications: true,
      smsNotifications: false,
      weddingReminders: true,
      photoTagging: true,
      profileVisibility: 'friends',
      language: 'tr'
    }
  });

  const [activeTab, setActiveTab] = useState('personal');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSocialMediaChange = (platform: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value
      }
    }));
  };

  const handlePreferenceChange = (key: string, value: any) => {
    setProfileData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value
      }
    }));
  };

  const handleSave = () => {
    alert('Profil bilgileriniz başarıyla güncellendi!');
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    
    document.cookie.split(";").forEach((c) => {
      const eqPos = c.indexOf("=");
      const name = eqPos > -1 ? c.substr(0, eqPos) : c;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    });

    alert('Başarıyla çıkış yaptınız!');
    window.location.href = '/auth/login';
  };

  const handleDeleteAccount = () => {
    alert('Hesabınız silme işlemi başlatıldı. 30 gün içinde tekrar giriş yaparak bu işlemi iptal edebilirsiniz.');
    setShowDeleteConfirm(false);
  };

  const getInitials = (name: string) => {
    if (!name) return 'U';
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100">
      <GuestHeader showBackButton={true} backButtonText="Dashboard'a Dön" backButtonHref="/guest/dashboard" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-8">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-rose-500 text-2xl font-bold">
                {profileData.avatar ? (
                  <img src={profileData.avatar} alt={profileData.name} className="w-24 h-24 rounded-full object-cover" />
                ) : (
                  getInitials(profileData.name)
                )}
              </div>
              <div className="text-white">
                <h1 className="text-2xl font-bold">{profileData.name}</h1>
                <p className="opacity-90">{profileData.email}</p>
                <p className="opacity-75 text-sm">{profileData.occupation}</p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b">
            <div className="flex space-x-8 px-6">
              {[
                { id: 'personal', label: 'Kişisel Bilgiler', icon: 'ri-user-line' },
                { id: 'contact', label: 'İletişim', icon: 'ri-contacts-line' },
                { id: 'social', label: 'Sosyal Medya', icon: 'ri-share-line' },
                { id: 'preferences', label: 'Tercihler', icon: 'ri-settings-3-line' },
                { id: 'security', label: 'Güvenlik', icon: 'ri-shield-user-line' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors cursor-pointer ${
                    activeTab === tab.id
                      ? 'border-rose-500 text-rose-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <i className={`${tab.icon} mr-2`}></i>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Kişisel Bilgiler */}
            {activeTab === 'personal' && (
              <div className="space-y-6">
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
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Doğum Tarihi
                    </label>
                    <input
                      type="date"
                      value={profileData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meslek
                  </label>
                  <input
                    type="text"
                    value={profileData.occupation}
                    onChange={(e) => handleInputChange('occupation', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hakkımda
                  </label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows={4}
                    maxLength={500}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none"
                    placeholder="Kendiniz hakkında kısa bir açıklama yazın..."
                  ></textarea>
                  <p className="text-xs text-gray-500 mt-1">{profileData.bio.length}/500 karakter</p>
                </div>
              </div>
            )}

            {/* İletişim */}
            {activeTab === 'contact' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-posta *
                    </label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adres
                  </label>
                  <textarea
                    value={profileData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none"
                    placeholder="Adresinizi girin..."
                  ></textarea>
                </div>
              </div>
            )}

            {/* Sosyal Medya */}
            {activeTab === 'social' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <i className="ri-instagram-line mr-2 text-pink-500"></i>
                      Instagram
                    </label>
                    <input
                      type="text"
                      value={profileData.socialMedia.instagram}
                      onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      placeholder="@kullaniciadi"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <i className="ri-facebook-line mr-2 text-blue-600"></i>
                      Facebook
                    </label>
                    <input
                      type="text"
                      value={profileData.socialMedia.facebook}
                      onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      placeholder="Ad Soyad"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <i className="ri-twitter-line mr-2 text-blue-400"></i>
                    Twitter
                  </label>
                  <input
                    type="text"
                    value={profileData.socialMedia.twitter}
                    onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="@kullaniciadi"
                  />
                </div>
              </div>
            )}

            {/* Tercihler */}
            {activeTab === 'preferences' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Bildirim Tercihleri</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="font-medium text-gray-900">E-posta Bildirimleri</label>
                        <p className="text-sm text-gray-600">Düğün davetleri ve güncellemeler için e-posta alın</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={profileData.preferences.emailNotifications}
                          onChange={(e) => handlePreferenceChange('emailNotifications', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="font-medium text-gray-900">SMS Bildirimleri</label>
                        <p className="text-sm text-gray-600">Önemli güncellemeler için SMS alın</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={profileData.preferences.smsNotifications}
                          onChange={(e) => handlePreferenceChange('smsNotifications', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="font-medium text-gray-900">Düğün Hatırlatıcıları</label>
                        <p className="text-sm text-gray-600">Katılacağınız düğünler için hatırlatıcı alın</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={profileData.preferences.weddingReminders}
                          onChange={(e) => handlePreferenceChange('weddingReminders', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Gizlilik Ayarları</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Profil Görünürlüğü
                      </label>
                      <select
                        value={profileData.preferences.profileVisibility}
                        onChange={(e) => handlePreferenceChange('profileVisibility', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent pr-8"
                      >
                        <option value="public">Herkese Açık</option>
                        <option value="friends">Sadece Dostlar</option>
                        <option value="private">Özel</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="font-medium text-gray-900">Fotoğraf Etiketleme</label>
                        <p className="text-sm text-gray-600">Diğer kullanıcılar sizi fotoğraflarda etiketleyebilir</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={profileData.preferences.photoTagging}
                          onChange={(e) => handlePreferenceChange('photoTagging', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Dil ve Bölge</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Uygulama Dili
                    </label>
                    <select
                      value={profileData.preferences.language}
                      onChange={(e) => handlePreferenceChange('language', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent pr-8"
                    >
                      <option value="tr">Türkçe</option>
                      <option value="en">English</option>
                      <option value="de">Deutsch</option>
                      <option value="fr">Français</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Güvenlik */}
            {activeTab === 'security' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Şifre Değiştir</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mevcut Şifre
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                        placeholder="Mevcut şifrenizi girin"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Yeni Şifre
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                        placeholder="Yeni şifrenizi girin"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Yeni Şifre (Tekrar)
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                        placeholder="Yeni şifrenizi tekrar girin"
                      />
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer">
                      Şifreyi Güncelle
                    </button>
                  </div>
                </div>

                <div className="border-t pt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Oturum Yönetimi</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Mevcut Oturum</p>
                          <p className="text-sm text-gray-600">Bu cihaz • İstanbul, Türkiye</p>
                          <p className="text-xs text-gray-500">Son etkinlik: Az önce</p>
                        </div>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          Aktif
                        </span>
                      </div>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer"
                    >
                      Tüm Cihazlardan Çıkış Yap
                    </button>
                  </div>
                </div>

                <div className="border-t pt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 text-red-600">Tehlikeli Bölge</h3>
                  <div className="bg-red-50 rounded-lg p-6">
                    <div className="flex items-start">
                      <i className="ri-error-warning-line text-red-500 text-xl mr-3 mt-1"></i>
                      <div className="flex-1">
                        <h4 className="font-semibold text-red-900 mb-2">Hesabı Sil</h4>
                        <p className="text-red-800 text-sm mb-4">
                          Hesabınızı kalıcı olarak silmek istiyorsanız bu işlemi gerçekleştirebilirsiniz. 
                          Bu işlem geri alınamaz ve tüm verileriniz silinir.
                        </p>
                        <button 
                          onClick={() => setShowDeleteConfirm(true)}
                          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer"
                        >
                          Hesabı Sil
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="border-t pt-6 mt-8">
              <div className="flex justify-between">
                <Link
                  href="/guest/dashboard"
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer"
                >
                  İptal
                </Link>
                <button
                  onClick={handleSave}
                  className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-lg font-medium transition-colors cursor-pointer"
                >
                  Değişiklikleri Kaydet
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <i className="ri-error-warning-line text-red-500 text-2xl mr-3"></i>
                <h3 className="text-lg font-semibold text-gray-900">Hesabı Sil</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Hesabınızı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz ve 
                tüm verileriniz kalıcı olarak silinir.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-lg font-medium transition-colors cursor-pointer"
                >
                  İptal
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium transition-colors cursor-pointer"
                >
                  Hesabı Sil
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}