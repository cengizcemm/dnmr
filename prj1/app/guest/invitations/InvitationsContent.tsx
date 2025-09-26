
'use client';

import { useState } from 'react';
import Link from 'next/link';
import GuestHeader from '../dashboard/GuestHeader';
import GuestSidebar from '../dashboard/GuestSidebar';

export default function InvitationsContent() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock invitations data with more details
  const invitations = [
    {
      id: 1,
      coupleNames: 'Sarah & Michael',
      weddingId: 'WEDDING-2024-SARAH-MICHAEL',
      date: '15 Haziran 2024',
      time: '16:00',
      venue: 'Grand Ballroom Hotel',
      location: 'İstanbul',
      status: 'attended',
      rsvpDate: '2024-05-20',
      invitedBy: 'Sarah Johnson',
      guestCount: 2,
      message: 'Sevgili Ahmet, düğünümüzde bizimle olmanızı çok istiyoruz!',
      coverImage: 'https://readdy.ai/api/search-image?query=Elegant%20wedding%20invitation%20card%2C%20romantic%20wedding%20design%2C%20luxury%20wedding%20invitation%2C%20beautiful%20calligraphy&width=300&height=200&seq=invitation-1&orientation=landscape',
      weddingType: 'Nikah & Düğün',
      dressCode: 'Formal',
      specialNotes: 'Çocuk dostu etkinlik',
      myContributions: {
        photos: 8,
        notes: 2,
        voiceMessages: 1
      }
    },
    {
      id: 2,
      coupleNames: 'Emma & James',
      weddingId: 'WEDDING-2024-EMMA-JAMES',
      date: '20 Mayıs 2024',
      time: '18:00',
      venue: 'Seaside Resort',
      location: 'Antalya',
      status: 'attended',
      rsvpDate: '2024-04-15',
      invitedBy: 'Emma Wilson',
      guestCount: 1,
      message: 'Deniz kenarında düzenleyeceğimiz düğünümüzde yanımızda olmanız bizim için çok önemli.',
      coverImage: 'https://readdy.ai/api/search-image?query=Beach%20wedding%20invitation%2C%20seaside%20wedding%20card%2C%20ocean%20themed%20wedding%20invitation%2C%20tropical%20wedding%20design&width=300&height=200&seq=invitation-2&orientation=landscape',
      weddingType: 'Plaj Düğünü',
      dressCode: 'Casual Elegant',
      specialNotes: 'Plaj ayakkabısı önerilir',
      myContributions: {
        photos: 12,
        notes: 1,
        voiceMessages: 2
      }
    },
    {
      id: 3,
      coupleNames: 'Lisa & David',
      weddingId: 'WEDDING-2024-LISA-DAVID',
      date: '10 Nisan 2024',
      time: '15:30',
      venue: 'Garden Palace',
      location: 'Ankara',
      status: 'attended',
      rsvpDate: '2024-03-20',
      invitedBy: 'Lisa Garcia',
      guestCount: 2,
      message: 'Bahçe ortamında gerçekleştireceğimiz düğün törenimizde sizleri görmekten mutluluk duyacağız.',
      coverImage: 'https://readdy.ai/api/search-image?query=Garden%20wedding%20invitation%2C%20outdoor%20wedding%20card%2C%20floral%20wedding%20invitation%2C%20spring%20wedding%20design&width=300&height=200&seq=invitation-3&orientation=landscape',
      weddingType: 'Bahçe Düğünü',
      dressCode: 'Smart Casual',
      specialNotes: 'Açık hava etkinliği',
      myContributions: {
        photos: 3,
        notes: 4,
        voiceMessages: 0
      }
    },
    {
      id: 4,
      coupleNames: 'Elif & Burak',
      weddingId: 'WEDDING-2024-ELIF-BURAK',
      date: '15 Ağustos 2024',
      time: '19:00',
      venue: 'Sunset Terrace',
      location: 'İstanbul',
      status: 'confirmed',
      rsvpDate: '2024-07-01',
      invitedBy: 'Elif Demir',
      guestCount: 1,
      message: 'Gün batımında gerçekleştireceğimiz düğünümüzde sizinle birlikte olmak istiyoruz.',
      coverImage: 'https://readdy.ai/api/search-image?query=Sunset%20wedding%20invitation%2C%20romantic%20evening%20wedding%20card%2C%20golden%20hour%20wedding%20design%2C%20elegant%20wedding%20invitation&width=300&height=200&seq=invitation-4&orientation=landscape',
      weddingType: 'Gün Batımı Düğünü',
      dressCode: 'Cocktail',
      specialNotes: 'Fotoğraf çekimi için altın saat',
      daysUntil: 45
    },
    {
      id: 5,
      coupleNames: 'Deniz & Can',
      weddingId: 'WEDDING-2024-DENIZ-CAN',
      date: '30 Eylül 2024',
      time: '16:30',
      venue: 'Vineyard Estate',
      location: 'Çanakkale',
      status: 'pending',
      invitedBy: 'Deniz Özkan',
      guestCount: 2,
      message: 'Bağ evimizde gerçekleştireceğimiz intimat düğünümüzde sevdiklerimizle birlikte olmak istiyoruz.',
      coverImage: 'https://readdy.ai/api/search-image?query=Vineyard%20wedding%20invitation%2C%20rustic%20wedding%20card%2C%20wine%20country%20wedding%20design%2C%20countryside%20wedding%20invitation&width=300&height=200&seq=invitation-5&orientation=landscape',
      weddingType: 'Bağ Evi Düğünü',
      dressCode: 'Country Chic',
      specialNotes: 'Şarap tadımı dahil',
      daysUntil: 91
    },
    {
      id: 6,
      coupleNames: 'Zeynep & Ali',
      weddingId: 'WEDDING-2023-ZEYNEP-ALI',
      date: '22 Aralık 2023',
      time: '17:00',
      venue: 'Winter Palace',
      location: 'Bursa',
      status: 'declined',
      rsvpDate: '2023-11-15',
      invitedBy: 'Zeynep Kaya',
      guestCount: 1,
      message: 'Kış düğünümüzde sıcacık bir atmosferde buluşalım!',
      coverImage: 'https://readdy.ai/api/search-image?query=Winter%20wedding%20invitation%2C%20elegant%20snow%20themed%20wedding%20card%2C%20luxury%20winter%20wedding%20design%2C%20holiday%20wedding%20invitation&width=300&height=200&seq=invitation-6&orientation=landscape',
      weddingType: 'Kış Düğünü',
      dressCode: 'Formal Evening',
      specialNotes: 'Sıcak içecekler ikramı'
    }
  ];

  const filters = [
    { id: 'all', label: 'Tümü', count: invitations.length },
    { id: 'pending', label: 'Bekleyen', count: invitations.filter(inv => inv.status === 'pending').length },
    { id: 'confirmed', label: 'Onayladığım', count: invitations.filter(inv => inv.status === 'confirmed').length },
    { id: 'attended', label: 'Katıldığım', count: invitations.filter(inv => inv.status === 'attended').length },
    { id: 'declined', label: 'Reddettiğim', count: invitations.filter(inv => inv.status === 'declined').length }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'attended':
        return { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200', label: 'Katıldım' };
      case 'confirmed':
        return { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200', label: 'Katılacağım' };
      case 'pending':
        return { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200', label: 'Yanıt Bekliyor' };
      case 'declined':
        return { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200', label: 'Katılamam' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200', label: status };
    }
  };

  const handleRSVP = (invitationId: number, response: 'confirmed' | 'declined') => {
    // Simulate RSVP response
    alert(`Yanıtınız kaydedildi: ${response === 'confirmed' ? 'Katılacağım' : 'Katılamam'}`);
  };

  const filteredInvitations = invitations.filter(invitation => {
    const matchesFilter = activeFilter === 'all' || invitation.status === activeFilter;
    const matchesSearch = searchTerm === '' || 
      invitation.coupleNames.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invitation.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invitation.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <GuestHeader />
      
      <div className="flex">
        <GuestSidebar />
        
        <main className="flex-1 p-4 md:p-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Düğün Davetlerim</h1>
              <p className="text-gray-600 text-sm md:text-base">Aldığınız tüm düğün davetlerini görüntüleyin ve yanıtlayın</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
              <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">{invitations.length}</div>
                  <div className="text-gray-600 text-xs md:text-sm">Toplam Davet</div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-green-600 mb-1">
                    {invitations.filter(inv => inv.status === 'attended').length}
                  </div>
                  <div className="text-gray-600 text-xs md:text-sm">Katıldığım</div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-yellow-600 mb-1">
                    {invitations.filter(inv => inv.status === 'pending').length}
                  </div>
                  <div className="text-gray-600 text-xs md:text-sm">Bekleyen</div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-purple-600 mb-1">
                    {invitations.filter(inv => inv.myContributions).reduce((total, inv) => total + (inv.myContributions?.photos || 0), 0)}
                  </div>
                  <div className="text-gray-600 text-xs md:text-sm">Paylaştığım Fotoğraf</div>
                </div>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-6 md:mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Search */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Çift adı, mekan veya şehir ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full lg:w-80 pl-10 pr-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm md:text-base min-h-[44px]"
                  />
                  <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-2">
                  {filters.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setActiveFilter(filter.id)}
                      className={`px-3 md:px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer text-xs md:text-sm min-h-[44px] flex items-center ${
                        activeFilter === filter.id
                          ? 'bg-rose-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {filter.label} ({filter.count})
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Invitations Grid */}
            <div className="space-y-4 md:space-y-6">
              {filteredInvitations.map((invitation) => {
                const statusInfo = getStatusBadge(invitation.status);
                return (
                  <div key={invitation.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="md:flex">
                      {/* Image */}
                      <div className="md:w-80 md:flex-shrink-0">
                        <img
                          src={invitation.coverImage}
                          alt={`${invitation.coupleNames} Düğün Davetiyesi`}
                          className="w-full h-48 md:h-full object-cover object-center"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-4 md:p-6">
                        <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg md:text-xl font-bold text-gray-900">{invitation.coupleNames}</h3>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusInfo.bg} ${statusInfo.text} ${statusInfo.border}`}>
                                {statusInfo.label}
                              </span>
                            </div>
                            
                            <div className="space-y-1 text-sm text-gray-600 mb-3">
                              <p><i className="ri-calendar-line mr-2 text-rose-500"></i>{invitation.date} • {invitation.time}</p>
                              <p><i className="ri-map-pin-line mr-2 text-rose-500"></i>{invitation.venue}, {invitation.location}</p>
                              <p><i className="ri-user-line mr-2 text-rose-500"></i>Davet eden: {invitation.invitedBy}</p>
                              <p><i className="ri-team-line mr-2 text-rose-500"></i>{invitation.guestCount} kişi</p>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-3 mb-4">
                              <div className="grid grid-cols-2 gap-4 text-xs md:text-sm">
                                <div>
                                  <span className="font-medium text-gray-700">Tür:</span>
                                  <span className="ml-2 text-gray-600">{invitation.weddingType}</span>
                                </div>
                                <div>
                                  <span className="font-medium text-gray-700">Dress Code:</span>
                                  <span className="ml-2 text-gray-600">{invitation.dressCode}</span>
                                </div>
                              </div>
                              {invitation.specialNotes && (
                                <div className="mt-2 text-xs md:text-sm">
                                  <span className="font-medium text-gray-700">Not:</span>
                                  <span className="ml-2 text-gray-600">{invitation.specialNotes}</span>
                                </div>
                              )}
                            </div>

                            {invitation.message && (
                              <div className="bg-rose-50 border-l-4 border-rose-500 p-3 mb-4">
                                <p className="text-sm italic text-rose-800">"{invitation.message}"</p>
                              </div>
                            )}

                            {/* My Contributions (for attended weddings) */}
                            {invitation.status === 'attended' && invitation.myContributions && (
                              <div className="bg-green-50 rounded-lg p-3 mb-4">
                                <h5 className="text-sm font-medium text-green-800 mb-2">Katkılarım:</h5>
                                <div className="flex items-center space-x-4 text-xs">
                                  <span className="text-purple-600">
                                    <i className="ri-image-line mr-1"></i>
                                    {invitation.myContributions.photos} Fotoğraf
                                  </span>
                                  <span className="text-blue-600">
                                    <i className="ri-edit-line mr-1"></i>
                                    {invitation.myContributions.notes} Not
                                  </span>
                                  <span className="text-rose-600">
                                    <i className="ri-mic-line mr-1"></i>
                                    {invitation.myContributions.voiceMessages} Sesli Mesaj
                                  </span>
                                </div>
                              </div>
                            )}

                            {/* Days Until (for upcoming weddings) */}
                            {invitation.daysUntil && (
                              <div className="bg-blue-50 rounded-lg p-3 mb-4">
                                <div className="flex items-center">
                                  <i className="ri-time-line text-blue-600 mr-2"></i>
                                  <span className="text-sm font-medium text-blue-800">
                                    {invitation.daysUntil} gün kaldı
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Link
                            href={`/w/${invitation.weddingId}/profile/couple`}
                            className="flex-1 bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 md:py-3 rounded-lg font-medium transition-colors cursor-pointer text-center text-sm md:text-base min-h-[44px] flex items-center justify-center"
                          >
                            <i className="ri-eye-line mr-2"></i>
                            Profili Görüntüle
                          </Link>
                          <button className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 md:py-3 rounded-lg font-medium transition-colors cursor-pointer text-center text-sm md:text-base min-h-[44px] flex items-center justify-center">
                            <i className="ri-calendar-check-line mr-2"></i>
                            Katılım Durumu
                          </button>
                        </div>

                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Empty State */}
            {filteredInvitations.length === 0 && (
              <div className="text-center py-12">
                <i className="ri-mail-line text-6xl text-gray-300 mb-4"></i>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchTerm ? 'Arama sonucu bulunamadı' : 'Henüz davet yok'}
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  {searchTerm 
                    ? 'Farklı anahtar kelimeler deneyebilirsiniz'
                    : 'Yeni düğün davetleri geldiğinde burada görüntülenecek'
                  }
                </p>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="mt-4 bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer text-sm min-h-[44px]"
                  >
                    Aramayı Temizle
                  </button>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
