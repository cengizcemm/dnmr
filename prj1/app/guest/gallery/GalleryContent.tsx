
'use client';

import { useState } from 'react';
import GuestHeader from '../dashboard/GuestHeader';
import GuestSidebar from '../dashboard/GuestSidebar';

export default function GalleryContent() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const galleryItems = [
    {
      id: 1,
      type: 'image',
      url: 'https://readdy.ai/api/search-image?query=Wedding%20ceremony%20beautiful%20moment%2C%20bride%20and%20groom%2C%20elegant%20wedding%20photography%2C%20romantic%20wedding%20scene&width=400&height=300&seq=gallery-1&orientation=landscape',
      title: 'Nikah Töreni',
      weddingCouple: 'Sarah & Michael',
      date: '2024-03-15',
      likes: 8
    },
    {
      id: 2,
      type: 'image',
      url: 'https://readdy.ai/api/search-image?query=Wedding%20reception%20dance%20floor%2C%20happy%20celebration%2C%20wedding%20party%20dancing%2C%20joyful%20wedding%20moments&width=400&height=300&seq=gallery-2&orientation=landscape',
      title: 'Dans Gecesi',
      weddingCouple: 'Sarah & Michael',
      date: '2024-03-15',
      likes: 12
    },
    {
      id: 3,
      type: 'video',
      url: 'https://readdy.ai/api/search-image?query=Wedding%20video%20thumbnail%2C%20romantic%20wedding%20video%2C%20bride%20and%20groom%20cinematic%20moment%2C%20wedding%20videography&width=400&height=300&seq=gallery-video-1&orientation=landscape',
      title: 'Düğün Hikayesi',
      weddingCouple: 'Emma & James',
      date: '2024-02-20',
      likes: 15,
      duration: '2:34'
    },
    {
      id: 4,
      type: 'image',
      url: 'https://readdy.ai/api/search-image?query=Wedding%20group%20photo%2C%20family%20wedding%20photo%2C%20happy%20wedding%20guests%2C%20celebration%20group%20picture&width=400&height=300&seq=gallery-3&orientation=landscape',
      title: 'Aile Fotoğrafı',
      weddingCouple: 'Lisa & David',
      date: '2024-01-10',
      likes: 9
    }
  ];

  const filters = [
    { id: 'all', label: 'Tümü', count: galleryItems.length },
    { id: 'image', label: 'Fotoğraflar', count: galleryItems.filter(item => item.type === 'image').length },
    { id: 'video', label: 'Videolar', count: galleryItems.filter(item => item.type === 'video').length }
  ];

  const filteredItems = galleryItems.filter(item => {
    if (activeFilter === 'all') return true;
    return item.type === activeFilter;
  });

  const handleDownload = (item: any) => {
    const link = document.createElement('a');
    link.href = item.url;
    link.download = `${item.title.toLowerCase().replace(/\s+/g, '-')}-${item.id}.${item.type === 'video' ? 'mp4' : 'jpg'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <GuestHeader />
      
      <div className="flex">
        <GuestSidebar />
        
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Fotoğraf Galerim</h1>
              <p className="text-gray-600">Katıldığınız düğünlerden paylaşılan anıları görüntüleyin</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Toplam Medya</p>
                    <p className="text-2xl font-bold text-gray-900">{galleryItems.length}</p>
                  </div>
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <i className="ri-image-line text-white text-lg"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Fotoğraflar</p>
                    <p className="text-2xl font-bold text-green-600">{galleryItems.filter(i => i.type === 'image').length}</p>
                  </div>
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <i className="ri-camera-line text-white text-lg"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Videolar</p>
                    <p className="text-2xl font-bold text-purple-600">{galleryItems.filter(i => i.type === 'video').length}</p>
                  </div>
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                    <i className="ri-video-line text-white text-lg"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Toplam Beğeni</p>
                    <p className="text-2xl font-bold text-rose-600">{galleryItems.reduce((sum, item) => sum + item.likes, 0)}</p>
                  </div>
                  <div className="w-10 h-10 bg-rose-500 rounded-lg flex items-center justify-center">
                    <i className="ri-heart-line text-white text-lg"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters and View Controls */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
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

            {/* Gallery */}
            <div className="bg-white rounded-lg shadow p-6">
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems.map((item) => (
                    <div key={item.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <img
                          src={item.url}
                          alt={item.title}
                          className="w-full h-48 object-cover object-top"
                        />
                        {item.type === 'video' && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                              <i className="ri-play-fill text-2xl text-gray-800"></i>
                            </div>
                            {item.duration && (
                              <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                                {item.duration}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-sm text-rose-600 mb-2">{item.weddingCouple}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{item.date}</span>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1 text-rose-500">
                              <i className="ri-heart-fill"></i>
                              <span className="text-sm">{item.likes}</span>
                            </div>
                            <button 
                              onClick={() => handleDownload(item)}
                              className="text-gray-400 hover:text-gray-600 cursor-pointer"
                              title="İndir"
                            >
                              <i className="ri-download-line"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-16 h-16 object-cover object-top rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                        <p className="text-sm text-rose-600">{item.weddingCouple}</p>
                        <p className="text-xs text-gray-500">{item.date}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 text-rose-500">
                          <i className="ri-heart-fill"></i>
                          <span className="text-sm">{item.likes}</span>
                        </div>
                        <button 
                          onClick={() => handleDownload(item)}
                          className="text-gray-400 hover:text-gray-600 cursor-pointer"
                          title="İndir"
                        >
                          <i className="ri-download-line"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Empty State */}
            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <i className="ri-image-line text-6xl text-gray-300 mb-4"></i>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Henüz medya yok</h3>
                <p className="text-gray-600">Katıldığınız düğünlerden paylaşılan fotoğraf ve videolar burada görünecek</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
