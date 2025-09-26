
'use client';

import { useState } from 'react';

interface Venue {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  description: string;
  capacity: number;
  priceRange: string;
  amenities: string[];
  images: string[];
  status: 'active' | 'pending' | 'suspended';
  ownerName: string;
  joinDate: string;
  totalWeddings: number;
  rating: number;
  lastActivity: string;
  password: string;
}

export default function VenueManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCredentialsModal, setShowCredentialsModal] = useState(false);
  const [editingVenue, setEditingVenue] = useState<Venue | null>(null);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [newVenue, setNewVenue] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    description: '',
    capacity: '',
    priceRange: '',
    amenities: '',
    ownerName: '',
    password: ''
  });

  // Mock venues data
  const venues: Venue[] = [
    {
      id: 'VENUE-001',
      name: 'Grand Hotel',
      email: 'info@grandhotel.com',
      phone: '+90 212 555 0001',
      address: 'Taksim Meydanı No: 1',
      city: 'İstanbul',
      description: 'Lüks düğün salonu ve organizasyon hizmetleri',
      capacity: 500,
      priceRange: '15.000 - 25.000 TL',
      amenities: ['Valet Park', 'Canlı Müzik', 'Dekorasyon', 'Catering'],
      images: ['hotel1.jpg', 'hotel2.jpg'],
      status: 'active',
      ownerName: 'Mehmet Öztürk',
      joinDate: '2023-01-15',
      totalWeddings: 45,
      rating: 4.8,
      lastActivity: '2024-01-15 14:30',
      password: 'venue123'
    },
    {
      id: 'VENUE-002',
      name: 'Royal Palace',
      email: 'contact@royalpalace.com',
      phone: '+90 212 555 0002',
      address: 'Nişantaşı Caddesi No: 25',
      city: 'İstanbul',
      description: 'Zarif ve şık düğün organizasyonları',
      capacity: 300,
      priceRange: '12.000 - 20.000 TL',
      amenities: ['Bahçe', 'Dans Pisti', 'Bar', 'Ses Sistemi'],
      images: ['palace1.jpg', 'palace2.jpg'],
      status: 'active',
      ownerName: 'Ayşe Kaya',
      joinDate: '2023-03-20',
      totalWeddings: 32,
      rating: 4.6,
      lastActivity: '2024-01-14 16:45',
      password: 'palace2023'
    },
    {
      id: 'VENUE-003',
      name: 'Garden Paradise',
      email: 'info@gardenparadise.com',
      phone: '+90 216 555 0003',
      address: 'Çamlıca Tepesi No: 15',
      city: 'İstanbul',
      description: 'Doğayla iç içe romantik düğünler',
      capacity: 200,
      priceRange: '8.000 - 15.000 TL',
      amenities: ['Bahçe', 'Göl Manzarası', 'Açık Alan', 'Fotoğraf Köşesi'],
      images: ['garden1.jpg', 'garden2.jpg'],
      status: 'pending',
      ownerName: 'Ali Demir',
      joinDate: '2024-01-10',
      totalWeddings: 0,
      rating: 0,
      lastActivity: '2024-01-10 09:15',
      password: 'garden456'
    }
  ];

  const filteredVenues = venues.filter(venue => {
    const matchesSearch = searchTerm === '' || 
      venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venue.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venue.ownerName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || venue.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateVenue = () => {
    if (!newVenue.name || !newVenue.email || !newVenue.phone || !newVenue.ownerName) {
      alert('Lütfen zorunlu alanları doldurun');
      return;
    }

    alert(`${newVenue.name} mekanı başarıyla oluşturuldu!\nEmail: ${newVenue.email}\nŞifre: ${newVenue.password || 'venue123'}`);
    setShowCreateModal(false);
    setNewVenue({
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      description: '',
      capacity: '',
      priceRange: '',
      amenities: '',
      ownerName: '',
      password: ''
    });
  };

  const handleEditVenue = (venue: Venue) => {
    setEditingVenue(venue);
    setShowEditModal(true);
  };

  const handleViewCredentials = (venue: Venue) => {
    setSelectedVenue(venue);
    setShowCredentialsModal(true);
  };

  const handleUpdateVenue = () => {
    if (!editingVenue) return;
    
    alert(`${editingVenue.name} mekanı başarıyla güncellendi!`);
    setShowEditModal(false);
    setEditingVenue(null);
  };

  const handleUpdateCredentials = () => {
    if (!selectedVenue) return;
    
    alert(`${selectedVenue.name} mekanının giriş bilgileri güncellendi!`);
    setShowCredentialsModal(false);
    setSelectedVenue(null);
  };

  const handleDeleteVenue = (venueId: string, venueName: string) => {
    if (confirm(`${venueName} mekanını kalıcı olarak silmek istediğinizden emin misiniz?`)) {
      alert(`${venueName} mekanı silindi`);
    }
  };

  const handleResetPassword = (venueName: string) => {
    const newPassword = Math.random().toString(36).slice(-8);
    alert(`${venueName} için yeni şifre oluşturuldu: ${newPassword}\nLütfen bu şifreyi mekan sahibine iletin.`);
  };

  const stats = {
    total: venues.length,
    active: venues.filter(v => v.status === 'active').length,
    pending: venues.filter(v => v.status === 'pending').length,
    suspended: venues.filter(v => v.status === 'suspended').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Mekan Yönetimi</h2>
          <p className="text-gray-600 mt-1">Düğün mekanlarını yönetin ve yeni hesaplar oluşturun</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer flex items-center whitespace-nowrap"
        >
          <i className="ri-add-line mr-2"></i>
          Yeni Mekan Hesabı
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-building-line text-blue-600 text-xl"></i>
            </div>
            <div>
              <p className="text-sm text-gray-600">Toplam Mekan</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-check-line text-green-600 text-xl"></i>
            </div>
            <div>
              <p className="text-sm text-gray-600">Aktif</p>
              <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-time-line text-yellow-600 text-xl"></i>
            </div>
            <div>
              <p className="text-sm text-gray-600">Onay Bekliyor</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-pause-line text-red-600 text-xl"></i>
            </div>
            <div>
              <p className="text-sm text-gray-600">Askıda</p>
              <p className="text-2xl font-bold text-gray-900">{stats.suspended}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Arama</label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Mekan adı, şehir veya sahip adı ara..."
                className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <i className="ri-search-line absolute left-3 top-2.5 text-gray-400"></i>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Durum</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
            >
              <option value="all">Tüm Durumlar</option>
              <option value="active">Aktif</option>
              <option value="pending">Onay Bekliyor</option>
              <option value="suspended">Askıda</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <span className="text-sm text-gray-600">{filteredVenues.length} mekan gösteriliyor</span>
        </div>
      </div>

      {/* Venues Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mekan & Sahip
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İletişim
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kapasite & Fiyat
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İstatistikler
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hesap Yönetimi
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredVenues.map((venue) => (
                <tr key={venue.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-semibold text-gray-900">{venue.name}</div>
                      <div className="text-sm text-gray-600">{venue.ownerName}</div>
                      <div className="text-xs text-gray-500">{venue.city}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="text-gray-900">{venue.email}</div>
                      <div className="text-gray-600">{venue.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="text-gray-900">{venue.capacity} kişi</div>
                      <div className="text-gray-600">{venue.priceRange}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="text-gray-900">{venue.totalWeddings} düğün</div>
                      <div className="flex items-center text-yellow-500">
                        <i className="ri-star-fill mr-1"></i>
                        <span>{venue.rating > 0 ? venue.rating : 'Yeni'}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(venue.status)}`}>
                      {venue.status === 'active' ? 'Aktif' :
                       venue.status === 'pending' ? 'Bekliyor' : 'Askıda'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col space-y-1">
                      <button 
                        onClick={() => handleViewCredentials(venue)}
                        className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-2 py-1 rounded text-xs font-medium transition-colors cursor-pointer whitespace-nowrap"
                        title="Giriş Bilgileri"
                      >
                        <i className="ri-key-line mr-1"></i>
                        Giriş Bilgileri
                      </button>
                      <button 
                        onClick={() => handleResetPassword(venue.name)}
                        className="bg-orange-100 hover:bg-orange-200 text-orange-700 px-2 py-1 rounded text-xs font-medium transition-colors cursor-pointer whitespace-nowrap"
                        title="Şifre Sıfırla"
                      >
                        <i className="ri-lock-password-line mr-1"></i>
                        Şifre Sıfırla
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => alert(`${venue.name} detayları görüntüleniyor...`)}
                        className="text-blue-600 hover:text-blue-900 cursor-pointer"
                      >
                        <i className="ri-eye-line"></i>
                      </button>
                      <button 
                        onClick={() => handleEditVenue(venue)}
                        className="text-gray-600 hover:text-gray-900 cursor-pointer"
                      >
                        <i className="ri-edit-line"></i>
                      </button>
                      <button 
                        onClick={() => handleDeleteVenue(venue.id, venue.name)}
                        className="text-red-600 hover:text-red-900 cursor-pointer"
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredVenues.length === 0 && (
          <div className="text-center py-12">
            <i className="ri-building-line text-4xl text-gray-300 mb-4"></i>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Mekan Bulunamadı</h3>
            <p className="text-gray-500">Arama kriterlerinize uygun mekan bulunamadı.</p>
          </div>
        )}
      </div>

      {/* Create Venue Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Yeni Mekan Hesabı Oluştur</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mekan Adı *
                  </label>
                  <input
                    type="text"
                    value={newVenue.name}
                    onChange={(e) => setNewVenue({...newVenue, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Grand Hotel"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sahip Adı *
                  </label>
                  <input
                    type="text"
                    value={newVenue.ownerName}
                    onChange={(e) => setNewVenue({...newVenue, ownerName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Mehmet Öztürk"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={newVenue.email}
                    onChange={(e) => setNewVenue({...newVenue, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="info@grandhotel.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    value={newVenue.phone}
                    onChange={(e) => setNewVenue({...newVenue, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+90 212 555 0001"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Şehir
                  </label>
                  <input
                    type="text"
                    value={newVenue.city}
                    onChange={(e) => setNewVenue({...newVenue, city: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="İstanbul"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kapasite
                  </label>
                  <input
                    type="number"
                    value={newVenue.capacity}
                    onChange={(e) => setNewVenue({...newVenue, capacity: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adres
                </label>
                <input
                  type="text"
                  value={newVenue.address}
                  onChange={(e) => setNewVenue({...newVenue, address: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Taksim Meydanı No: 1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fiyat Aralığı
                </label>
                <input
                  type="text"
                  value={newVenue.priceRange}
                  onChange={(e) => setNewVenue({...newVenue, priceRange: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="15.000 - 25.000 TL"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Özellikler (virgülle ayırın)
                </label>
                <input
                  type="text"
                  value={newVenue.amenities}
                  onChange={(e) => setNewVenue({...newVenue, amenities: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Valet Park, Canlı Müzik, Dekorasyon"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Açıklama
                </label>
                <textarea
                  value={newVenue.description}
                  onChange={(e) => setNewVenue({...newVenue, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Lüks düğün salonu ve organizasyon hizmetleri"
                  maxLength={500}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Şifre (boş bırakılırsa otomatik: venue123)
                </label>
                <input
                  type="password"
                  value={newVenue.password}
                  onChange={(e) => setNewVenue({...newVenue, password: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="venue123"
                />
              </div>
            </div>

            <div className="p-6 border-t bg-gray-50 flex justify-end space-x-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                İptal
              </button>
              <button
                onClick={handleCreateVenue}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                Hesap Oluştur
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Venue Modal */}
      {showEditModal && editingVenue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Mekan Düzenle: {editingVenue.name}</h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mekan Adı
                  </label>
                  <input
                    type="text"
                    value={editingVenue.name}
                    onChange={(e) => setEditingVenue({...editingVenue, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sahip Adı
                  </label>
                  <input
                    type="text"
                    value={editingVenue.ownerName}
                    onChange={(e) => setEditingVenue({...editingVenue, ownerName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editingVenue.email}
                    onChange={(e) => setEditingVenue({...editingVenue, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    value={editingVenue.phone}
                    onChange={(e) => setEditingVenue({...editingVenue, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Şehir
                  </label>
                  <input
                    type="text"
                    value={editingVenue.city}
                    onChange={(e) => setEditingVenue({...editingVenue, city: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kapasite
                  </label>
                  <input
                    type="number"
                    value={editingVenue.capacity}
                    onChange={(e) => setEditingVenue({...editingVenue, capacity: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adres
                </label>
                <input
                  type="text"
                  value={editingVenue.address}
                  onChange={(e) => setEditingVenue({...editingVenue, address: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fiyat Aralığı
                </label>
                <input
                  type="text"
                  value={editingVenue.priceRange}
                  onChange={(e) => setEditingVenue({...editingVenue, priceRange: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Özellikler (virgülle ayırın)
                </label>
                <input
                  type="text"
                  value={editingVenue.amenities.join(', ')}
                  onChange={(e) => setEditingVenue({...editingVenue, amenities: e.target.value.split(', ').filter(item => item.trim())})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Açıklama
                </label>
                <textarea
                  value={editingVenue.description}
                  onChange={(e) => setEditingVenue({...editingVenue, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  maxLength={500}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Durum
                </label>
                <select
                  value={editingVenue.status}
                  onChange={(e) => setEditingVenue({...editingVenue, status: e.target.value as 'active' | 'pending' | 'suspended'})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                >
                  <option value="active">Aktif</option>
                  <option value="pending">Onay Bekliyor</option>
                  <option value="suspended">Askıda</option>
                </select>
              </div>
            </div>

            <div className="p-6 border-t bg-gray-50 flex justify-end space-x-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                İptal
              </button>
              <button
                onClick={handleUpdateVenue}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                Güncelle
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Credentials Modal */}
      {showCredentialsModal && selectedVenue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Giriş Bilgileri</h3>
                <button
                  onClick={() => setShowCredentialsModal(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mekan Adı
                </label>
                <div className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{selectedVenue.name}</div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={selectedVenue.email}
                  onChange={(e) => setSelectedVenue({...selectedVenue, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Şifre
                </label>
                <input
                  type="password"
                  value={selectedVenue.password}
                  onChange={(e) => setSelectedVenue({...selectedVenue, password: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex">
                  <i className="ri-warning-line text-yellow-600 mr-2 mt-0.5"></i>
                  <div>
                    <p className="text-sm text-yellow-800 font-medium">Güvenlik Uyarısı</p>
                    <p className="text-xs text-yellow-700 mt-1">
                      Şifre değişikliklerini mekan sahibine bildirmeyi unutmayın.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t bg-gray-50 flex justify-end space-x-3">
              <button
                onClick={() => setShowCredentialsModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                İptal
              </button>
              <button
                onClick={handleUpdateCredentials}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                Güncelle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
