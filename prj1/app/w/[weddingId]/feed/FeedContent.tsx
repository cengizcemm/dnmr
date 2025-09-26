
'use client';

import { useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function FeedContent() {
  const params = useParams();
  const weddingId = params.weddingId as string;
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [newPost, setNewPost] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  // Mock wedding data
  const weddingData = {
    'WEDDING-2024-SARAH-MICHAEL': {
      couple: 'Sarah & Michael',
      date: '2024-06-15',
      venue: 'Grand Rose Garden'
    },
    'WEDDING-2024-JOHN-JANE': {
      couple: 'John & Jane',
      date: '2024-08-20',
      venue: 'Sunset Beach Resort'
    },
    'WEDDING-2023-ALEX-EMMA': {
      couple: 'Alex & Emma',
      date: '2023-09-10',
      venue: 'Garden Paradise'
    },
    'WEDDING-2023-DAVID-LISA': {
      couple: 'David & Lisa',
      date: '2023-12-05',
      venue: 'Luxury Hotel Ballroom'
    },
    'WEDDING-2024-DEMO': {
      couple: 'Demo Wedding',
      date: '2024-07-30',
      venue: 'Demo Venue'
    }
  };

  const currentWedding = weddingData[weddingId as keyof typeof weddingData] || weddingData['WEDDING-2024-SARAH-MICHAEL'];

  // Mock posts data
  const feedPosts = [
    {
      id: 1,
      author: 'Sarah Johnson',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20woman%20portrait%2C%20elegant%20bride%20photo%2C%20wedding%20portrait%20photography%2C%20beautiful%20woman%20headshot&width=100&height=100&seq=avatar-1&orientation=squarish',
      content: 'Bu muhteşem günü sizinle paylaşmaktan çok mutluyuz! ❤️',
      image: 'https://readdy.ai/api/search-image?query=Beautiful%20wedding%20ceremony%20moment%2C%20bride%20walking%20down%20aisle%2C%20elegant%20wedding%20venue%2C%20romantic%20atmosphere%2C%20wedding%20celebration&width=600&height=400&seq=feed-post-1&orientation=landscape',
      likes: 24,
      comments: 5,
      timestamp: '2 saat önce',
      isCouple: true
    },
    {
      id: 2,
      author: 'Ahmet Kaya',
      avatar: 'https://readdy.ai/api/search-image?query=Friendly%20man%20portrait%2C%20wedding%20guest%20photo%2C%20happy%20man%20headshot%2C%20professional%20portrait%20photography&width=100&height=100&seq=avatar-2&orientation=squarish',
      content: 'Harika bir tören! Çok duygusal anlar yaşadık 🥰',
      image: 'https://readdy.ai/api/search-image?query=Wedding%20reception%20celebration%2C%20guests%20dancing%2C%20happy%20wedding%20party%2C%20joyful%20moments%2C%20wedding%20dance%20floor&width=600&height=400&seq=feed-post-2&orientation=landscape',
      likes: 18,
      comments: 3,
      timestamp: '4 saat önce',
      isCouple: false
    },
    {
      id: 3,
      author: 'Ayşe Demir',
      avatar: 'https://readdy.ai/api/search-image?query=Elegant%20woman%20portrait%2C%20wedding%20guest%20photo%2C%20beautiful%20woman%20headshot%2C%20professional%20portrait%20photography&width=100&height=100&seq=avatar-3&orientation=squarish',
      content: 'Pastası enfesti! Tebrikler çiftimize 🎂',
      image: 'https://readdy.ai/api/search-image?query=Wedding%20cake%20cutting%20ceremony%2C%20elegant%20three%20tier%20cake%2C%20romantic%20moment%2C%20celebration%2C%20beautiful%20wedding%20cake&width=600&height=400&seq=feed-post-3&orientation=landscape',
      likes: 31,
      comments: 8,
      timestamp: '6 saat önce',
      isCouple: false
    },
    {
      id: 4,
      author: 'Michael Thompson',
      avatar: 'https://readdy.ai/api/search-image?query=Handsome%20man%20portrait%2C%20elegant%20groom%20photo%2C%20wedding%20portrait%20photography%2C%20professional%20man%20headshot&width=100&height=100&seq=avatar-4&orientation=squarish',
      content: 'Hayatımın en güzel günü! Teşekkürler herkese 🙏',
      likes: 42,
      comments: 12,
      timestamp: '8 saat önce',
      isCouple: true
    },
    {
      id: 5,
      author: 'Elif Özkan',
      avatar: 'https://readdy.ai/api/search-image?query=Young%20woman%20portrait%2C%20wedding%20guest%20photo%2C%20smiling%20woman%20headshot%2C%20professional%20portrait%20photography&width=100&height=100&seq=avatar-5&orientation=squarish',
      content: 'Grup fotoğraflarımız çok güzel çıktı! Mutlu aile 👨‍👩‍👧‍👦',
      image: 'https://readdy.ai/api/search-image?query=Wedding%20group%20photo%2C%20family%20and%20friends%2C%20happy%20wedding%20guests%2C%20celebration%20group%20picture%2C%20wedding%20family%20photo&width=600&height=400&seq=feed-post-4&orientation=landscape',
      likes: 27,
      comments: 6,
      timestamp: '10 saat önce',
      isCouple: false
    }
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(files);
  };

  const handleCreatePost = () => {
    if (!newPost.trim() && selectedFiles.length === 0) {
      alert('Lütfen bir mesaj yazın veya fotoğraf ekleyin');
      return;
    }
    
    alert('Gönderiniz başarıyla paylaşıldı!');
    setNewPost('');
    setSelectedFiles([]);
    setShowUploadModal(false);
  };

  const toggleLike = (postId: number) => {
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/guest/dashboard" className="text-rose-600 hover:text-rose-700 cursor-pointer">
                <i className="ri-arrow-left-line text-xl"></i>
              </Link>
              <div>
                <h1 className="text-xl font-['Pacifico'] text-rose-800">{currentWedding.couple}</h1>
                <p className="text-sm text-gray-600">Düğün Akışı</p>
              </div>
            </div>
            <button 
              onClick={() => setShowUploadModal(true)}
              className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer flex items-center shadow-lg"
            >
              <i className="ri-add-line mr-2"></i>
              Paylaş
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Wedding Info Banner */}
        <div className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl text-white p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">{currentWedding.couple}</h2>
              <p className="opacity-90 flex items-center">
                <i className="ri-calendar-line mr-2"></i>
                {new Date(currentWedding.date).toLocaleDateString('tr-TR', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })} • {currentWedding.venue}
              </p>
            </div>
            <Link
              href={`/guest/${weddingId}?view=profile&ref=guest`}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer"
            >
              <i className="ri-user-heart-line mr-2"></i>
              Profili Görüntüle
            </Link>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {feedPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-2xl shadow-sm border p-6">
              {/* Post Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img 
                    src={post.avatar} 
                    alt={post.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-900">{post.author}</h3>
                      {post.isCouple && (
                        <span className="bg-rose-100 text-rose-800 text-xs px-2 py-1 rounded-full font-medium">
                          Çift
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{post.timestamp}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                  <i className="ri-more-line text-xl"></i>
                </button>
              </div>

              {/* Post Content */}
              <div className="mb-4">
                <p className="text-gray-800 leading-relaxed">{post.content}</p>
              </div>

              {/* Post Image */}
              {post.image && (
                <div className="mb-4">
                  <img 
                    src={post.image} 
                    alt="Post image"
                    className="w-full rounded-xl object-cover max-h-96"
                  />
                </div>
              )}

              {/* Post Actions */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-6">
                  <button 
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center space-x-2 cursor-pointer transition-colors ${
                      likedPosts.includes(post.id) 
                        ? 'text-rose-600' 
                        : 'text-gray-500 hover:text-rose-600'
                    }`}
                  >
                    <i className={`ri-heart-${likedPosts.includes(post.id) ? 'fill' : 'line'} text-xl`}></i>
                    <span className="font-medium">
                      {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                    </span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 cursor-pointer transition-colors">
                    <i className="ri-chat-3-line text-xl"></i>
                    <span className="font-medium">{post.comments}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-green-600 cursor-pointer transition-colors">
                    <i className="ri-share-line text-xl"></i>
                  </button>
                </div>
                <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                  <i className="ri-bookmark-line text-xl"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer">
            <i className="ri-arrow-down-line mr-2"></i>
            Daha Fazla Yükle
          </button>
        </div>
      </div>

      {/* Create Post Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Yeni Gönderi</h3>
              <button 
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value.slice(0, 500))}
                  placeholder="Bu özel günle ilgili düşüncelerinizi paylaşın..."
                  rows={4}
                  maxLength={500}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm resize-none"
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">{newPost.length}/500 karakter</p>
              </div>

              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-rose-400 hover:bg-rose-50 transition-all cursor-pointer"
                >
                  <i className="ri-image-add-line text-3xl text-gray-400 mb-2"></i>
                  <p className="text-gray-600 font-medium">Fotoğraf/Video Ekle</p>
                  <p className="text-sm text-gray-500 mt-1">PNG, JPG, MP4 destekleniyor</p>
                </button>
              </div>

              {selectedFiles.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-3">Seçilen Dosyalar ({selectedFiles.length}):</p>
                  <div className="space-y-2">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <i className={`${file.type.startsWith('image/') ? 'ri-image-line' : 'ri-video-line'} text-gray-500`}></i>
                          <span className="text-sm text-gray-700 truncate">{file.name}</span>
                        </div>
                        <button 
                          onClick={() => setSelectedFiles(files => files.filter((_, i) => i !== index))}
                          className="text-red-500 hover:text-red-700 cursor-pointer p-1"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer"
                >
                  İptal
                </button>
                <button
                  onClick={handleCreatePost}
                  className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white py-3 px-4 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-send-plane-line mr-2"></i>
                  Paylaş
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
