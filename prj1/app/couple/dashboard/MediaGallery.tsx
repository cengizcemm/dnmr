'use client';

import { useState } from 'react';
import ImageLightbox from '../../../components/ImageLightbox';

export default function MediaGallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<number[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const [mediaFiles, setMediaFiles] = useState([
    {
      id: 1,
      type: 'image' as const,
      url: 'https://readdy.ai/api/search-image?query=Beautiful%20wedding%20ceremony%20moment%2C%20bride%20and%20groom%20exchanging%20vows%2C%20romantic%20wedding%20photography%2C%20elegant%20wedding%20venue%2C%20love%20and%20happiness&width=400&height=300&seq=wedding-1&orientation=landscape',
      title: 'Nikah Töreni',
      uploadedBy: 'Emma Wilson',
      uploadDate: '2024-03-15',
      likes: 12,
      approved: true,
      liked: false,
      comments: [
        { id: 1, user: 'James Brown', text: 'Çok güzel bir anıydı! 😍', timestamp: '2 saat önce' },
        { id: 2, user: 'Lisa Garcia', text: 'Harika fotoğraf, tebrikler!', timestamp: '1 saat önce' }
      ]
    },
    {
      id: 2,
      type: 'image' as const,
      url: 'https://readdy.ai/api/search-image?query=Wedding%20reception%20dance%20floor%2C%20couple%20dancing%2C%20celebration%2C%20wedding%20party%2C%20joyful%20moments%2C%20romantic%20lighting&width=400&height=300&seq=wedding-2&orientation=landscape',
      title: 'İlk Dans',
      uploadedBy: 'James Brown',
      uploadDate: '2024-03-15',
      likes: 8,
      approved: true,
      liked: true,
      comments: [
        { id: 3, user: 'Anna Taylor', text: 'Ne kadar romantik! ❤️', timestamp: '3 saat önce' }
      ]
    },
    {
      id: 3,
      type: 'video' as const,
      url: 'https://readdy.ai/api/search-image?query=Wedding%20video%20thumbnail%2C%20bride%20and%20groom%20video%2C%20wedding%20cinematography%2C%20romantic%20video%20scene%2C%20wedding%20memories&width=400&height=300&seq=wedding-video-1&orientation=landscape',
      title: 'Düğün Hikayesi',
      uploadedBy: 'Lisa Garcia',
      uploadDate: '2024-03-14',
      likes: 15,
      approved: false,
      liked: false,
      duration: '2:34',
      comments: []
    },
    {
      id: 4,
      type: 'image' as const,
      url: 'https://readdy.ai/api/search-image?query=Wedding%20group%20photo%2C%20family%20and%20friends%2C%20wedding%20guests%2C%20celebration%20photo%2C%20happy%20people%20at%20wedding&width=400&height=300&seq=wedding-3&orientation=landscape',
      title: 'Aile Fotoğrafı',
      uploadedBy: 'David Martinez',
      uploadDate: '2024-03-13',
      likes: 20,
      approved: true,
      liked: false,
      comments: [
        { id: 4, user: 'Michael Davis', text: 'Herkes çok mutlu görünüyor!', timestamp: '1 gün önce' },
        { id: 5, user: 'Sarah Johnson', text: 'Muhteşem bir kare 📸', timestamp: '1 gün önce' }
      ]
    },
    {
      id: 5,
      type: 'image' as const,
      url: 'https://readdy.ai/api/search-image?query=Wedding%20cake%20cutting%20ceremony%2C%20bride%20and%20groom%20cutting%20cake%2C%20wedding%20tradition%2C%20sweet%20moments%2C%20celebration&width=400&height=300&seq=wedding-4&orientation=landscape',
      title: 'Pasta Kesimi',
      uploadedBy: 'Anna Taylor',
      uploadDate: '2024-03-12',
      likes: 6,
      approved: true,
      liked: false,
      comments: []
    },
    {
      id: 6,
      type: 'video' as const,
      url: 'https://readdy.ai/api/search-image?query=Wedding%20entrance%20video%2C%20bride%20and%20walker%20down%20aisle%2C%20wedding%20ceremony%20video%2C%20emotional%20moments%2C%20wedding%20videography&width=400&height=300&seq=wedding-video-2&orientation=landscape',
      title: 'Gelin Girişi',
      uploadedBy: 'Michael Davis',
      uploadDate: '2024-03-11',
      likes: 18,
      approved: true,
      liked: true,
      duration: '1:45',
      comments: [
        { id: 6, user: 'Emma Wilson', text: 'Gözyaşlarımı tutamadım 😭❤️', timestamp: '2 gün önce' }
      ]
    }
  ]);

  const filters = [
    { id: 'all', label: 'Tümü', count: mediaFiles.length },
    { id: 'image', label: 'Fotoğraflar', count: mediaFiles.filter(m => m.type === 'image').length },
    { id: 'video', label: 'Videolar', count: mediaFiles.filter(m => m.type === 'video').length },
    { id: 'pending', label: 'Onay Bekleyen', count: mediaFiles.filter(m => !m.approved).length }
  ];

  const stats = {
    totalMedia: mediaFiles.length,
    totalLikes: mediaFiles.reduce((sum, media) => sum + media.likes, 0),
    pendingApproval: mediaFiles.filter(m => !m.approved).length,
    contributors: [...new Set(mediaFiles.map(m => m.uploadedBy))].length
  };

  const handleSelectAll = () => {
    if (selectedMedia.length === filteredMedia.length) {
      setSelectedMedia([]);
    } else {
      setSelectedMedia(filteredMedia.map(media => media.id));
    }
  };

  const handleSelectMedia = (mediaId: number) => {
    setSelectedMedia(prev =>
      prev.includes(mediaId)
        ? prev.filter(id => id !== mediaId)
        : [...prev, mediaId]
    );
  };

  const handleBulkDownload = () => {
    if (selectedMedia.length === 0) {
      alert('Lütfen indirmek için en az bir medya seçin');
      return;
    }

    const selectedFiles = filteredMedia.filter(media => selectedMedia.includes(media.id));
    alert(`${selectedFiles.length} dosya indiriliyor...`);
    console.log('İndirilecek dosyalar:', selectedFiles);

    setSelectedMedia([]);
    setShowBulkActions(false);
  };

  const handleBulkDelete = () => {
    if (selectedMedia.length === 0) {
      alert('Lütfen silmek için en az bir medya seçin');
      return;
    }

    if (confirm(`${selectedMedia.length} dosyayı silmek istediğinizden emin misiniz?`)) {
      alert(`${selectedMedia.length} dosya silindi!`);
      setSelectedMedia([]);
      setShowBulkActions(false);
    }
  };

  const filteredMedia = mediaFiles.filter(media => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'pending') return !media.approved;
    return media.type === activeFilter;
  });

  const imageFiles = filteredMedia.filter(media => media.type === 'image');

  const handleImageClick = (index: number) => {
    const imageIndex = imageFiles.findIndex(img => img.id === filteredMedia[index].id);
    if (imageIndex !== -1) {
      setLightboxIndex(imageIndex);
      setLightboxOpen(true);
    }
  };

  const handleLike = (imageId: number) => {
    setMediaFiles(prev =>
      prev.map(media => {
        if (media.id === imageId) {
          return {
            ...media,
            liked: !media.liked,
            likes: media.liked ? media.likes - 1 : media.likes + 1
          };
        }
        return media;
      })
    );
  };

  const handleComment = (imageId: number, comment: string) => {
    setMediaFiles(prev =>
      prev.map(media => {
        if (media.id === imageId) {
          const newComment = {
            id: Date.now(),
            user: 'Sarah & Michael',
            text: comment,
            timestamp: 'şimdi'
          };
          return {
            ...media,
            comments: [...media.comments, newComment]
          };
        }
        return media;
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Medya Galerisi</h2>
            <p className="text-gray-600">Düğününüzden paylaşılan tüm fotoğraf ve videoları görüntüleyin</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowBulkActions(!showBulkActions)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center ${
                showBulkActions
                  ? 'bg-blue-500 text-white'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              <i className="ri-checkbox-multiple-line mr-2"></i>
              Toplu Seçim
            </button>
            <button
              onClick={() => setShowUploadModal(true)}
              className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-upload-line mr-2"></i>
              Medya Yükle
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Toplam Medya</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalMedia}</p>
            </div>
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <i className="ri-image-line text-white text-lg"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Toplam Beğeni</p>
              <p className="text-2xl font-bold text-rose-600">{stats.totalLikes}</p>
            </div>
            <div className="w-10 h-10 bg-rose-500 rounded-lg flex items-center justify-center">
              <i className="ri-heart-line text-white text-lg"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Onay Bekleyen</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pendingApproval}</p>
            </div>
            <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
              <i className="ri-time-line text-white text-lg"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Katkıda Bulunan</p>
              <p className="text-2xl font-bold text-green-600">{stats.contributors}</p>
            </div>
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <i className="ri-group-line text-white text-lg"></i>
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
                  {selectedMedia.length} dosya seçildi
                </span>
              )}
            </div>

            {selectedMedia.length > 0 && (
              <div className="flex gap-2">
                <button
                  onClick={handleBulkDownload}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer flex items-center"
                >
                  <i className="ri-download-line mr-2"></i>
                  İndir ({selectedMedia.length})
                </button>
                <button
                  onClick={handleBulkDelete}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer flex items-center"
                >
                  <i className="ri-delete-bin-line mr-2"></i>
                  Sil ({selectedMedia.length})
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Filters and View Controls */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  activeFilter === filter.id
                    ? 'bg-rose-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg cursor-pointer ${
                viewMode === 'grid' ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <i className="ri-grid-line"></i>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg cursor-pointer ${
                viewMode === 'list' ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <i className="ri-list-unordered"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Media Gallery */}
      <div className="bg-white rounded-lg shadow p-6">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMedia.map((media, index) => (
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
                    className="w-full h-48 object-cover object-top cursor-pointer"
                    onClick={() => media.type === 'image' && handleImageClick(index)}
                  />
                  {media.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                        <i className="ri-play-fill text-2xl text-gray-800"></i>
                      </div>
                      {media.duration && (
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                          {media.duration}
                        </div>
                      )}
                    </div>
                  )}
                  {!media.approved && (
                    <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs">
                      Onay Bekliyor
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{media.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {media.uploadedBy} tarafından yüklendi
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{media.uploadDate}</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleLike(media.id)}
                        className={`flex items-center space-x-1 cursor-pointer transition-colors ${
                          media.liked ? 'text-rose-500' : 'text-gray-600 hover:text-rose-500'
                        }`}
                      >
                        <i className={`${media.liked ? 'ri-heart-fill' : 'ri-heart-line'}`}></i>
                        <span className="text-sm">{media.likes}</span>
                      </button>
                      <button
                        onClick={() => media.type === 'image' && handleImageClick(index)}
                        className="text-gray-400 hover:text-gray-600 cursor-pointer"
                      >
                        <i className="ri-chat-3-line"></i>
                        <span className="text-sm ml-1">{media.comments?.length || 0}</span>
                      </button>
                      <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                        <i className="ri-download-line"></i>
                      </button>
                      <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                        <i className="ri-share-line"></i>
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
                      <i className="ri-check-line"></i>
                    )}
                  </button>
                )}
                <img
                  src={media.url}
                  alt={media.title}
                  className="w-16 h-16 object-cover object-top rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{media.title}</h3>
                  <p className="text-sm text-gray-600">{media.uploadedBy} • {media.uploadDate}</p>
                </div>
                <div className="flex items-center space-x-4">
                  {!media.approved && (
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                      Onay Bekliyor
                    </span>
                  )}
                  <div className="flex items-center space-x-1 text-rose-500">
                    <i className="ri-heart-line"></i>
                    <span className="text-sm">{media.likes}</span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                    <i className="ri-download-line"></i>
                  </button>
                  <button className="text-gray-600 hover:text-gray-800 cursor-pointer">
                    <i className="ri-more-line"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <ImageLightbox
        images={imageFiles}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onLike={handleLike}
        onComment={handleComment}
      />

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Medya Yükle</h3>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <i className="ri-upload-cloud-line text-4xl text-gray-400 mb-4"></i>
                <p className="text-gray-600 mb-2">Dosyaları buraya sürükleyin</p>
                <p className="text-sm text-gray-500 mb-4">veya</p>
                <button className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg cursor-pointer">
                  Dosya Seç
                </button>
                <p className="text-xs text-gray-500 mt-4">
                  Maksimum dosya boyutu: 10MB<br/>
                  Desteklenen formatlar: JPG, PNG, MP4, MOV
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Başlık
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Medya başlığı girin"
                />
              </div>
              <div className="flex gap-4">
                <button className="flex-1 bg-rose-500 hover:bg-rose-600 text-white py-2 px-4 rounded-lg font-medium transition-colors cursor-pointer">
                  Yükle
                </button>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-medium transition-colors cursor-pointer"
                >
                  İptal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
