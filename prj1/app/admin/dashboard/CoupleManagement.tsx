
'use client';

import { useState } from 'react';

export default function CoupleManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [showInvitationModal, setShowInvitationModal] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [selectedCouple, setSelectedCouple] = useState<any>(null);
  const [selectedTab, setSelectedTab] = useState('info');

  const couples = [
    {
      id: 1,
      names: 'Sarah Johnson & Michael Davis',
      email: 'sarah.michael@email.com',
      phone: '+90 532 555 0123',
      venue: 'Grand Palace Hotel',
      weddingDate: '2024-06-15',
      status: 'active',
      guestCount: 120,
      uploads: 245,
      registrationDate: '2024-01-15',
      package: 'Premium',
      notes: 'Çok aktif çift, sürekli içerik paylaşıyorlar.',
      password: 'couple123',
      story: 'Sarah ve Michael\'ın hikayesi 5 yıl önce üniversitede başladı...',
      theme: 'Romantik Gül',
      font: 'Dancing Script',
      media: [
        { id: 1, type: 'image', title: 'Nişan Fotoğrafları', url: 'photo1.jpg', uploadDate: '2024-01-10' },
        { id: 2, type: 'video', title: 'Evlilik Teklifi', url: 'video1.mp4', uploadDate: '2024-01-12' }
      ],
      voiceMessages: [
        { id: 1, title: 'Davetiye Mesajı', duration: '1:23', uploadDate: '2024-01-08' },
        { id: 2, title: 'Teşekkür Mesajı', duration: '0:45', uploadDate: '2024-01-09' }
      ],
      personalNotes: [
        { id: 1, content: 'Çiçek süslemesi beyaz güller olsun', date: '2024-01-05' },
        { id: 2, content: 'Müzik listesi hazırlandı', date: '2024-01-07' }
      ],
      invitation: {
        template: 'Klasik Altın',
        customText: 'Sevgili dostlarımız, mutlu günümüzde yanımızda olmanızı dileriz...',
        colors: { primary: '#D4AF37', secondary: '#FFFFFF' }
      }
    },
    {
      id: 2,
      names: 'Emma Wilson & James Brown',
      email: 'emma.james@email.com',
      phone: '+90 533 555 0456',
      venue: 'Ocean View Resort',
      weddingDate: '2024-07-20',
      status: 'planning',
      guestCount: 85,
      uploads: 12,
      registrationDate: '2024-02-20',
      package: 'Basic',
      notes: 'Yeni başladılar, rehberlik gerekebilir.',
      password: 'emma2024',
      story: 'Emma ve James denizde yürüyüş yaparken tanıştılar...',
      theme: 'Okyanus Mavisi',
      font: 'Roboto',
      media: [
        { id: 3, type: 'image', title: 'Plaj Fotoğrafları', url: 'photo3.jpg', uploadDate: '2024-02-22' }
      ],
      voiceMessages: [],
      personalNotes: [
        { id: 3, content: 'Sahil düğünü planlanıyor', date: '2024-02-21' }
      ],
      invitation: {
        template: 'Deniz Teması',
        customText: 'Mutlu günümüzde bize eşlik edin...',
        colors: { primary: '#0077BE', secondary: '#FFFFFF' }
      }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'planning': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-purple-100 text-purple-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Aktif';
      case 'planning': return 'Planlama';
      case 'completed': return 'Tamamlandı';
      case 'cancelled': return 'İptal';
      default: return status;
    }
  };

  const handleView = (couple: any) => {
    setSelectedCouple(couple);
    setShowViewModal(true);
  };

  const handleEdit = (couple: any) => {
    setSelectedCouple(couple);
    setShowEditModal(true);
  };

  const handleMediaManagement = (couple: any) => {
    setSelectedCouple(couple);
    setShowMediaModal(true);
  };

  const handleInvitationEdit = (couple: any) => {
    setSelectedCouple(couple);
    setShowInvitationModal(true);
  };

  const handleNotesEdit = (couple: any) => {
    setSelectedCouple(couple);
    setShowNotesModal(true);
  };

  const handleVoiceEdit = (couple: any) => {
    setSelectedCouple(couple);
    setShowVoiceModal(true);
  };

  const handleSave = () => {
    setShowEditModal(false);
    setSelectedCouple(null);
    alert('Çift bilgileri güncellendi');
  };

  const handleDeleteMedia = (mediaId: number) => {
    if (confirm('Bu medyayı silmek istediğinizden emin misiniz?')) {
      alert(`Medya ${mediaId} silindi`);
    }
  };

  const handleDeleteVoiceMessage = (voiceId: number) => {
    if (confirm('Bu sesli mesajı silmek istediğinizden emin misiniz?')) {
      alert(`Sesli mesaj ${voiceId} silindi`);
    }
  };

  const handleDeleteNote = (noteId: number) => {
    if (confirm('Bu notu silmek istediğinizden emin misiniz?')) {
      alert(`Not ${noteId} silindi`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Çift Yönetimi</h2>
        <button className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer">
          <i className="ri-add-line mr-2"></i>
          Manuel Çift Ekle
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Toplam Çift</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
            </div>
            <i className="ri-heart-line text-2xl text-rose-500"></i>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Bu Ay</p>
              <p className="text-2xl font-bold text-blue-600">24</p>
            </div>
            <i className="ri-calendar-line text-2xl text-blue-500"></i>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Toplam Misafir</p>
              <p className="text-2xl font-bold text-green-600">18,420</p>
            </div>
            <i className="ri-group-line text-2xl text-green-500"></i>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Toplam Upload</p>
              <p className="text-2xl font-bold text-purple-600">2,847</p>
            </div>
            <i className="ri-image-line text-2xl text-purple-500"></i>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Çift adı, email veya mekan ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm pr-8"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="planning">Planlama</option>
            <option value="active">Aktif</option>
            <option value="completed">Tamamlandı</option>
          </select>
        </div>
      </div>

      {/* Couples Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Çift
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mekan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Düğün Tarihi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Veri Yönetimi
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {couples.map((couple) => (
                <tr key={couple.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{couple.names}</div>
                      <div className="text-sm text-gray-500">{couple.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {couple.venue}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(couple.weddingDate).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(couple.status)}`}>
                      {getStatusText(couple.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      <button 
                        onClick={() => handleMediaManagement(couple)}
                        className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-2 py-1 rounded text-xs font-medium transition-colors cursor-pointer"
                        title="Medya Yönetimi"
                      >
                        <i className="ri-image-line mr-1"></i>
                        Medya
                      </button>
                      <button 
                        onClick={() => handleVoiceEdit(couple)}
                        className="bg-green-100 hover:bg-green-200 text-green-700 px-2 py-1 rounded text-xs font-medium transition-colors cursor-pointer"
                        title="Sesli Mesajlar"
                      >
                        <i className="ri-mic-line mr-1"></i>
                        Ses
                      </button>
                      <button 
                        onClick={() => handleNotesEdit(couple)}
                        className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-2 py-1 rounded text-xs font-medium transition-colors cursor-pointer"
                        title="Notlar"
                      >
                        <i className="ri-sticky-note-line mr-1"></i>
                        Not
                      </button>
                      <button 
                        onClick={() => handleInvitationEdit(couple)}
                        className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-2 py-1 rounded text-xs font-medium transition-colors cursor-pointer"
                        title="Davetiye Düzenle"
                      >
                        <i className="ri-mail-line mr-1"></i>
                        Davetiye
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button 
                        onClick={() => handleView(couple)}
                        className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                        title="Detayları Görüntüle"
                      >
                        <i className="ri-eye-line"></i>
                      </button>
                      <button 
                        onClick={() => handleEdit(couple)}
                        className="text-gray-600 hover:text-gray-900 cursor-pointer"
                        title="Düzenle"
                      >
                        <i className="ri-edit-line"></i>
                      </button>
                      <button className="text-red-600 hover:text-red-900 cursor-pointer" title="Sil">
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      {showViewModal && selectedCouple && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Çift Detayları</h3>
                <button 
                  onClick={() => setShowViewModal(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>

              {/* Tab Navigation */}
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
                <button
                  onClick={() => setSelectedTab('info')}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                    selectedTab === 'info' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Genel Bilgiler
                </button>
                <button
                  onClick={() => setSelectedTab('media')}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                    selectedTab === 'media' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Medya ({selectedCouple.media.length})
                </button>
                <button
                  onClick={() => setSelectedTab('voice')}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                    selectedTab === 'voice' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Sesli Mesajlar ({selectedCouple.voiceMessages.length})
                </button>
                <button
                  onClick={() => setSelectedTab('notes')}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                    selectedTab === 'notes' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Notlar ({selectedCouple.personalNotes.length})
                </button>
              </div>

              {/* Tab Content */}
              {selectedTab === 'info' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Çift Adları</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{selectedCouple.names}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{selectedCouple.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{selectedCouple.password}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{selectedCouple.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mekan</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{selectedCouple.venue}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Düğün Tarihi</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">
                      {new Date(selectedCouple.weddingDate).toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kayıt Tarihi</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">
                      {new Date(selectedCouple.registrationDate).toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tema</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{selectedCouple.theme}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Yazı Tipi</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{selectedCouple.font}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Paket</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{selectedCouple.package}</p>
                  </div>
                </div>
              </div>
              )}

              {selectedTab === 'media' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-lg font-medium text-gray-900">Medya Dosyaları</h4>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer">
                      <i className="ri-upload-line mr-1"></i>
                      Yeni Yükle
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedCouple.media.map((media: any) => (
                      <div key={media.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <i className={`${media.type === 'video' ? 'ri-video-line' : 'ri-image-line'} text-lg text-gray-600 mr-2`}></i>
                            <span className="font-medium text-gray-900">{media.title}</span>
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800 cursor-pointer">
                              <i className="ri-download-line"></i>
                            </button>
                            <button 
                              onClick={() => handleDeleteMedia(media.id)}
                              className="text-red-600 hover:text-red-800 cursor-pointer"
                            >
                              <i className="ri-delete-bin-line"></i>
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">Yüklenme: {media.uploadDate}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedTab === 'voice' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-lg font-medium text-gray-900">Sesli Mesajlar</h4>
                    <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer">
                      <i className="ri-mic-line mr-1"></i>
                      Yeni Kayıt
                    </button>
                  </div>
                  <div className="space-y-3">
                    {selectedCouple.voiceMessages.map((voice: any) => (
                      <div key={voice.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                              <i className="ri-mic-line text-green-600"></i>
                            </div>
                            <div>
                              <span className="font-medium text-gray-900">{voice.title}</span>
                              <p className="text-sm text-gray-500">Süre: {voice.duration} • {voice.uploadDate}</p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800 cursor-pointer">
                              <i className="ri-play-line"></i>
                            </button>
                            <button className="text-gray-600 hover:text-gray-800 cursor-pointer">
                              <i className="ri-download-line"></i>
                            </button>
                            <button 
                              onClick={() => handleDeleteVoiceMessage(voice.id)}
                              className="text-red-600 hover:text-red-800 cursor-pointer"
                            >
                              <i className="ri-delete-bin-line"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedTab === 'notes' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-lg font-medium text-gray-900">Kişisel Notlar</h4>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer">
                      <i className="ri-add-line mr-1"></i>
                      Yeni Not
                    </button>
                  </div>
                  <div className="space-y-3">
                    {selectedCouple.personalNotes.map((note: any) => (
                      <div key={note.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <p className="text-gray-900 flex-1">{note.content}</p>
                          <button 
                            onClick={() => handleDeleteNote(note.id)}
                            className="text-red-600 hover:text-red-800 cursor-pointer ml-2"
                          >
                            <i className="ri-delete-bin-line"></i>
                          </button>
                        </div>
                        <p className="text-sm text-gray-500">{note.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-end space-x-3">
                <button 
                  onClick={() => setShowViewModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  Kapat
                </button>
                <button 
                  onClick={() => {
                    setShowViewModal(false);
                    handleEdit(selectedCouple);
                  }}
                  className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 cursor-pointer"
                >
                  Düzenle
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedCouple && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Çift Bilgilerini Düzenle</h3>
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Çift Adları</label>
                    <input
                      type="text"
                      defaultValue={selectedCouple.names}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      defaultValue={selectedCouple.email}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
                    <input
                      type="password"
                      defaultValue={selectedCouple.password}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                    <input
                      type="tel"
                      defaultValue={selectedCouple.phone}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mekan</label>
                    <input
                      type="text"
                      defaultValue={selectedCouple.venue}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Düğün Tarihi</label>
                    <input
                      type="date"
                      defaultValue={selectedCouple.weddingDate}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tema</label>
                    <select
                      defaultValue={selectedCouple.theme}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm pr-8"
                    >
                      <option value="Romantik Gül">Romantik Gül</option>
                      <option value="Okyanus Mavisi">Okyanus Mavisi</option>
                      <option value="Altın Lüks">Altın Lüks</option>
                      <option value="Vintage">Vintage</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Yazı Tipi</label>
                    <select
                      defaultValue={selectedCouple.font}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm pr-8"
                    >
                      <option value="Dancing Script">Dancing Script</option>
                      <option value="Roboto">Roboto</option>
                      <option value="Playfair Display">Playfair Display</option>
                      <option value="Montserrat">Montserrat</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Paket</label>
                    <select
                      defaultValue={selectedCouple.package}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm pr-8"
                    >
                      <option value="Basic">Basic</option>
                      <option value="Premium">Premium</option>
                      <option value="Luxury">Luxury</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Durum</label>
                    <select
                      defaultValue={selectedCouple.status}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm pr-8"
                    >
                      <option value="planning">Planlama</option>
                      <option value="active">Aktif</option>
                      <option value="completed">Tamamlandı</option>
                      <option value="cancelled">İptal</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Aşk Hikayesi</label>
                <textarea
                  rows={4}
                  defaultValue={selectedCouple.story}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm resize-none"
                  placeholder="Aşk hikayenizi yazın..."
                  maxLength={500}
                ></textarea>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Notlar</label>
                <textarea
                  rows={3}
                  defaultValue={selectedCouple.notes}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm resize-none"
                  placeholder="Çift hakkında notlar..."
                  maxLength={500}
                ></textarea>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  İptal
                </button>
                <button 
                  onClick={handleSave}
                  className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 cursor-pointer"
                >
                  Kaydet
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Media Management Modal */}
      {showMediaModal && selectedCouple && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Medya Yönetimi - {selectedCouple.names}</h3>
                <button 
                  onClick={() => setShowMediaModal(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>

              <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-2">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer">
                    <i className="ri-upload-line mr-2"></i>
                    Fotoğraf Yükle
                  </button>
                  <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer">
                    <i className="ri-video-upload-line mr-2"></i>
                    Video Yükle
                  </button>
                </div>
                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer">
                  <i className="ri-delete-bin-line mr-2"></i>
                  Seçilenleri Sil
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedCouple.media.map((media: any) => (
                  <div key={media.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="aspect-video bg-gray-100 flex items-center justify-center">
                      <i className={`${media.type === 'video' ? 'ri-video-line' : 'ri-image-line'} text-4xl text-gray-400`}></i>
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium text-gray-900 mb-2">{media.title}</h4>
                      <p className="text-sm text-gray-500 mb-3">Yüklenme: {media.uploadDate}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800 cursor-pointer" title="Düzenle">
                            <i className="ri-edit-line"></i>
                          </button>
                          <button className="text-green-600 hover:text-green-800 cursor-pointer" title="İndir">
                            <i className="ri-download-line"></i>
                          </button>
                          <button className="text-gray-600 hover:text-gray-800 cursor-pointer" title="Görüntüle">
                            <i className="ri-eye-line"></i>
                          </button>
                        </div>
                        <button 
                          onClick={() => handleDeleteMedia(media.id)}
                          className="text-red-600 hover:text-red-800 cursor-pointer" 
                          title="Sil"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Add new media placeholder */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
                  <i className="ri-add-line text-3xl text-gray-400 mb-2"></i>
                  <p className="text-gray-500 text-sm">Yeni Medya Ekle</p>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button 
                  onClick={() => setShowMediaModal(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 cursor-pointer"
                >
                  Kapat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Voice Management Modal */}
      {showVoiceModal && selectedCouple && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Sesli Mesaj Yönetimi - {selectedCouple.names}</h3>
                <button 
                  onClick={() => setShowVoiceModal(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>

              <div className="mb-4">
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer">
                  <i className="ri-mic-line mr-2"></i>
                  Yeni Sesli Mesaj Ekle
                </button>
              </div>

              <div className="space-y-3">
                {selectedCouple.voiceMessages.map((voice: any) => (
                  <div key={voice.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                          <i className="ri-mic-line text-green-600 text-xl"></i>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{voice.title}</h4>
                          <p className="text-sm text-gray-500">Süre: {voice.duration} • {voice.uploadDate}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 cursor-pointer" title="Oynat">
                          <i className="ri-play-line"></i>
                        </button>
                        <button className="text-gray-600 hover:text-gray-800 cursor-pointer" title="Düzenle">
                          <i className="ri-edit-line"></i>
                        </button>
                        <button className="text-green-600 hover:text-green-800 cursor-pointer" title="İndir">
                          <i className="ri-download-line"></i>
                        </button>
                        <button 
                          onClick={() => handleDeleteVoiceMessage(voice.id)}
                          className="text-red-600 hover:text-red-800 cursor-pointer" 
                          title="Sil"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add new voice message */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
                  <i className="ri-mic-line text-2xl text-gray-400 mr-2"></i>
                  <p className="text-gray-500">Yeni Sesli Mesaj Ekle</p>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button 
                  onClick={() => setShowVoiceModal(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 cursor-pointer"
                >
                  Kapat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notes Management Modal */}
      {showNotesModal && selectedCouple && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Not Yönetimi - {selectedCouple.names}</h3>
                <button 
                  onClick={() => setShowNotesModal(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>

              <div className="mb-4">
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer">
                  <i className="ri-add-line mr-2"></i>
                  Yeni Not Ekle
                </button>
              </div>

              <div className="space-y-3">
                {selectedCouple.personalNotes.map((note: any) => (
                  <div key={note.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <p className="text-gray-900 mb-2">{note.content}</p>
                        <p className="text-sm text-gray-500">{note.date}</p>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button className="text-gray-600 hover:text-gray-800 cursor-pointer" title="Düzenle">
                          <i className="ri-edit-line"></i>
                        </button>
                        <button 
                          onClick={() => handleDeleteNote(note.id)}
                          className="text-red-600 hover:text-red-800 cursor-pointer" 
                          title="Sil"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add new note */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <textarea
                    rows={3}
                    className="w-full border-0 resize-none focus:ring-0 placeholder-gray-400"
                    placeholder="Yeni not ekleyin..."
                  ></textarea>
                  <div className="flex justify-end mt-2">
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer">
                      Kaydet
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button 
                  onClick={() => setShowNotesModal(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 cursor-pointer"
                >
                  Kapat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Invitation Edit Modal */}
      {showInvitationModal && selectedCouple && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Davetiye Düzenle - {selectedCouple.names}</h3>
                <button 
                  onClick={() => setShowInvitationModal(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Davetiye Şablonu</label>
                  <select
                    defaultValue={selectedCouple.invitation.template}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm pr-8"
                  >
                    <option value="Klasik Altın">Klasik Altın</option>
                    <option value="Deniz Teması">Deniz Teması</option>
                    <option value="Vintage Çiçek">Vintage Çiçek</option>
                    <option value="Modern Minimalist">Modern Minimalist</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ana Renk</label>
                  <div className="flex space-x-4">
                    <input
                      type="color"
                      defaultValue={selectedCouple.invitation.colors.primary}
                      className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                    />
                    <input
                      type="color"
                      defaultValue={selectedCouple.invitation.colors.secondary}
                      className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Davetiye Metni</label>
                  <textarea
                    rows={6}
                    defaultValue={selectedCouple.invitation.customText}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm resize-none"
                    placeholder="Davetiye metnini yazın..."
                    maxLength={500}
                  ></textarea>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Davetiye Önizleme</h4>
                  <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <div className="text-2xl font-bold text-gray-800 mb-2" style={{color: selectedCouple.invitation.colors.primary}}>
                      {selectedCouple.names}
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{selectedCouple.invitation.customText}</p>
                    <div className="text-sm text-gray-500">
                      <p>{new Date(selectedCouple.weddingDate).toLocaleDateString('tr-TR')}</p>
                      <p>{selectedCouple.venue}</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer">
                    <i className="ri-eye-line mr-2"></i>
                    Tam Ekran Önizle
                  </button>
                  <button className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer">
                    <i className="ri-download-line mr-2"></i>
                    PDF İndir
                  </button>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button 
                  onClick={() => setShowInvitationModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  İptal
                </button>
                <button 
                  onClick={() => {
                    setShowInvitationModal(false);
                    alert('Davetiye başarıyla güncellendi');
                  }}
                  className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 cursor-pointer"
                >
                  Kaydet
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
