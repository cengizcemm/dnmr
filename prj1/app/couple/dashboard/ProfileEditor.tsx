
'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

export default function ProfileEditor() {
  const [profileData, setProfileData] = useState({
    coupleNames: 'Sarah & Michael',
    weddingDate: '2024-06-15',
    weddingTime: '16:00',
    venue: 'Grand Rose Garden',
    address: '123 Garden Street, Rose City, RC 12345',
    description: 'Ailemiz ve sevdiklerimizle birlikte hayatımızın en güzel gününü paylaşmak istiyoruz.',
    story: 'Beş yıl önce üniversitede tanıştık ve o günden bu yana birlikte güzel bir hikaye yazıyoruz. İlk buluşmamızda Michael çok utangaçtı, ama gülümsemesi beni büyüledi. Zaman geçtikçe en iyi arkadaşlar olduk ve sonra aşık olduk. Geçen yıl Paris\'te bana evlenme teklif etti, tabii ki evet dedim!',
    coverImage: 'https://readdy.ai/api/search-image?query=Romantic%20wedding%20couple%20portrait%2C%20elegant%20bride%20and%20groom%2C%20beautiful%20wedding%20photography%2C%20love%20story%2C%20dreamy%20background%2C%20wedding%20celebration&width=1200&height=600&seq=wedding-cover-edit-1&orientation=landscape',
    fontFamily: 'Pacifico',
    theme: 'rose',
    photos: [
      'https://readdy.ai/api/search-image?query=Wedding%20couple%20romantic%20engagement%20photo%2C%20beautiful%20bride%20and%20groom%20portrait%2C%20love%20and%20happiness%2C%20outdoor%20setting&width=300&height=400&seq=couple-edit-1&orientation=portrait',
      'https://readdy.ai/api/search-image?query=Wedding%20couple%20casual%20photo%2C%20engaged%20couple%20lifestyle%20portrait%2C%20natural%20happiness%2C%20romantic%20moment&width=300&height=400&seq=couple-edit-2&orientation=portrait',
      'https://readdy.ai/api/search-image?query=Wedding%20couple%20formal%20portrait%2C%20elegant%20bride%20and%20groom%2C%20classic%20wedding%20photography%2C%20romantic%20pose&width=300&height=400&seq=couple-edit-3&orientation=portrait',
      'https://readdy.ai/api/search-image?query=Wedding%20couple%20fun%20photo%2C%20laughing%20bride%20and%20groom%2C%20joyful%20wedding%20moments%2C%20candid%20photography&width=300&height=400&seq=couple-edit-4&orientation=portrait',
      'https://readdy.ai/api/search-image?query=Wedding%20couple%20sunset%20photo%2C%20romantic%20golden%20hour%20portrait%2C%20dreamy%20wedding%20photography%2C%20intimate%20moment&width=300&height=400&seq=couple-edit-5&orientation=portrait',
      'https://readdy.ai/api/search-image?query=Wedding%20couple%20dancing%20photo%2C%20romantic%20dance%20moment%2C%20wedding%20celebration%2C%20love%20and%20joy&width=300&height=400&seq=couple-edit-6&orientation=portrait'
    ],
    details: {
      brideAge: 28,
      groomAge: 30,
      relationshipDuration: '5 yıl',
      weddingTheme: 'Bahçe Romantizmi',
      guestCount: 120,
      honeymoon: 'İtalya'
    },
    privacy: {
      profileVisibility: 'public',
      showContactInfo: true,
      allowGuestInteraction: true,
      showOnlineStatus: false,
      allowMessages: true,
      photoCommenting: true,
      guestUploads: true
    }
  });

  const [activeSection, setActiveSection] = useState('preview');
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string>('');
  const [showFullStory, setShowFullStory] = useState(false);
  const coverImageRef = useRef<HTMLInputElement>(null);

  const fontOptions = [
    { name: 'Pacifico', label: 'Pacifico (Romantik)', preview: 'Sarah & Michael' },
    { name: 'Dancing Script', label: 'Dancing Script (Zarif)', preview: 'Sarah & Michael' },
    { name: 'Great Vibes', label: 'Great Vibes (Klasik)', preview: 'Sarah & Michael' },
    { name: 'Satisfy', label: 'Satisfy (Modern)', preview: 'Sarah & Michael' },
    { name: 'Kaushan Script', label: 'Kaushan Script (Güçlü)', preview: 'Sarah & Michael' }
  ];

  const themeOptions = [
    { id: 'rose', name: 'Gül Teması', primary: 'bg-rose-500', secondary: 'bg-rose-100' },
    { id: 'purple', name: 'Mor Teması', primary: 'bg-purple-500', secondary: 'bg-purple-100' },
    { id: 'blue', name: 'Mavi Teması', primary: 'bg-blue-500', secondary: 'bg-blue-100' },
    { id: 'emerald', name: 'Yeşil Teması', primary: 'bg-emerald-500', secondary: 'bg-emerald-100' },
    { id: 'amber', name: 'Altın Teması', primary: 'bg-amber-500', secondary: 'bg-amber-100' }
  ];

  const backgroundTemplates = [
    {
      id: 1,
      name: 'Romantik Gül Bahçesi',
      url: 'https://readdy.ai/api/search-image?query=Romantic%20rose%20garden%20background%2C%20wedding%20venue%20with%20beautiful%20flowers%2C%20elegant%20outdoor%20setting%2C%20soft%20romantic%20lighting%2C%20dreamy%20atmosphere&width=1200&height=600&seq=template-bg-1&orientation=landscape'
    },
    {
      id: 2,
      name: 'Sahil Gün Batımı',
      url: 'https://readdy.ai/api/search-image?query=Beach%20sunset%20wedding%20background%2C%20golden%20hour%20beach%20scene%2C%20romantic%20ocean%20view%2C%20tropical%20wedding%20setting%2C%20warm%20sunset%20colors&width=1200&height=600&seq=template-bg-2&orientation=landscape'
    },
    {
      id: 3,
      name: 'Klasik Ballroom',
      url: 'https://readdy.ai/api/search-image?query=Elegant%20ballroom%20wedding%20background%2C%20luxury%20hotel%20venue%2C%20crystal%20chandeliers%2C%20classic%20wedding%20decoration%2C%20sophisticated%20interior&width=1200&height=600&seq=template-bg-3&orientation=landscape'
    },
    {
      id: 4,
      name: 'Doğal Orman',
      url: 'https://readdy.ai/api/search-image?query=Forest%20wedding%20background%2C%20natural%20woodland%20setting%2C%20trees%20and%20greenery%2C%20outdoor%20wedding%20venue%2C%20rustic%20natural%20atmosphere&width=1200&height=600&seq=template-bg-4&orientation=landscape'
    },
    {
      id: 5,
      name: 'Şehir Manzarası',
      url: 'https://readdy.ai/api/search-image?query=City%20skyline%20wedding%20background%2C%20urban%20wedding%20venue%2C%20rooftop%20terrace%2C%20modern%20city%20view%2C%20contemporary%20wedding%20setting&width=1200&height=600&seq=template-bg-5&orientation=landscape'
    },
    {
      id: 6,
      name: 'Lavantalık',
      url: 'https://readdy.ai/api/search-image?query=Lavender%20field%20wedding%20background%2C%20purple%20flower%20field%2C%20provence%20style%20wedding%2C%20romantic%20countryside%2C%20aromatic%20flowers&width=1200&height=600&seq=template-bg-6&orientation=landscape'
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePrivacyChange = (field: string, value: any) => {
    setProfileData(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    alert('Profil bilgileriniz başarıyla güncellendi!');
  };

  const handleCoverImageSelect = () => {
    coverImageRef.current?.click();
  };

  const handleCoverImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prev => ({
          ...prev,
          coverImage: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const selectBackgroundTemplate = (template: any) => {
    setProfileData(prev => ({
      ...prev,
      coverImage: template.url
    }));
    setShowTemplateModal(false);
  };

  const openPhotoModal = (photo: string) => {
    setSelectedPhoto(photo);
    setShowPhotoModal(true);
  };

  const closePhotoModal = () => {
    setShowPhotoModal(false);
    setSelectedPhoto('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100">
      {/* Header - Guest profil sayfası stilinde */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 md:space-x-4">
              <div>
                <h1 className="text-lg md:text-xl font-['Pacifico'] text-rose-800">Profil Düzenle</h1>
                <p className="text-xs md:text-sm text-gray-600">Düğün profilinizi özelleştirin</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 md:space-x-3">
              <Link
                href="/w/WEDDING-2024-SARAH-MICHAEL/profile/couple"
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 md:px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer flex items-center text-xs md:text-sm min-h-[44px]"
              >
                <i className="ri-external-link-line mr-1 md:mr-2"></i>
                <span className="hidden sm:inline">Tam Sayfa </span>Görünüm
              </Link>
              <button
                onClick={handleSave}
                className="bg-rose-500 hover:bg-rose-600 text-white px-3 md:px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer flex items-center text-xs md:text-sm min-h-[44px]"
              >
                <i className="ri-save-line mr-1 md:mr-2"></i>
                Kaydet
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex border-b overflow-x-auto">
            {[
              { id: 'preview', label: 'Profil Önizleme', icon: 'ri-eye-line' },
              { id: 'basic', label: 'Temel Bilgiler', icon: 'ri-information-line' },
              { id: 'design', label: 'Tasarım & Tema', icon: 'ri-palette-line' },
              { id: 'content', label: 'İçerik & Hikaye', icon: 'ri-article-line' },
              { id: 'background', label: 'Arkaplan & Şablon', icon: 'ri-landscape-line' },
              { id: 'privacy', label: 'Gizlilik Ayarları', icon: 'ri-shield-user-line' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`flex-shrink-0 py-4 px-6 text-center border-r last:border-r-0 font-medium transition-colors cursor-pointer whitespace-nowrap min-h-[44px] ${
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
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-8">
        {/* Profil Önizleme - Guest profil sayfası stilinde */}
        {activeSection === 'preview' && (
          <div className="space-y-6 md:space-y-8">
            {/* Hero Bölümü */}
            <div className="relative h-60 md:h-80 rounded-xl overflow-hidden shadow-lg">
              <img
                src={profileData.coverImage}
                alt={profileData.coupleNames}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 text-white">
                <h1 className="text-2xl md:text-4xl font-['Pacifico'] mb-1 md:mb-2" style={{ fontFamily: profileData.fontFamily }}>
                  {profileData.coupleNames}
                </h1>
                <div className="flex flex-col md:flex-row md:items-center md:space-x-6 text-sm md:text-lg">
                  <div className="flex items-center mb-1 md:mb-0">
                    <i className="ri-calendar-line mr-2"></i>
                    {new Date(profileData.weddingDate).toLocaleDateString('tr-TR')}
                  </div>
                  <div className="flex items-center mb-1 md:mb-0">
                    <i className="ri-time-line mr-2"></i>
                    {profileData.weddingTime}
                  </div>
                  <div className="flex items-center">
                    <i className="ri-map-pin-line mr-2"></i>
                    {profileData.venue}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
              {/* Ana İçerik */}
              <div className="lg:col-span-2 space-y-6 md:space-y-8">
                {/* Hikaye Bölümü */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                    <i className="ri-heart-fill text-rose-500 mr-3"></i>
                    Aşk Hikayemiz
                  </h2>
                  
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                      {showFullStory ? profileData.story : `${profileData.story.substring(0, 200)}...`}
                    </p>
                    
                    {profileData.story.length > 200 && (
                      <button
                        onClick={() => setShowFullStory(!showFullStory)}
                        className="text-rose-600 hover:text-rose-700 font-medium mt-3 cursor-pointer text-sm md:text-base"
                      >
                        {showFullStory ? 'Daha Az Göster' : 'Devamını Oku'}
                      </button>
                    )}
                  </div>
                </div>

                {/* Fotoğraf Galerisi */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-900 flex items-center">
                      <i className="ri-image-fill text-purple-500 mr-3"></i>
                      Fotoğraflarımız
                    </h2>
                    <span className="text-sm text-gray-500">{profileData.photos.length} fotoğraf</span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                    {profileData.photos.slice(0, 6).map((photo, index) => (
                      <div
                        key={index}
                        onClick={() => openPhotoModal(photo)}
                        className="aspect-square rounded-lg overflow-hidden cursor-pointer group"
                      >
                        <img
                          src={photo}
                          alt={`${profileData.coupleNames} ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mesaj Gönder */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                    <i className="ri-message-fill text-blue-500 mr-3"></i>
                    Tebrik Mesajı Gönder
                  </h2>
                  
                  <div className="space-y-4">
                    <textarea
                      placeholder="Tebrik mesajınızı yazın..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none text-sm md:text-base"
                    ></textarea>
                    
                    <div className="flex justify-end">
                      <button className="bg-rose-500 hover:bg-rose-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium transition-colors cursor-pointer flex items-center text-sm md:text-base min-h-[44px]">
                        <i className="ri-send-plane-line mr-2"></i>
                        Mesaj Gönder
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Yan Panel */}
              <div className="space-y-6">
                {/* Düğün Detayları */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Düğün Detayları</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center mr-3">
                        <i className="ri-calendar-line text-rose-600"></i>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm md:text-base">Tarih</p>
                        <p className="text-xs md:text-sm text-gray-600">{new Date(profileData.weddingDate).toLocaleDateString('tr-TR')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <i className="ri-time-line text-blue-600"></i>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm md:text-base">Saat</p>
                        <p className="text-xs md:text-sm text-gray-600">{profileData.weddingTime}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <i className="ri-map-pin-line text-green-600"></i>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm md:text-base">Mekan</p>
                        <p className="text-xs md:text-sm text-gray-600">{profileData.venue}</p>
                        <p className="text-xs text-gray-500">{profileData.address}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                        <i className="ri-group-line text-purple-600"></i>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm md:text-base">Misafir Sayısı</p>
                        <p className="text-xs md:text-sm text-gray-600">{profileData.details.guestCount} kişi</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Çift Hakkında */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Çift Hakkında</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900 text-sm md:text-base">İlişki Süresi</span>
                        <span className="text-xs md:text-sm text-gray-600">{profileData.details.relationshipDuration}</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">  
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900 text-sm md:text-base">Düğün Teması</span>
                        <span className="text-xs md:text-sm text-gray-600">{profileData.details.weddingTheme}</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900 text-sm md:text-base">Balayı</span>
                        <span className="text-xs md:text-sm text-gray-600">{profileData.details.honeymoon}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hızlı İşlemler */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Hızlı İşlemler</h3>
                  
                  <div className="space-y-3">
                    <button className="w-full bg-rose-50 hover:bg-rose-100 text-rose-600 py-2 md:py-3 px-4 rounded-lg font-medium transition-colors cursor-pointer flex items-center justify-center text-sm md:text-base min-h-[44px]">
                      <i className="ri-gift-line mr-2"></i>
                      Hediye Gönder
                    </button>
                    
                    <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 md:py-3 px-4 rounded-lg font-medium transition-colors cursor-pointer flex items-center justify-center text-sm md:text-base min-h-[44px]">
                      <i className="ri-phone-line mr-2"></i>
                      İletişim
                    </button>
                    
                    <button className="w-full bg-green-50 hover:bg-green-100 text-green-600 py-2 md:py-3 px-4 rounded-lg font-medium transition-colors cursor-pointer flex items-center justify-center text-sm md:text-base min-h-[44px]">
                      <i className="ri-calendar-check-line mr-2"></i>
                      Takvime Ekle
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Diğer sekmeler için içerik - Guest profil sayfası stilinde */}
        {activeSection !== 'preview' && (
          <div className="bg-white rounded-xl shadow-sm border p-6">
            {/* Temel Bilgiler */}
            {activeSection === 'basic' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Çift İsimleri *
                    </label>
                    <input
                      type="text"
                      value={profileData.coupleNames}
                      onChange={(e) => handleInputChange('coupleNames', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent min-h-[44px]"
                      placeholder="Sarah & Michael"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Düğün Tarihi *
                    </label>
                    <input
                      type="date"
                      value={profileData.weddingDate}
                      onChange={(e) => handleInputChange('weddingDate', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent min-h-[44px]"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Saat *
                    </label>
                    <input
                      type="time"
                      value={profileData.weddingTime}
                      onChange={(e) => handleInputChange('weddingTime', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent min-h-[44px]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mekan Adı *
                    </label>
                    <input
                      type="text"
                      value={profileData.venue}
                      onChange={(e) => handleInputChange('venue', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent min_h-[44px]"
                      placeholder="Grand Rose Garden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mekan Adresi
                  </label>
                  <input
                    type="text"
                    value={profileData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent min_h-[44px]"
                    placeholder="123 Garden Street, Rose City, RC 12345"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kısa Açıklama
                  </label>
                  <textarea
                    value={profileData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={3}
                    maxLength={200}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none"
                    placeholder="Düğün hakkında kısa bir açıklama..."
                  ></textarea>
                  <p className="text-xs text-gray-500 mt-1">{profileData.description.length}/200 karakter</p>
                </div>

                {/* Çift Detayları */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Çift Detayları</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        İlişki Süresi
                      </label>
                      <input
                        type="text"
                        value={profileData.details.relationshipDuration}
                        onChange={(e) => setProfileData(prev => ({
                          ...prev,
                          details: { ...prev.details, relationshipDuration: e.target.value }
                        }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent min_h-[44px]"
                        placeholder="5 yıl"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Düğün Teması
                      </label>
                      <input
                        type="text"
                        value={profileData.details.weddingTheme}
                        onChange={(e) => setProfileData(prev => ({
                          ...prev,
                          details: { ...prev.details, weddingTheme: e.target.value }
                        }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent min_h-[44px]"
                        placeholder="Bahçe Romantizmi"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Misafir Sayısı
                      </label>
                      <input
                        type="number"
                        value={profileData.details.guestCount}
                        onChange={(e) => setProfileData(prev => ({
                          ...prev,
                          details: { ...prev.details, guestCount: parseInt(e.target.value) || 0 }
                        }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent min_h-[44px]"
                        placeholder="120"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Balayı Lokasyonu
                      </label>
                      <input
                        type="text"
                        value={profileData.details.honeymoon}
                        onChange={(e) => setProfileData(prev => ({
                          ...prev,
                          details: { ...prev.details, honeymoon: e.target.value }
                        }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent min_h-[44px]"
                        placeholder="İtalya"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* İçerik & Hikaye */}
            {activeSection === 'content' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Aşk Hikayeniz
                  </label>
                  <textarea
                    value={profileData.story}
                    onChange={(e) => handleInputChange('story', e.target.value)}
                    rows={6}
                    maxLength={1000}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none"
                    placeholder="Nasıl tanıştınız? Aşk hikayenizi misafirlerinizle paylaşın..."
                  ></textarea>
                  <p className="text-xs text-gray-500 mt-1">{profileData.story.length}/1000 karakter</p>
                </div>

                <div className="bg-blue-50 rounded-lg p-6">
                  <div className="flex items-start">
                    <i className="ri-lightbulb-line text-blue-600 text-xl mr-3 mt-1"></i>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">İpucu</h4>
                      <p className="text-blue-800 text-sm">
                        Hikayenizi samimi ve duygusal bir şekilde anlatın. Nasıl tanıştığınız, 
                        ilk buluşmanız, evlilik teklifiniz gibi özel anları paylaşabilirsiniz.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Diğer sekmeler için placeholder içerik */}
            {(activeSection === 'design' || activeSection === 'background' || activeSection === 'privacy') && (
              <div className="text-center py-12">
                <i className="ri-settings-line text-4xl text-gray-400 mb-4"></i>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Bu Bölüm Geliştiriliyor</h3>
                <p className="text-gray-600">Bu özellik yakında kullanıma sunulacak.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Fotoğraf Modal */}
      {showPhotoModal && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50">
          <div className="relative max-w-4xl max-h-[90vh]">
            <button
              onClick={closePhotoModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 cursor-pointer"
            >
              <i className="ri-close-line text-2xl"></i>
            </button>
            
            <img
              src={selectedPhoto}
              alt={profileData.coupleNames}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
