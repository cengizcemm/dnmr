
'use client';

import { useState } from 'react';

export default function MediaManagement() {
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');

  const pendingMedia = [
    { 
      id: 1, 
      couple: 'Sarah & Michael', 
      type: 'image', 
      filename: 'wedding_ceremony_01.jpg', 
      uploadTime: '2 saat önce', 
      size: '2.4 MB',
      category: 'ceremony',
      tags: ['ceremony', 'outdoor']
    },
    { 
      id: 2, 
      couple: 'Sarah & Michael', 
      type: 'video', 
      filename: 'first_dance.mp4', 
      uploadTime: '3 saat önce', 
      size: '45.2 MB',
      category: 'reception',
      tags: ['dance', 'reception']
    },
    { 
      id: 3, 
      couple: 'Emma & James', 
      type: 'image', 
      filename: 'engagement_photo.jpg', 
      uploadTime: '1 gün önce', 
      size: '3.1 MB',
      category: 'engagement',
      tags: ['engagement', 'portrait']
    },
    { 
      id: 4, 
      couple: 'Lisa & David', 
      type: 'image', 
      filename: 'venue_preparation.jpg', 
      uploadTime: '2 gün önce', 
      size: '1.8 MB',
      category: 'preparation',
      tags: ['venue', 'preparation']
    }
  ];

  const approvedMedia = [
    { 
      id: 5, 
      couple: 'Sarah & Michael', 
      type: 'image', 
      filename: 'couple_portrait.jpg', 
      approveTime: '1 gün önce', 
      size: '2.1 MB',
      category: 'portrait',
      tags: ['portrait', 'couple'],
      shareLink: 'https://example.com/share/abc123'
    },
    { 
      id: 6, 
      couple: 'Emma & James', 
      type: 'video', 
      filename: 'ceremony_highlights.mp4', 
      approveTime: '3 gün önce', 
      size: '67.3 MB',
      category: 'ceremony',
      tags: ['ceremony', 'highlights'],
      shareLink: 'https://example.com/share/def456'
    },
    { 
      id: 7, 
      couple: 'Lisa & David', 
      type: 'image', 
      filename: 'reception_setup.jpg', 
      approveTime: '1 hafta önce', 
      size: '2.8 MB',
      category: 'reception',
      tags: ['reception', 'setup'],
      shareLink: 'https://example.com/share/ghi789'
    }
  ];

  const categories = [
    { value: 'all', label: 'Tüm Kategoriler' },
    { value: 'ceremony', label: 'Nikah Töreni' },
    { value: 'reception', label: 'Düğün Resepsiyonu' },
    { value: 'portrait', label: 'Portre' },
    { value: 'engagement', label: 'Nişan' },
    { value: 'preparation', label: 'Hazırlık' }
  ];

  const tags = [
    { value: 'all', label: 'Tüm Etiketler' },
    { value: 'ceremony', label: 'Tören' },
    { value: 'reception', label: 'Resepsiyon' },
    { value: 'portrait', label: 'Portre' },
    { value: 'dance', label: 'Dans' },
    { value: 'outdoor', label: 'Açık Hava' }
  ];

  const handleSelectItem = (id: number) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleBulkApprove = () => {
    console.log('Bulk approved items:', selectedItems);
    setSelectedItems([]);
  };

  const handleBulkReject = () => {
    console.log('Bulk rejected items:', selectedItems);
    setSelectedItems([]);
  };

  const handleApprove = (id: number) => {
    console.log('Approved item:', id);
  };

  const handleReject = (id: number) => {
    console.log('Rejected item:', id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    console.log('Dropped files:', files);
    // Handle file upload
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    console.log('Selected files:', files);
    // Handle file upload
  };

  const getMediaIcon = (type: string) => {
    return type === 'video' ? 'ri-video-line' : 'ri-image-line';
  };

  const getMediaColor = (type: string) => {
    return type === 'video' ? 'text-purple-600' : 'text-blue-600';
  };

  const getCategoryLabel = (category: string) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.label : category;
  };

  const copyShareLink = (link: string) => {
    navigator.clipboard.writeText(link);
    // Show success message
  };

  const EmptyState = ({ type }: { type: string }) => (
    <div className="text-center py-12">
      <i className={`ri-${type === 'pending' ? 'upload-cloud' : 'check-double'}-line text-6xl text-gray-300 mb-4`}></i>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {type === 'pending' ? 'Bekleyen Medya Yok' : 'Onaylanmış Medya Yok'}
      </h3>
      <p className="text-gray-600 mb-6">
        {type === 'pending' 
          ? 'Çiftler henüz medya yüklememiş' 
          : 'Henüz onaylanmış medya bulunmuyor'
        }
      </p>
      {type === 'pending' && (
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer">
          <i className="ri-notification-line mr-2"></i>
          Çiftleri Bilgilendir
        </button>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Medya Yönetimi</h2>
        <div className="flex space-x-3">
          {selectedItems.length > 0 && (
            <>
              <button 
                onClick={handleBulkApprove}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer"
              >
                <i className="ri-check-line mr-2"></i>
                Onayla ({selectedItems.length})
              </button>
              <button 
                onClick={handleBulkReject}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer"
              >
                <i className="ri-close-line mr-2"></i>
                Reddet ({selectedItems.length})
              </button>
            </>
          )}
        </div>
      </div>

      {/* Bulk Upload Area */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Toplu Yükleme</h3>
        <div
          className={`border-2 border-dashed rounded-lg p-8 transition-colors ${
            isDragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="text-center">
            <i className="ri-cloud-upload-line text-4xl text-gray-400 mb-4"></i>
            <p className="text-lg font-medium text-gray-900 mb-2">
              Dosyaları buraya sürükleyip bırakın
            </p>
            <p className="text-gray-600 mb-4">
              veya bilgisayarınızdan seçin
            </p>
            <label className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer inline-block">
              <i className="ri-folder-open-line mr-2"></i>
              Dosya Seç
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            <p className="text-sm text-gray-500 mt-4">
              Desteklenen formatlar: JPG, PNG, GIF, MP4, MOV (Max: 100MB)
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Onay Bekleyen</p>
              <p className="text-2xl font-bold text-yellow-600">{pendingMedia.length}</p>
            </div>
            <i className="ri-time-line text-2xl text-yellow-500"></i>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Onaylandı</p>
              <p className="text-2xl font-bold text-green-600">{approvedMedia.length}</p>
            </div>
            <i className="ri-check-line text-2xl text-green-500"></i>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Toplam Boyut</p>
              <p className="text-2xl font-bold text-blue-600">234 MB</p>
            </div>
            <i className="ri-database-line text-2xl text-blue-500"></i>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
                activeTab === 'pending'
                  ? 'border-yellow-500 text-yellow-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Onay Bekleyen ({pendingMedia.length})
            </button>
            <button
              onClick={() => setActiveTab('approved')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
                activeTab === 'approved'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Onaylandı ({approvedMedia.length})
            </button>
          </nav>
        </div>

        {/* Filters */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-wrap gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm pr-8"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm pr-8"
            >
              {tags.map(tag => (
                <option key={tag.value} value={tag.value}>{tag.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'pending' && (
            <>
              {pendingMedia.length === 0 ? (
                <EmptyState type="pending" />
              ) : (
                <div className="space-y-4">
                  {pendingMedia.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleSelectItem(item.id)}
                        className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                      />
                      <div className={`w-10 h-10 ${getMediaColor(item.type)} flex items-center justify-center`}>
                        <i className={`${getMediaIcon(item.type)} text-xl`}></i>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{item.filename}</p>
                        <p className="text-sm text-gray-600">
                          {item.couple} • {item.uploadTime} • {item.size}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="bg-gray-100 text-gray-700 px-2 py-1 text-xs rounded">
                            {getCategoryLabel(item.category)}
                          </span>
                          {item.tags.map(tag => (
                            <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-1 text-xs rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          className="text-gray-600 hover:text-gray-900 p-2 cursor-pointer"
                          title="Önizleme"
                        >
                          <i className="ri-eye-line"></i>
                        </button>
                        <button 
                          onClick={() => handleApprove(item.id)}
                          className="text-green-600 hover:text-green-900 p-2 cursor-pointer"
                          title="Onayla"
                        >
                          <i className="ri-check-line"></i>
                        </button>
                        <button 
                          onClick={() => handleReject(item.id)}
                          className="text-red-600 hover:text-red-900 p-2 cursor-pointer"
                          title="Reddet"
                        >
                          <i className="ri-close-line"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === 'approved' && (
            <>
              {approvedMedia.length === 0 ? (
                <EmptyState type="approved" />
              ) : (
                <div className="space-y-4">
                  {approvedMedia.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className={`w-10 h-10 ${getMediaColor(item.type)} flex items-center justify-center`}>
                        <i className={`${getMediaIcon(item.type)} text-xl`}></i>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{item.filename}</p>
                        <p className="text-sm text-gray-600">
                          {item.couple} • Onaylandı: {item.approveTime} • {item.size}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="bg-gray-100 text-gray-700 px-2 py-1 text-xs rounded">
                            {getCategoryLabel(item.category)}
                          </span>
                          {item.tags.map(tag => (
                            <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-1 text-xs rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          className="text-gray-600 hover:text-gray-900 p-2 cursor-pointer"
                          title="Önizleme"
                        >
                          <i className="ri-eye-line"></i>
                        </button>
                        <button 
                          className="text-gray-600 hover:text-gray-900 p-2 cursor-pointer"
                          title="İndir"
                        >
                          <i className="ri-download-line"></i>
                        </button>
                        <button 
                          onClick={() => copyShareLink(item.shareLink)}
                          className="text-blue-600 hover:text-blue-900 p-2 cursor-pointer"
                          title="Paylaşım Linki Kopyala"
                        >
                          <i className="ri-share-line"></i>
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-900 p-2 cursor-pointer"
                          title="Sil"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
