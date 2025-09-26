'use client';

import { useState } from 'react';

interface MediaItem {
  id: string;
  title: string;
  type: 'image' | 'video';
  url: string;
  uploadedBy: string;
  uploaderRole: 'couple' | 'guest' | 'venue';
  weddingId: string;
  weddingTitle: string;
  uploadDate: string;
  fileSize: string;
  status: 'approved' | 'pending' | 'rejected' | 'private';
  likes: number;
  downloads: number;
  reportCount: number;
}

export default function MediaManagement() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMedia, setSelectedMedia] = useState<string[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  // Mock media data
  const mediaItems: MediaItem[] = [
    {
      id: 'MEDIA-001',
      title: 'Nikah Töreni Fotoğrafları',
      type: 'image',
      url: 'https://readdy.ai/api/search-image?query=Beautiful%20wedding%20ceremony%20moment%2C%20bride%20and%20groom%20exchanging%20vows%2C%20romantic%20wedding%20photography%2C%20elegant%20wedding%20venue&width=400&height=300&seq=media-1&orientation=landscape',
      uploadedBy: 'Sarah & Michael',
      uploaderRole: 'couple',
      weddingId: 'WEDDING-2024-SARAH-MICHAEL',
      weddingTitle: 'Sarah & Michael Düğünü',
      uploadDate: '2024-01-15',
      fileSize: '3.2 MB',
      status: 'approved',
      likes: 25,
      downloads: 12,
      reportCount: 0
    },
    {
      id: 'MEDIA-002',
      title: 'Kutlama Anları',
      type: 'image',
      url: 'https://readdy.ai/api/search-image?query=Wedding%20reception%20celebration%2C%20guests%20dancing%2C%20happy%20wedding%20party%2C%20joyful%20moments%2C%20celebration&width=400&height=300&seq=media-2&orientation=landscape',
      uploadedBy: 'Emma Wilson',
      uploaderRole: 'guest',
      weddingId: 'WEDDING-2024-SARAH-MICHAEL',
      weddingTitle: 'Sarah & Michael Düğünü',
      uploadDate: '2024-01-14',
      fileSize: '2.8 MB',
      status: 'pending',
      likes: 8,
      downloads: 3,
      reportCount: 0
    },
    {
      id: 'MEDIA-003',
      title: 'Düğün Hikayesi Video',
      type: 'video',
      url: 'https://readdy.ai/api/search-image?query=Wedding%20video%20thumbnail%2C%20bride%20and%20groom%20video%2C%20wedding%20cinematography%2C%20romantic%20video%20scene%2C%20wedding%20memories&width=400&height=300&seq=media-video-1&orientation=landscape',
      uploadedBy: 'Grand Hotel Staff',
      uploaderRole: 'venue',
      weddingId: 'WEDDING-2024-JOHN-JANE',
      weddingTitle: 'John & Jane Düğünü',
      uploadDate: '2024-01-13',
      fileSize: '125.4 MB',
      status: 'approved',
      likes: 45,
      downloads: 28,
      reportCount: 0
    },
    {
      id: 'MEDIA-004',
      title: 'Grup Fotoğrafı',
      type: 'image',
      url: 'https://readdy.ai/api/search-image?query=Wedding%20group%20photo%2C%20family%20and%20friends%2C%20happy%20wedding%20guests%2C%20celebration%20group%20picture%2C%20formal%20wedding%20photo&width=400&height=300&seq=media-3&orientation=landscape',
      uploadedBy: 'Ahmet Kaya',
      uploaderRole: 'guest',
      weddingId: 'WEDDING-2024-ALEX-EMMA',
      weddingTitle: 'Alex & Emma Düğünü',
      uploadDate: '2024-01-12',
      fileSize: '4.1 MB',
      status: 'rejected',
      likes: 2,
      downloads: 0,
      reportCount: 1
    },
    {
      id: 'MEDIA-005',
      title: 'Pasta Kesimi',
      type: 'image',
      url: 'https://readdy.ai/api/search-image?query=Wedding%20cake%20cutting%20ceremony%2C%20elegant%20three%20tier%20cake%2C%20romantic%20moment%2C%20celebration%2C%20sweet%20moments&width=400&height=300&seq=media-4&orientation=landscape',
      uploadedBy: 'Alex & Emma',
      uploaderRole: 'couple',
      weddingId: 'WEDDING-2024-ALEX-EMMA',
      weddingTitle: 'Alex & Emma Düğünü',
      uploadDate: '2024-01-11',
      fileSize: '2.9 MB',
      status: 'private',
      likes: 15,
      downloads: 8,
      reportCount: 0
    }
  ];

  const filteredMedia = mediaItems.filter(media => {
    const matchesType = activeFilter === 'all' || media.type === activeFilter;
    const matchesStatus = statusFilter === 'all' || media.status === statusFilter;
    const matchesSearch = searchTerm === '' || 
      media.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      media.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      media.weddingTitle.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesType && matchesStatus && matchesSearch;
  });

  const handleSelectAll = () => {
    if (selectedMedia.length === filteredMedia.length) {
      setSelectedMedia([]);
    } else {
      setSelectedMedia(filteredMedia.map(media => media.id));
    }
  };

  const handleSelectMedia = (mediaId: string) => {
    setSelectedMedia(prev => 
      prev.includes(mediaId) 
        ? prev.filter(id => id !== mediaId)
        : [...prev, mediaId]
    );
  };

  const handleBulkAction = (action: string) => {
    if (selectedMedia.length === 0) {
      alert('Lütfen işlem yapmak için medya seçin');
      return;
    }

    const selectedCount = selectedMedia.length;
    
    switch (action) {
      case 'approve':
        alert(`${selectedCount} medya onaylandı`);
        break;
      case 'reject':
        alert(`${selectedCount} medya reddedildi`);
        break;
      case 'delete':
        if (confirm(`${selectedCount} medyayı kalıcı olarak silmek istediğinizden emin misiniz?`)) {
          alert(`${selectedCount} medya silindi`);
        }
        break;
      case 'download':
        alert(`${selectedCount} medya indiriliyor...`);
        break;
    }
    
    setSelectedMedia([]);
    setShowBulkActions(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'private': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'couple': return 'bg-rose-100 text-rose-800';
      case 'guest': return 'bg-blue-100 text-blue-800';
      case 'venue': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = {
    totalMedia: mediaItems.length,
    approved: mediaItems.filter(m => m.status === 'approved').length,
    pending: mediaItems.filter(m => m.status === 'pending').length,
    reported: mediaItems.filter(m => m.reportCount > 0).length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Medya Yönetimi</h2>
          <p className="text-gray-600 mt-1">Tüm fotoğraf ve videoları yönetin, onaylayın veya silin</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowBulkActions(!showBulkActions)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer flex items-center whitespace-nowrap ${
              showBulkActions 
                ? 'bg-blue-500 text-white' 
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            }`}
          >
            <i className="ri-checkbox-multiple-line mr-2"></i>
            Toplu Seçim
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer flex items-center whitespace-nowrap">
            <i className="ri-download-line mr-2"></i>
            Tümünü İndir
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-image-line text-blue-600 text-xl"></i>
            </div>
            <div>
              <p className="text-sm text-gray-600">Toplam Medya</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalMedia}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-checkbox-circle-line text-green-600 text-xl"></i>
            </div>
            <div>
              <p className="text-sm text-gray-600">Onaylanmış</p>
              <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
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
              <i className="ri-flag-line text-red-600 text-xl"></i>
            </div>
            <div>
              <p className="text-sm text-gray-600">Şikayet Edilen</p>
              <p className="text-2xl font-bold text-gray-900">{stats.reported}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {showBulkActions && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleSelectAll}
                className="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer"
              >
                <i className={`${selectedMedia.length === filteredMedia.length ? 'ri-checkbox-fill' : 'ri-checkbox-blank-line'} mr-2`}></i>
                {selectedMedia.length === filteredMedia.length ? 'Tümünü Kaldır' : 'Tümünü Seç'}
              </button>
              {selectedMedia.length > 0 && (
                <span className="text-blue-700 font-medium">
                  {selectedMedia.length} medya seçildi
                </span>
              )}
            </div>
            
            {selectedMedia.length > 0 && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleBulkAction('approve')}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer flex items-center"
                >
                  <i className="ri-check-line mr-1"></i>
                  Onayla
                </button>
                <button
                  onClick={() => handleBulkAction('reject')}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer flex items-center"
                >
                  <i className="ri-close-line mr-1"></i>
                  Reddet
                </button>
                <button
                  onClick={() => handleBulkAction('download')}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer flex items-center"
                >
                  <i className="ri-download-line mr-1"></i>
                  İndir
                </button>
                <button
                  onClick={() => handleBulkAction('delete')}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer flex items-center"
                >
                  <i className="ri-delete-bin-line mr-1"></i>
                  Sil
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Medya Tipi</label>
            <select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
            >
              <option value="all">Tüm Medya</option>
              <option value="image">Fotoğraflar</option>
              <option value="video">Videolar</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Durum</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
            >
              <option value="all">Tüm Durumlar</option>
              <option value="approved">Onaylanmış</option>
              <option value="pending">Onay Bekliyor</option>
              <option value="rejected">Reddedilmiş</option>
              <option value="private">Özel</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Arama</label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Başlık, yükleyen veya düğün ara..."
                className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <i className="ri-search-line absolute left-3 top-2.5 text-gray-400"></i>
            </div>
          </div>

          <div className="flex items-end gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg cursor-pointer ${
                viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <i className="ri-grid-line"></i>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg cursor-pointer ${
                viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <i className="ri-list-unordered"></i>
            </button>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          {filteredMedia.length} medya gösteriliyor
        </div>
      </div>

      {/* Media Grid/List */}
      <div className="bg-white rounded-lg shadow p-6">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMedia.map((media) => (
              <div key={media.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  {showBulkActions && (
                    <div className="absolute top-2 left-2 z-10">
                      <button
                        onClick={() => handleSelectMedia(media.id)}
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center cursor-pointer ${
                          selectedMedia.includes(media.id)
                            ? 'bg-blue-500 border-blue-500 text-white'
                            : 'bg-white border-gray-300 hover:border-blue-400'
                        }`}
                      >
                        {selectedMedia.includes(media.id) && (
                          <i className="ri-check-line text-xs"></i>
                        )}
                      </button>
                    </div>
                  )}
                  <img
                    src={media.url}
                    alt={media.title}
                    className="w-full h-48 object-cover object-top"
                  />
                  {media.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                        <i className="ri-play-fill text-xl text-gray-800"></i>
                      </div>
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(media.status)}`}>
                      {media.status === 'approved' ? 'Onaylandı' :
                       media.status === 'pending' ? 'Bekliyor' :
                       media.status === 'rejected' ? 'Reddedildi' : 'Özel'}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 truncate">{media.title}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Yükleyen:</span>
                      <span className="font-medium">{media.uploadedBy}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Rol:</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(media.uploaderRole)}`}>
                        {media.uploaderRole === 'couple' ? 'Çift' :
                         media.uploaderRole === 'guest' ? 'Misafir' : 'Mekan'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Düğün:</span>
                      <span className="text-xs text-gray-500 truncate max-w-24">{media.weddingTitle}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Boyut:</span>
                      <span className="font-medium">{media.fileSize}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t">
                    <div className="flex items-center space-x-3 text-sm text-gray-500">
                      <span className="flex items-center">
                        <i className="ri-heart-line mr-1"></i>
                        {media.likes}
                      </span>
                      <span className="flex items-center">
                        <i className="ri-download-line mr-1"></i>
                        {media.downloads}
                      </span>
                      {media.reportCount > 0 && (
                        <span className="flex items-center text-red-500">
                          <i className="ri-flag-line mr-1"></i>
                          {media.reportCount}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 cursor-pointer">
                        <i className="ri-eye-line"></i>
                      </button>
                      <button className="text-green-600 hover:text-green-800 cursor-pointer">
                        <i className="ri-download-line"></i>
                      </button>
                      <button className="text-red-600 hover:text-red-800 cursor-pointer">
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMedia.map((media) => (
              <div key={media.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                {showBulkActions && (
                  <button
                    onClick={() => handleSelectMedia(media.id)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer ${
                      selectedMedia.includes(media.id)
                        ? 'bg-blue-500 border-blue-500 text-white'
                        : 'bg-white border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    {selectedMedia.includes(media.id) && (
                      <i className="ri-check-line text-xs"></i>
                    )}
                  </button>
                )}
                <img
                  src={media.url}
                  alt={media.title}
                  className="w-16 h-16 object-cover object-top rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{media.title}</h3>
                  <p className="text-sm text-gray-600 truncate">{media.uploadedBy} • {media.weddingTitle}</p>
                  <p className="text-xs text-gray-500">{media.uploadDate} • {media.fileSize}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(media.uploaderRole)}`}>
                    {media.uploaderRole === 'couple' ? 'Çift' :
                     media.uploaderRole === 'guest' ? 'Misafir' : 'Mekan'}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(media.status)}`}>
                    {media.status === 'approved' ? 'Onaylandı' :
                     media.status === 'pending' ? 'Bekliyor' :
                     media.status === 'rejected' ? 'Reddedildi' : 'Özel'}
                  </span>
                  <div className="flex items-center space-x-3 text-sm text-gray-500">
                    <span className="flex items-center">
                      <i className="ri-heart-line mr-1"></i>
                      {media.likes}
                    </span>
                    <span className="flex items-center">
                      <i className="ri-download-line mr-1"></i>
                      {media.downloads}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 cursor-pointer">
                      <i className="ri-eye-line"></i>
                    </button>
                    <button className="text-green-600 hover:text-green-800 cursor-pointer">
                      <i className="ri-download-line"></i>
                    </button>
                    <button className="text-red-600 hover:text-red-800 cursor-pointer">
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredMedia.length === 0 && (
          <div className="text-center py-12">
            <i className="ri-image-line text-4xl text-gray-300 mb-4"></i>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Medya Bulunamadı</h3>
            <p className="text-gray-500">Seçilen filtrelere uygun medya bulunamadı.</p>
          </div>
        )}
      </div>
    </div>
  );
}