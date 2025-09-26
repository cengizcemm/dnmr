
'use client';

import { useState, useRef } from 'react';

export default function InvitationDesign() {
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [showBackgroundModal, setShowBackgroundModal] = useState(false);
  const backgroundImageRef = useRef<HTMLInputElement>(null);
  const [invitationData, setInvitationData] = useState({
    brideNames: 'Sarah Johnson',
    groomNames: 'Michael Davis',
    weddingDate: '15 Haziran 2024',
    weddingTime: '16:00',
    venue: 'Grand Palace Hotel',
    address: 'Beyoğlu, İstanbul',
    message: 'Hayatımızın en özel gününde yanımızda olmanızı dört gözle bekliyoruz.',
    backgroundImage: ''
  });

  const templates = [
    { id: 0, name: 'Klasik Romantik', preview: 'bg-rose-50 border-rose-200', accent: 'text-rose-800' },
    { id: 1, name: 'Modern Minimal', preview: 'bg-gray-50 border-gray-200', accent: 'text-gray-800' },
    { id: 2, name: 'Vintage Çiçekli', preview: 'bg-amber-50 border-amber-200', accent: 'text-amber-800' },
    { id: 3, name: 'Elegant Siyah', preview: 'bg-slate-900 border-slate-700 text-white', accent: 'text-white' }
  ];

  const backgroundTemplates = [
    {
      id: 1,
      name: 'Romantik Gül Bahçesi',
      url: 'https://readdy.ai/api/search-image?query=Romantic%20rose%20garden%20background%2C%20wedding%20invitation%20backdrop%2C%20beautiful%20flowers%2C%20elegant%20outdoor%20setting%2C%20soft%20romantic%20lighting%2C%20dreamy%20atmosphere&width=600&height=800&seq=invitation-bg-1&orientation=portrait'
    },
    {
      id: 2,
      name: 'Sahil Gün Batımı',
      url: 'https://readdy.ai/api/search-image?query=Beach%20sunset%20wedding%20background%2C%20golden%20hour%20beach%20scene%2C%20romantic%20ocean%20view%2C%20tropical%20wedding%20setting%2C%20warm%20sunset%20colors%2C%20invitation%20backdrop&width=600&height=800&seq=invitation-bg-2&orientation=portrait'
    },
    {
      id: 3,
      name: 'Klasik Ballroom',
      url: 'https://readdy.ai/api/search-image?query=Elegant%20ballroom%20wedding%20background%2C%20luxury%20hotel%20venue%2C%20crystal%20chandeliers%2C%20classic%20wedding%20decoration%2C%20sophisticated%20interior%2C%20invitation%20backdrop&width=600&height=800&seq=invitation-bg-3&orientation=portrait'
    },
    {
      id: 4,
      name: 'Doğal Orman',
      url: 'https://readdy.ai/api/search-image?query=Forest%20wedding%20background%2C%20natural%20woodland%20setting%2C%20trees%20and%20greenery%2C%20outdoor%20wedding%20venue%2C%20rustic%20natural%20atmosphere%2C%20invitation%20backdrop&width=600&height=800&seq=invitation-bg-4&orientation=portrait'
    },
    {
      id: 5,
      name: 'Lavantalık',
      url: 'https://readdy.ai/api/search-image?query=Lavender%20field%20wedding%20background%2C%20purple%20flower%20field%2C%20provence%20style%20wedding%2C%20romantic%20countryside%2C%20aromatic%20flowers%2C%20invitation%20backdrop&width=600&height=800&seq=invitation-bg-5&orientation=portrait'
    },
    {
      id: 6,
      name: 'Mermer Desen',
      url: 'https://readdy.ai/api/search-image?query=Marble%20texture%20wedding%20background%2C%20elegant%20white%20and%20gold%20marble%20pattern%2C%20luxury%20wedding%20invitation%20backdrop%2C%20sophisticated%20design%2C%20classic%20texture&width=600&height=800&seq=invitation-bg-6&orientation=portrait'
    }
  ];

  const handleBackgroundImageSelect = () => {
    backgroundImageRef.current?.click();
  };

  const handleBackgroundImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setInvitationData(prev => ({
          ...prev,
          backgroundImage: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const selectBackgroundTemplate = (template: any) => {
    setInvitationData(prev => ({
      ...prev,
      backgroundImage: template.url
    }));
    setShowBackgroundModal(false);
  };

  const getPreviewStyle = () => {
    if (invitationData.backgroundImage) {
      return {
        backgroundImage: `url(${invitationData.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    }
    return {};
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-2">Davetiye Tasarımı</h2>
        <p className="text-gray-600">Düğün davetiyenizi özelleştirin ve misafirlerinizle paylaşın</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Design Templates */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Şablon Seçin</h3>
          <div className="grid grid-cols-2 gap-4">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  selectedTemplate === template.id
                    ? 'border-rose-500 ring-2 ring-rose-200'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`${template.preview} p-4 rounded-lg mb-2 aspect-[3/4]`}>
                  <div className={`text-center ${template.accent}`}>
                    <div className="text-xs font-['Pacifico'] mb-1">Sarah & Michael</div>
                    <div className="text-xs">15 Haziran 2024</div>
                  </div>
                </div>
                <p className="text-sm font-medium">{template.name}</p>
              </button>
            ))}
          </div>

          {/* Arka Plan Seçenekleri */}
          <div className="mt-6 pt-6 border-t">
            <h4 className="text-md font-semibold mb-4">Arka Plan</h4>
            <div className="flex gap-3">
              <button
                onClick={() => setShowBackgroundModal(true)}
                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer flex items-center whitespace-nowrap"
              >
                <i className="ri-palette-line mr-2"></i>
                Şablon Seç
              </button>
              <button
                onClick={handleBackgroundImageSelect}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer flex items-center whitespace-nowrap"
              >
                <i className="ri-upload-line mr-2"></i>
                Yükle
              </button>
              {invitationData.backgroundImage && (
                <button
                  onClick={() => setInvitationData(prev => ({...prev, backgroundImage: ''}))}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer flex items-center whitespace-nowrap"
                >
                  <i className="ri-delete-bin-line mr-2"></i>
                  Temizle
                </button>
              )}
            </div>
            <input
              ref={backgroundImageRef}
              type="file"
              accept="image/*"
              onChange={handleBackgroundImageChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Preview */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Önizleme</h3>
          <div 
            className={`${invitationData.backgroundImage ? '' : templates[selectedTemplate].preview} p-8 rounded-lg aspect-[3/4] border-2 relative overflow-hidden`}
            style={getPreviewStyle()}
          >
            {invitationData.backgroundImage && (
              <div className="absolute inset-0 bg-black/20"></div>
            )}
            <div className={`text-center h-full flex flex-col justify-center relative z-10 ${
              invitationData.backgroundImage ? 'text-white' : templates[selectedTemplate].accent
            }`}>
              <div className="font-['Pacifico'] text-2xl mb-4">
                {invitationData.brideNames} & {invitationData.groomNames}
              </div>
              <div className="mb-4">
                <i className="ri-heart-fill text-rose-500 mx-2"></i>
              </div>
              <div className="text-sm mb-2">{invitationData.weddingDate}</div>
              <div className="text-sm mb-2">{invitationData.weddingTime}</div>
              <div className="text-sm mb-4">{invitationData.venue}</div>
              <div className="text-xs opacity-75 px-4">
                {invitationData.message}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Davetiye İçeriği</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gelin Adı
              </label>
              <input
                type="text"
                value={invitationData.brideNames}
                onChange={(e) => setInvitationData({...invitationData, brideNames: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Damat Adı
              </label>
              <input
                type="text"
                value={invitationData.groomNames}
                onChange={(e) => setInvitationData({...invitationData, groomNames: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Düğün Tarihi
              </label>
              <input
                type="text"
                value={invitationData.weddingDate}
                onChange={(e) => setInvitationData({...invitationData, weddingDate: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Saat
              </label>
              <input
                type="text"
                value={invitationData.weddingTime}
                onChange={(e) => setInvitationData({...invitationData, weddingTime: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mekan Adı
              </label>
              <input
                type="text"
                value={invitationData.venue}
                onChange={(e) => setInvitationData({...invitationData, venue: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Adres
              </label>
              <input
                type="text"
                value={invitationData.address}
                onChange={(e) => setInvitationData({...invitationData, address: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Özel Mesaj
              </label>
              <textarea
                value={invitationData.message}
                onChange={(e) => setInvitationData({...invitationData, message: e.target.value})}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                maxLength={500}
              />
              <p className="text-xs text-gray-500 mt-1">{invitationData.message.length}/500</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t">
          <button className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer">
            <i className="ri-save-line mr-2"></i>
            Değişiklikleri Kaydet
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer">
            <i className="ri-share-line mr-2"></i>
            Davetiyeyi Paylaş
          </button>
          <button className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer">
            <i className="ri-download-line mr-2"></i>
            PDF İndir
          </button>
        </div>
      </div>

      {/* Arka Plan Şablonları Modal */}
      {showBackgroundModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Arka Plan Şablonu Seçin</h3>
                <button
                  onClick={() => setShowBackgroundModal(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {backgroundTemplates.map((template) => (
                  <div
                    key={template.id}
                    onClick={() => selectBackgroundTemplate(template)}
                    className="group cursor-pointer"
                  >
                    <div className="relative overflow-hidden rounded-lg border-2 border-gray-200 group-hover:border-rose-400 transition-all">
                      <img
                        src={template.url}
                        alt={template.name}
                        className="w-full h-48 object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="absolute bottom-3 left-3 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="font-medium text-sm">{template.name}</p>
                      </div>
                    </div>
                    <p className="text-center text-sm font-medium text-gray-900 mt-3">{template.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
