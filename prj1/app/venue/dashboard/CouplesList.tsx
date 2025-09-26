'use client';

import { useState } from 'react';

export default function CouplesList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedCouples, setSelectedCouples] = useState<number[]>([]);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedCouple, setSelectedCouple] = useState<any>(null);
  const [messageText, setMessageText] = useState('');

  const couples = [
    {
      id: 1,
      names: 'Sarah Johnson & Michael Davis',
      email: 'sarah.michael@email.com',
      phone: '+90 532 555 0123',
      weddingDate: '2024-06-15',
      status: 'active',
      guestCount: 120,
      uploads: 245,
      lastActivity: '2 saat önce',
      venue: 'Ana Salon',
      budget: '₺85,000',
      notes: 'Çiçek süslemelerinde beyaz ve pembe renkleri tercih ediyorlar.',
      specialRequests: 'Vejeteryan menü seçenekleri, çocuk dostu aktiviteler'
    },
    {
      id: 2,
      names: 'Emma Wilson & James Brown',
      email: 'emma.james@email.com',
      phone: '+90 533 555 0456',
      weddingDate: '2024-07-20',
      status: 'planning',
      guestCount: 85,
      uploads: 12,
      lastActivity: '1 gün önce',
      venue: 'Bahçe Alanı',
      budget: '₺65,000',
      notes: 'Açık hava düğünü planlıyorlar.',
      specialRequests: 'Canlı müzik grubu, fotoğraf çekimi için özel alan'
    },
    {
      id: 3,
      names: 'Lisa Martinez & David Garcia',
      email: 'lisa.david@email.com',
      phone: '+90 534 555 0789',
      weddingDate: '2024-05-10',
      status: 'completed',
      guestCount: 200,
      uploads: 578,
      lastActivity: '1 hafta önce',
      venue: 'Büyük Balo Salonu',
      budget: '₺150,000',
      notes: 'Düğün başarıyla tamamlandı. Çok mutlu kaldılar.',
      specialRequests: 'Premium bar servisi, özel pasta tasarımı'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'planning': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Aktif';
      case 'planning': return 'Planlama';
      case 'completed': return 'Tamamlandı';
      default: return status;
    }
  };

  const handleSelectCouple = (id: number) => {
    setSelectedCouples(prev => 
      prev.includes(id) 
        ? prev.filter(coupleId => coupleId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedCouples(
      selectedCouples.length === couples.length 
        ? [] 
        : couples.map(couple => couple.id)
    );
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk ${action} for couples:`, selectedCouples);
    setShowBulkModal(false);
    setSelectedCouples([]);
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleViewCouple = (couple: any) => {
    setSelectedCouple(couple);
    setShowViewModal(true);
  };

  const handleEditCouple = (couple: any) => {
    setSelectedCouple(couple);
    setShowEditModal(true);
  };

  const handleMessageCouple = (couple: any) => {
    setSelectedCouple(couple);
    setShowMessageModal(true);
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) {
      alert('Lütfen mesaj içeriğini girin');
      return;
    }
    
    // Simulate sending message
    alert(`Mesaj ${selectedCouple?.names} çiftine gönderildi!`);
    setShowMessageModal(false);
    setMessageText('');
    setSelectedCouple(null);
  };

  const handleSaveEdit = () => {
    // Simulate saving changes
    alert('Çift bilgileri güncellendi!');
    setShowEditModal(false);
    setSelectedCouple(null);
  };

  const EmptyState = () => (
    <div className="text-center py-12">
      <i className="ri-heart-add-line text-6xl text-gray-300 mb-4"></i>
      <h3 className="text-lg font-medium text-gray-900 mb-2">Henüz Çift Yok</h3>
      <p className="text-gray-600 mb-6">İlk çiftinizi ekleyerek başlayın</p>
      <button className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer">
        <i className="ri-heart-add-line mr-2"></i>
        İlk Çifti Ekle
      </button>
    </div>
  );

  if (couples.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Çiftler</h2>
        </div>
        <div className="bg-white rounded-lg shadow">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Çiftler</h2>
        <div className="flex space-x-3">
          {selectedCouples.length > 0 && (
            <button 
              onClick={() => setShowBulkModal(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-settings-line mr-2"></i>
              Toplu İşlem ({selectedCouples.length})
            </button>
          )}
          <button className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer">
            <i className="ri-heart-add-line mr-2"></i>
            Yeni Çift Ekle
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <input
              type="text"
              placeholder="Çift adı veya email ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="planning">Planlama</option>
            <option value="active">Aktif</option>
            <option value="completed">Tamamlandı</option>
          </select>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8"
          >
            <option value="all">Tüm Tarihler</option>
            <option value="this-month">Bu Ay</option>
            <option value="next-month">Gelecek Ay</option>
            <option value="this-year">Bu Yıl</option>
          </select>
          <div className="flex space-x-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8"
            >
              <option value="date">Tarihe Göre</option>
              <option value="name">İsme Göre</option>
              <option value="status">Duruma Göre</option>
              <option value="guests">Misafir Sayısına Göre</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              <i className={`ri-sort-${sortOrder === 'asc' ? 'asc' : 'desc'}`}></i>
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span>Toplam: {couples.length} çift</span>
          <button
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
              setDateFilter('all');
              setSortBy('date');
              setSortOrder('desc');
            }}
            className="text-blue-600 hover:text-blue-800 cursor-pointer"
          >
            Filtreleri Temizle
          </button>
        </div>
      </div>

      {/* Couples Grid */}
      <div className="space-y-4">
        <div className="flex items-center space-x-4 bg-white rounded-lg shadow p-4">
          <input
            type="checkbox"
            checked={selectedCouples.length === couples.length}
            onChange={handleSelectAll}
            className="w-4 h-4 text-blue-600 rounded cursor-pointer"
          />
          <span className="text-sm font-medium">Tümünü Seç</span>
        </div>

        {couples.map((couple) => (
          <div key={couple.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start space-x-4">
              <input
                type="checkbox"
                checked={selectedCouples.includes(couple.id)}
                onChange={() => handleSelectCouple(couple.id)}
                className="w-4 h-4 text-blue-600 rounded cursor-pointer mt-2"
              />
              <img
                src={`https://readdy.ai/api/search-image?query=Happy%20wedding%20couple%20portrait%2C%20elegant%20attire%2C%20romantic%20atmosphere%2C%20professional%20photography%2C%20wedding%20day%20celebration&width=100&height=100&seq=couple-${couple.id}&orientation=squarish`}
                alt={couple.names}
                className="w-16 h-16 rounded-full object-cover object-top"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{couple.names}</h3>
                    <p className="text-gray-600">{couple.email}</p>
                    <p className="text-gray-600">{couple.phone}</p>
                  </div>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(couple.status)}`}>
                    {getStatusText(couple.status)}
                  </span>
                </div>

                <div className="grid md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Düğün Tarihi</p>
                    <p className="font-medium">{new Date(couple.weddingDate).toLocaleDateString('tr-TR')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Misafir Sayısı</p>
                    <p className="font-medium">{couple.guestCount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Upload Sayısı</p>
                    <p className="font-medium">{couple.uploads}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Son Aktivite</p>
                    <p className="font-medium">{couple.lastActivity}</p>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-sm font-medium rounded cursor-pointer whitespace-nowrap">
                    <i className="ri-file-list-line mr-1"></i>
                    Detay
                  </button>
                  <button 
                    onClick={() => handleViewCouple(couple)}
                    className="text-blue-600 hover:text-blue-900 px-3 py-1 text-sm font-medium cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-eye-line mr-1"></i>
                    Görüntüle
                  </button>
                  <button 
                    onClick={() => handleEditCouple(couple)}
                    className="text-gray-600 hover:text-gray-900 px-3 py-1 text-sm font-medium cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-edit-line mr-1"></i>
                    Düzenle
                  </button>
                  <button 
                    onClick={() => handleMessageCouple(couple)}
                    className="text-green-600 hover:text-green-900 px-3 py-1 text-sm font-medium cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-message-line mr-1"></i>
                    Mesaj
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View Modal */}
      {showViewModal && selectedCouple && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Çift Detayları</h3>
                <button 
                  onClick={() => setShowViewModal(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={`https://readdy.ai/api/search-image?query=Happy%20wedding%20couple%20portrait%2C%20elegant%20attire%2C%20romantic%20atmosphere%2C%20professional%20photography%2C%20wedding%20day%20celebration&width=120&height=120&seq=couple-detail-${selectedCouple.id}&orientation=squarish`}
                    alt={selectedCouple.names}
                    className="w-20 h-20 rounded-full object-cover object-top"
                  />
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900">{selectedCouple.names}</h4>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedCouple.status)}`}>
                      {getStatusText(selectedCouple.status)}
                    </span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h5 className="font-semibold text-gray-900">İletişim Bilgileri</h5>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <i className="ri-mail-line text-gray-500 mr-3"></i>
                        <span>{selectedCouple.email}</span>
                      </div>
                      <div className="flex items-center">
                        <i className="ri-phone-line text-gray-500 mr-3"></i>
                        <span>{selectedCouple.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h5 className="font-semibold text-gray-900">Düğün Bilgileri</h5>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <i className="ri-calendar-line text-gray-500 mr-3"></i>
                        <span>{new Date(selectedCouple.weddingDate).toLocaleDateString('tr-TR')}</span>
                      </div>
                      <div className="flex items-center">
                        <i className="ri-building-line text-gray-500 mr-3"></i>
                        <span>{selectedCouple.venue}</span>
                      </div>
                      <div className="flex items-center">
                        <i className="ri-group-line text-gray-500 mr-3"></i>
                        <span>{selectedCouple.guestCount} misafir</span>
                      </div>
                      <div className="flex items-center">
                        <i className="ri-money-dollar-circle-line text-gray-500 mr-3"></i>
                        <span>{selectedCouple.budget}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">Notlar</h5>
                  <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{selectedCouple.notes}</p>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">Özel İstekler</h5>
                  <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{selectedCouple.specialRequests}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-700 font-medium">Yüklenen Medya</span>
                      <span className="text-2xl font-bold text-blue-700">{selectedCouple.uploads}</span>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-green-700 font-medium">Son Aktivite</span>
                      <span className="text-sm text-green-700">{selectedCouple.lastActivity}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedCouple && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Çift Bilgilerini Düzenle</h3>
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Çift Adları
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedCouple.names}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-posta
                    </label>
                    <input
                      type="email"
                      defaultValue={selectedCouple.email}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      defaultValue={selectedCouple.phone}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Düğün Tarihi
                    </label>
                    <input
                      type="date"
                      defaultValue={selectedCouple.weddingDate}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Durum
                    </label>
                    <select
                      defaultValue={selectedCouple.status}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8"
                    >
                      <option value="planning">Planlama</option>
                      <option value="active">Aktif</option>
                      <option value="completed">Tamamlandı</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Misafir Sayısı
                    </label>
                    <input
                      type="number"
                      defaultValue={selectedCouple.guestCount}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bütçe
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedCouple.budget}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mekan
                  </label>
                  <select
                    defaultValue={selectedCouple.venue}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8"
                  >
                    <option value="Ana Salon">Ana Salon</option>
                    <option value="Bahçe Alanı">Bahçe Alanı</option>
                    <option value="Büyük Balo Salonu">Büyük Balo Salonu</option>
                    <option value="Teras">Teras</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notlar
                  </label>
                  <textarea
                    defaultValue={selectedCouple.notes}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Özel İstekler
                  </label>
                  <textarea
                    defaultValue={selectedCouple.specialRequests}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                  ></textarea>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer"
                  >
                    İptal
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Kaydet
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {showMessageModal && selectedCouple && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Mesaj Gönder</h3>
                <button 
                  onClick={() => setShowMessageModal(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <img
                    src={`https://readdy.ai/api/search-image?query=Happy%20wedding%20couple%20portrait%2C%20elegant%20attire%2C%20romantic%20atmosphere%2C%20professional%20photography%2C%20wedding%20day%20celebration&width=50&height=50&seq=couple-msg-${selectedCouple.id}&orientation=squarish`}
                    alt={selectedCouple.names}
                    className="w-12 h-12 rounded-full object-cover object-top"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{selectedCouple.names}</p>
                    <p className="text-sm text-gray-600">{selectedCouple.email}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mesaj İçeriği
                  </label>
                  <textarea
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value.slice(0, 500))}
                    placeholder="Mesajınızı buraya yazın..."
                    rows={6}
                    maxLength={500}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                  ></textarea>
                  <p className="text-xs text-gray-500 mt-1">{messageText.length}/500 karakter</p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowMessageModal(false)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer"
                  >
                    İptal
                  </button>
                  <button
                    onClick={handleSendMessage}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <i className="ri-send-plane-line mr-2"></i>
                    Gönder
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Actions Modal */}
      {showBulkModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              Toplu İşlem ({selectedCouples.length} çift seçili)
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => handleBulkAction('status-update')}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded cursor-pointer"
              >
                <i className="ri-refresh-line mr-2"></i>
                Durum Güncelle
              </button>
              <button
                onClick={() => handleBulkAction('send-message')}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded cursor-pointer"
              >
                <i className="ri-message-line mr-2"></i>
                Toplu Mesaj Gönder
              </button>
              <button
                onClick={() => handleBulkAction('export')}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded cursor-pointer"
              >
                <i className="ri-download-line mr-2"></i>
                Excel'e Aktar
              </button>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowBulkModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 cursor-pointer"
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
