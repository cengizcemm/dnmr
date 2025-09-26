
'use client';

import { useState } from 'react';

export default function VenueProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [profileImage, setProfileImage] = useState('');
  const [formData, setFormData] = useState({
    name: 'Grand Palace Hotel',
    description: 'Lüks düğün organizasyonları için mükemmel mekan. Geniş balo salonları, profesyonel servis ekibi ve unutulmaz anılar için ideal atmosfer.',
    address: 'Nişantaşı Mahallesi, Teşvikiye Cad. No: 123, Şişli/İstanbul',
    phone: '+90 212 555 0123',
    email: 'info@grandpalace.com',
    website: 'www.grandpalace.com',
    instagram: '@grandpalacehotel',
    facebook: 'GrandPalaceHotel',
    twitter: '@grandpalace',
    capacity: '500',
    price: '15000',
    features: ['Geniş balo salonu', 'Profesyonel ses sistemi', 'LED aydınlatma', 'Bahçe alanı', 'Otopark']
  });

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Mekan adı zorunludur';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email adresi zorunludur';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Geçerli bir email adresi giriniz';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefon numarası zorunludur';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Adres zorunludur';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Açıklama zorunludur';
    }

    if (!formData.capacity || parseInt(formData.capacity) <= 0) {
      newErrors.capacity = 'Geçerli bir kapasite giriniz';
    }

    if (!formData.price || parseInt(formData.price) <= 0) {
      newErrors.price = 'Geçerli bir fiyat giriniz';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      setIsEditing(false);
      // Save logic here
      console.log('Saved:', formData);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addFeature = () => {
    const newFeature = prompt('Yeni özellik giriniz:');
    if (newFeature && newFeature.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, newFeature.trim()]
      });
    }
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({...formData, features: newFeatures});
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Mekan Profili</h2>
        <div className="flex space-x-3">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer"
              >
                <i className="ri-close-line mr-2"></i>
                İptal
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer"
              >
                <i className="ri-save-line mr-2"></i>
                Kaydet
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-edit-line mr-2"></i>
              Düzenle
            </button>
          )}
        </div>
      </div>

      {/* Profile Logo/Image */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Profil Fotoğrafı/Logo</h3>
        <div className="flex items-center space-x-6">
          <div className="relative">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-32 h-32 rounded-lg object-cover"
              />
            ) : (
              <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                <i className="ri-image-line text-3xl text-gray-400"></i>
              </div>
            )}
            {isEditing && (
              <label className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center cursor-pointer opacity-0 hover:opacity-100 transition-opacity">
                <i className="ri-camera-line text-white text-2xl"></i>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
          {isEditing && (
            <div>
              <p className="text-sm text-gray-600 mb-2">
                Logo veya mekan fotoğrafı yükleyiniz
              </p>
              <p className="text-xs text-gray-500">
                Desteklenen formatlar: JPG, PNG, GIF (Max: 5MB)
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Profile Image Gallery */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Mekan Görselleri</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="relative group">
              <img
                src={`https://readdy.ai/api/search-image?query=Luxury%20wedding%20venue%20interior%2C%20elegant%20ballroom%2C%20crystal%20chandeliers%2C%20romantic%20lighting%2C%20wedding%20reception%20setup%20with%20beautiful%20decorations&width=300&height=200&seq=venue-${index}&orientation=landscape`}
                alt={`Venue ${index}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              {isEditing && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-white hover:text-gray-300 cursor-pointer mr-2">
                    <i className="ri-edit-line text-xl"></i>
                  </button>
                  <button className="text-white hover:text-red-300 cursor-pointer">
                    <i className="ri-delete-bin-line text-xl"></i>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        {isEditing && (
          <button className="mt-4 border-2 border-dashed border-gray-300 rounded-lg p-8 w-full hover:border-blue-400 transition-colors cursor-pointer">
            <i className="ri-add-line text-2xl text-gray-400 mb-2"></i>
            <p className="text-gray-600">Yeni Görsel Ekle</p>
          </button>
        )}
      </div>

      {/* Basic Information */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Temel Bilgiler</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mekan Adı <span className="text-red-500">*</span>
            </label>
            {isEditing ? (
              <div>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>
            ) : (
              <p className="text-gray-900">{formData.name}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Telefon <span className="text-red-500">*</span>
            </label>
            {isEditing ? (
              <div>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.phone ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>
            ) : (
              <p className="text-gray-900">{formData.phone}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            {isEditing ? (
              <div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
            ) : (
              <p className="text-gray-900">{formData.email}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Website
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.website}
                onChange={(e) => setFormData({...formData, website: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-900">{formData.website}</p>
            )}
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Adres <span className="text-red-500">*</span>
          </label>
          {isEditing ? (
            <div>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                rows={3}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.address ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.address && (
                <p className="text-red-500 text-xs mt-1">{errors.address}</p>
              )}
            </div>
          ) : (
            <p className="text-gray-900">{formData.address}</p>
          )}
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Açıklama <span className="text-red-500">*</span>
          </label>
          {isEditing ? (
            <div>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={4}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.description ? 'border-red-300' : 'border-gray-300'
                }`}
                maxLength={500}
              />
              <div className="flex justify-between mt-1">
                {errors.description && (
                  <p className="text-red-500 text-xs">{errors.description}</p>
                )}
                <p className="text-gray-500 text-xs">
                  {formData.description.length}/500
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-900">{formData.description}</p>
          )}
        </div>
      </div>

      {/* Contact & Social Media */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Sosyal Medya</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <i className="ri-instagram-line mr-2"></i>Instagram
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.instagram}
                onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="@kullaniciadi"
              />
            ) : (
              <p className="text-gray-900">{formData.instagram || 'Belirtilmemiş'}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <i className="ri-facebook-line mr-2"></i>Facebook
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.facebook}
                onChange={(e) => setFormData({...formData, facebook: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Sayfa adı"
              />
            ) : (
              <p className="text-gray-900">{formData.facebook || 'Belirtilmemiş'}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <i className="ri-twitter-line mr-2"></i>Twitter
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.twitter}
                onChange={(e) => setFormData({...formData, twitter: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="@kullaniciadi"
              />
            ) : (
              <p className="text-gray-900">{formData.twitter || 'Belirtilmemiş'}</p>
            )}
          </div>
        </div>
      </div>

      {/* Capacity & Pricing */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Kapasite ve Fiyatlandırma</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maksimum Kapasite <span className="text-red-500">*</span>
            </label>
            {isEditing ? (
              <div>
                <input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.capacity ? 'border-red-300' : 'border-gray-300'
                  }`}
                  min="1"
                />
                {errors.capacity && (
                  <p className="text-red-500 text-xs mt-1">{errors.capacity}</p>
                )}
              </div>
            ) : (
              <p className="text-gray-900">{formData.capacity} kişi</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Başlangıç Fiyatı (₺) <span className="text-red-500">*</span>
            </label>
            {isEditing ? (
              <div>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.price ? 'border-red-300' : 'border-gray-300'
                  }`}
                  min="1"
                />
                {errors.price && (
                  <p className="text-red-500 text-xs mt-1">{errors.price}</p>
                )}
              </div>
            ) : (
              <p className="text-gray-900">₺{formData.price}</p>
            )}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Özellikler</h3>
        <div className="flex flex-wrap gap-2">
          {formData.features.map((feature, index) => (
            <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center">
              {feature}
              {isEditing && (
                <button 
                  onClick={() => removeFeature(index)}
                  className="ml-2 text-blue-500 hover:text-blue-700 cursor-pointer"
                >
                  <i className="ri-close-line text-xs"></i>
                </button>
              )}
            </span>
          ))}
          {isEditing && (
            <button 
              onClick={addFeature}
              className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm hover:bg-gray-200 cursor-pointer"
            >
              <i className="ri-add-line mr-1"></i>
              Özellik Ekle
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
