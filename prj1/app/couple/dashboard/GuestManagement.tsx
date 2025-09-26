
'use client';

import { useState } from 'react';

export default function GuestManagement() {
  const [activeTab, setActiveTab] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showUploadSettings, setShowUploadSettings] = useState(false);
  const [showPendingModal, setShowPendingModal] = useState(false);
  const [showMediaGallery, setShowMediaGallery] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState<any>(null);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [uploadSettings, setUploadSettings] = useState({
    enabled: true,
    allowedDate: '2024-06-15',
    autoOpen: true
  });
  const [newGuest, setNewGuest] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'family',
    tableNumber: ''
  });

  const [guests, setGuests] = useState([
    { id: 1, name: 'Emma Wilson', email: 'emma@email.com', phone: '+90 555 123 4567', status: 'confirmed', category: 'family', tableNumber: '1', plusOne: true },
    { id: 2, name: 'James Brown', email: 'james@email.com', phone: '+90 555 234 5678', status: 'confirmed', category: 'friends', tableNumber: '3', plusOne: false },
    { id: 3, name: 'Lisa Garcia', email: 'lisa@email.com', phone: '+90 555 345 6789', status: 'pending', category: 'work', tableNumber: '5', plusOne: true },
    { id: 4, name: 'David Martinez', email: 'david@email.com', phone: '+90 555 456 7890', status: 'declined', category: 'family', tableNumber: '2', plusOne: false },
    { id: 5, name: 'Anna Taylor', email: 'anna@email.com', phone: '+90 555 567 8901', status: 'confirmed', category: 'friends', tableNumber: '4', plusOne: true }
  ]);

  // Yeni medya galerisi yapısı - klasörlere göre
  const [mediaGallery, setMediaGallery] = useState({
    'Emma Wilson': [
      {
        id: 1,
        type: 'image',
        url: 'https://readdy.ai/api/search-image?query=Wedding%20ceremony%20photo%2C%20bride%20and%20groom%2C%20beautiful%20moment%2C%20romantic%20wedding%20photography&width=400&height=300&seq=emma-1&orientation=landscape',
        title: 'Nikah Töreni',
        uploadDate: '2024-03-15',
        likes: 12,
        comments: [
          { id: 1, user: 'James Brown', text: 'Çok güzel bir anıydı! 😍', timestamp: '2 saat önce' },
          { id: 2, user: 'Lisa Garcia', text: 'Harika fotoğraf, tebrikler!', timestamp: '1 saat önce' }
        ],
        liked: false
      },
      {
        id: 2,
        type: 'image',
        url: 'https://readdy.ai/api/search-image?query=Wedding%20cake%20cutting%20ceremony%2C%20bride%20and%20groom%20cutting%20cake%2C%20celebration%20moment&width=400&height=300&seq=emma-2&orientation=landscape',
        title: 'Pasta Kesimi',
        uploadDate: '2024-03-15',
        likes: 8,
        comments: [],
        liked: false
      }
    ],
    'James Brown': [
      {
        id: 3,
        type: 'image',
        url: 'https://readdy.ai/api/search-image?query=Wedding%20reception%20dance%20floor%2C%20couple%20dancing%2C%20celebration%2C%20wedding%20party&width=400&height=300&seq=james-1&orientation=landscape',
        title: 'İlk Dans',
        uploadDate: '2024-03-15',
        likes: 15,
        comments: [
          { id: 3, user: 'Anna Taylor', text: 'Ne kadar romantik! ❤️', timestamp: '3 saat önce' }
        ],
        liked: true
      }
    ],
    'Lisa Garcia': [
      {
        id: 4,
        type: 'video',
        url: 'https://readdy.ai/api/search-image?query=Wedding%20video%20thumbnail%2C%20bride%20and%20groom%20video%2C%20wedding%20cinematography&width=400&height=300&seq=lisa-1&orientation=landscape',
        title: 'Düğün Hikayesi',
        uploadDate: '2024-03-14',
        likes: 20,
        duration: '2:34',
        comments: [],
        liked: false
      },
      {
        id: 5,
        type: 'image',
        url: 'https://readdy.ai/api/search-image?query=Wedding%20group%20photo%2C%20family%20and%20friends%2C%20wedding%20guests%2C%20celebration%20photo&width=400&height=300&seq=lisa-2&orientation=landscape',
        title: 'Grup Fotoğrafı',
        uploadDate: '2024-03-14',
        likes: 18,
        comments: [
          { id: 4, user: 'Michael Davis', text: 'Herkes çok mutlu görünüyor!', timestamp: '1 gün önce' }
        ],
        liked: false
      }
    ]
  });

  // Onay bekleyen tüm içerikler (fotoğraf, video, sesli mesaj, not)
  const [pendingContent, setPendingContent] = useState([
    {
      id: 1,
      type: 'image',
      guestName: 'Emma Wilson',
      fileName: 'wedding-photo-1.jpg',
      uploadDate: '2024-03-15',
      message: 'Çok güzel bir anıydı!',
      preview: 'https://readdy.ai/api/search-image?query=Wedding%20ceremony%20photo%2C%20bride%20and%20groom%2C%20beautiful%20moment%2C%20romantic%20wedding%20photography&width=200&height=200&seq=pending-1&orientation=squarish'
    },
    {
      id: 2,
      type: 'video',
      guestName: 'James Brown',
      fileName: 'reception-dance.mp4',
      uploadDate: '2024-03-15',
      message: 'Dans pisti çok eğlenceliydi!',
      preview: 'https://readdy.ai/api/search-image?query=Wedding%20reception%20dance%20floor%2C%20celebration%2C%20party%20atmosphere%2C%20joyful%20moments&width=200&height=200&seq=pending-2&orientation=squarish'
    },
    {
      id: 3,
      type: 'audio',
      guestName: 'Lisa Garcia',
      fileName: 'voice-message-1.mp3',
      uploadDate: '2024-03-14',
      message: 'Sesli mesaj: Çok mutlu oldum sizin için...',
      duration: '2:15',
      audioUrl: '#'
    },
    {
      id: 4,
      type: 'note',
      guestName: 'Anna Taylor',
      content: 'Bugün çok güzel bir gün oldu. Sizin mutluluğunuzu görmek beni çok mutlu etti. Hayatınızın geri kalanında da bu kadar mutlu olmanızı diliyorum. Sevgiler!',
      uploadDate: '2024-03-13',
      title: 'Düğün Günü Hatırları'
    },
    {
      id: 5,
      type: 'audio',
      guestName: 'David Martinez',
      fileName: 'congratulations.mp3',
      uploadDate: '2024-03-12',
      message: 'Tebrik sesli mesajı',
      duration: '1:45',
      audioUrl: '#'
    },
    {
      id: 6,
      type: 'note',
      guestName: 'Michael Davis',
      content: 'Düğününüz harika geçti! Organizasyon mükemmeldi ve herkes çok eğlendi. Bu güzel günün anılarını paylaştığınız için teşekkürler.',
      uploadDate: '2024-03-11',
      title: 'Teşekkür Notu'
    }
  ]);

  // Medya galeri state'leri
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showImageLightbox, setShowImageLightbox] = useState(false);

  const stats = {
    total: guests.length,
    confirmed: guests.filter(g => g.status === 'confirmed').length,
    pending: guests.filter(g => g.status === 'pending').length,
    declined: guests.filter(g => g.status === 'declined').length,
    pendingContent: pendingContent.length,
    pendingPhotos: pendingContent.filter(c => c.type === 'image').length,
    pendingVideos: pendingContent.filter(c => c.type === 'video').length,
    pendingAudio: pendingContent.filter(c => c.type === 'audio').length,
    pendingNotes: pendingContent.filter(c => c.type === 'note').length,
    totalMedia: Object.values(mediaGallery).flat().length,
    totalFolders: Object.keys(mediaGallery).length
  };

  const filteredGuests = guests.filter(guest =>
    guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddGuest = (e: React.FormEvent) => {
    e.preventDefault();
    const newGuestData = {
      id: guests.length + 1,
      ...newGuest,
      status: 'pending' as const,
      plusOne: false
    };
    setGuests([...guests, newGuestData]);
    setShowAddForm(false);
    setNewGuest({ name: '', email: '', phone: '', category: 'family', tableNumber: '' });
  };

  const handleEditGuest = (guest: any) => {
    setSelectedGuest(guest);
    setShowEditModal(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedGuest) {
      setGuests(guests.map(guest => 
        guest.id === selectedGuest.id ? selectedGuest : guest
      ));
      setShowEditModal(false);
      setSelectedGuest(null);
    }
  };

  // Tek tek onay/red işlemleri
  const handleApproveContent = (contentId: number) => {
    const content = pendingContent.find(c => c.id === contentId);
    setPendingContent(pendingContent.filter(c => c.id !== contentId));
    alert(`${content?.type === 'image' ? 'Fotoğraf' : 
             content?.type === 'video' ? 'Video' : 
             content?.type === 'audio' ? 'Sesli mesaj' : 'Not'} onaylandı ve profilde görüntüleniyor!`);
  };

  const handleRejectContent = (contentId: number) => {
    const content = pendingContent.find(c => c.id !== contentId);
    setPendingContent(pendingContent.filter(c => c.id !== contentId));
    alert(`${content?.type === 'image' ? 'Fotoğraf' : 
             content?.type === 'video' ? 'Video' : 
             content?.type === 'audio' ? 'Sesli mesaj' : 'Not'} reddedildi!`);
  };

  // Toplu işlemler
  const handleSelectAll = () => {
    if (selectedItems.length === pendingContent.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(pendingContent.map(content => content.id));
    }
  };

  const handleSelectItem = (itemId: number) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleBulkApprove = () => {
    if (selectedItems.length === 0) {
      alert('Lütfen onaylamak için içerik seçin');
      return;
    }
    
    setPendingContent(pendingContent.filter(content => !selectedItems.includes(content.id)));
    alert(`${selectedItems.length} içerik toplu olarak onaylandı!`);
    setSelectedItems([]);
  };

  const handleBulkReject = () => {
    if (selectedItems.length === 0) {
      alert('Lütfen reddetmek için içerik seçin');
      return;
    }
    
    if (confirm(`${selectedItems.length} içeriği reddetmek istediğinizden emin misiniz?`)) {
      setPendingContent(pendingContent.filter(content => !selectedItems.includes(content.id)));
      alert(`${selectedItems.length} içerik toplu olarak reddedildi!`);
      setSelectedItems([]);
    }
  };

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'image': return 'ri-image-line';
      case 'video': return 'ri-video-line';
      case 'audio': return 'ri-mic-line';
      case 'note': return 'ri-file-text-line';
      default: return 'ri-file-line';
    }
  };

  const getContentLabel = (type: string) => {
    switch (type) {
      case 'image': return 'Fotoğraf';
      case 'video': return 'Video';
      case 'audio': return 'Sesli Mesaj';
      case 'note': return 'Not';
      default: return 'İçerik';
    }
  };

  // Lightbox işlemleri
  const openImageLightbox = (folderName: string, imageIndex: number) => {
    setSelectedFolder(folderName);
    setSelectedImageIndex(imageIndex);
    setShowImageLightbox(true);
  };

  const handleLike = (imageId: number) => {
    if (!selectedFolder) return;
    
    setMediaGallery(prev => ({
      ...prev,
      [selectedFolder]: prev[selectedFolder].map(item => {
        if (item.id === imageId) {
          return {
            ...item,
            liked: !item.liked,
            likes: item.liked ? item.likes - 1 : item.likes + 1
          };
        }
        return item;
      })
    }));
  };

  const handleComment = (imageId: number, comment: string) => {
    if (!selectedFolder) return;
    
    const newComment = {
      id: Date.now(),
      user: 'Sarah & Michael',
      text: comment,
      timestamp: 'şimdi'
    };
    
    setMediaGallery(prev => ({
      ...prev,
      [selectedFolder]: prev[selectedFolder].map(item => {
        if (item.id === imageId) {
          return {
            ...item,
            comments: [newComment, ...item.comments]
          };
        }
        return item;
      })
    }));
  };

  // Tüm medyaları birleştir
  const getAllMedia = () => {
    return Object.entries(mediaGallery).flatMap(([uploaderName, items]) => 
      items.map(item => ({ ...item, uploaderName }))
    );
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header - Mobil optimize */}
      <div className="bg-white rounded-lg shadow p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">Misafir Yönetimi</h2>
            <p className="text-sm md:text-base text-gray-600">Düğün misafirlerinizi yönetin ve takip edin</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {pendingContent.length > 0 && (
              <button
                onClick={() => setShowPendingModal(true)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 md:px-4 py-2 rounded-lg font-medium transition-colors text-sm md:text-base cursor-pointer flex items-center relative"
              >
                <i className="ri-time-line mr-1 md:mr-2 text-sm md:text-base"></i>
                <span className="hidden sm:inline">Onay Bekleyen </span>
                ({pendingContent.length})
                <span className="absolute -top-2 -right-2 w-4 h-4 md:w-5 md:h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {pendingContent.length}
                </span>
              </button>
            )}
            <button
              onClick={() => setShowMediaGallery(true)}
              className="bg-purple-500 hover:bg-purple-600 text-white px-3 md:px-4 py-2 rounded-lg font-medium transition-colors text-sm md:text-base cursor-pointer flex items-center"
            >
              <i className="ri-gallery-line mr-1 md:mr-2 text-sm md:text-base"></i>
              <span className="hidden sm:inline">Medya </span>Galeri
            </button>
            <button
              onClick={() => setShowUploadSettings(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 md:px-4 py-2 rounded-lg font-medium transition-colors text-sm md:text-base cursor-pointer flex items-center"
            >
              <i className="ri-settings-line mr-1 md:mr-2 text-sm md:text-base"></i>
              <span className="hidden sm:inline">Yükleme </span>Ayarları
            </button>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-rose-500 hover:bg-rose-600 text-white px-3 md:px-4 py-2 rounded-lg font-medium transition-colors text-sm md:text-base cursor-pointer"
            >
              <i className="ri-user-add-line mr-1 md:mr-2 text-sm md:text-base"></i>
              <span className="hidden sm:inline">Misafir </span>Ekle
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards - Mobil responsive grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-white rounded-lg shadow p-3 md:p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs md:text-sm">Toplam</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <i className="ri-group-line text-white text-sm md:text-lg"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-3 md:p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs md:text-sm">Onaylanan</p>
              <p className="text-xl md:text-2xl font-bold text-green-600">{stats.confirmed}</p>
            </div>
            <div className="w-8 h-8 md:w-10 md:h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <i className="ri-check-line text-white text-sm md:text-lg"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-3 md:p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs md:text-sm">Bekleyen</p>
              <p className="text-xl md:text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <div className="w-8 h-8 md:w-10 md:h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
              <i className="ri-time-line text-white text-sm md:text-lg"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-3 md:p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs md:text-sm">Medya</p>
              <p className="text-xl md:text-2xl font-bold text-purple-600">{stats.totalMedia}</p>
            </div>
            <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-500 rounded-lg flex items-center justify-center">
              <i className="ri-image-line text-white text-sm md:text-lg"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Guests List */}
      <div className="bg-white rounded-lg shadow">
        {/* Search and Filters */}
        <div className="p-4 md:p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-3 md:gap-4">
            <div className="flex-1">
              <div className="relative">
                <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm md:text-base"></i>
                <input
                  type="text"
                  placeholder="Misafir ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 md:pl-10 pr-4 py-2 md:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm md:text-base"
                />
              </div>
            </div>
            <button className="px-3 md:px-4 py-2 md:py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer flex items-center justify-center md:justify-start text-sm md:text-base">
              <i className="ri-filter-line mr-1 md:mr-2 text-sm md:text-base"></i>
              Filtrele
            </button>
          </div>
        </div>

        {/* Guest Table - Mobil responsive */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Misafir
                </th>
                <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  İletişim
                </th>
                <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Kategori
                </th>
                <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Masa
                </th>
                <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredGuests.map((guest) => (
                <tr key={guest.id} className="hover:bg-gray-50">
                  <td className="px-3 md:px-6 py-3 md:py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{guest.name}</div>
                      <div className="text-xs text-gray-500 md:hidden">{guest.email}</div>
                      {guest.plusOne && (
                        <div className="text-xs text-gray-500">+1 Eşlikçi</div>
                      )}
                    </div>
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-4 hidden md:table-cell">
                    <div className="text-sm text-gray-900">{guest.email}</div>
                    <div className="text-sm text-gray-500">{guest.phone}</div>
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-4 hidden sm:table-cell">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      guest.category === 'family' ? 'bg-blue-100 text-blue-800' :
                      guest.category === 'friends' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {guest.category === 'family' ? 'Aile' :
                       guest.category === 'friends' ? 'Arkadaş' : 'İş'}
                    </span>
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-4 text-sm text-gray-900 hidden lg:table-cell">
                    Masa {guest.tableNumber}
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      guest.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      guest.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {guest.status === 'confirmed' ? 'Onaylandı' :
                       guest.status === 'pending' ? 'Bekliyor' : 'Reddetti'}
                    </span>
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-4 text-right text-sm font-medium">
                    <div className="flex gap-1 md:gap-2">
                      <button 
                        onClick={() => handleEditGuest(guest)}
                        className="text-rose-600 hover:text-rose-900 cursor-pointer p-1"
                      >
                        <i className="ri-edit-line text-sm md:text-base"></i>
                      </button>
                      <button className="text-red-600 hover:text-red-900 cursor-pointer p-1">
                        <i className="ri-delete-bin-line text-sm md:text-base"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Medya Galerisi Modal */}
      {showMediaGallery && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 md:p-4">
          <div className="bg-white rounded-2xl w-full max-w-7xl max-h-[95vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 md:p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900">Medya Galerisi</h3>
                  <p className="text-sm text-gray-600 mt-1">{stats.totalFolders} klasör • {stats.totalMedia} medya</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedFolder('all');
                      setSelectedImageIndex(0);
                      setShowImageLightbox(true);
                    }}
                    className="bg-rose-500 hover:bg-rose-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer flex items-center"
                  >
                    <i className="ri-eye-line mr-2"></i>
                    Tümünü Göster
                  </button>
                  <button
                    onClick={() => setShowMediaGallery(false)}
                    className="text-gray-400 hover:text-gray-600 cursor-pointer p-2"
                  >
                    <i className="ri-close-line text-lg md:text-xl"></i>
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 md:p-6">
              <div className="space-y-6">
                {Object.entries(mediaGallery).map(([uploaderName, items]) => (
                  <div key={uploaderName} className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-rose-500 rounded-lg flex items-center justify-center">
                          <i className="ri-user-line text-white"></i>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{uploaderName}</h4>
                          <p className="text-sm text-gray-600">{items.length} medya</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedFolder(uploaderName);
                          setSelectedImageIndex(0);
                          setShowImageLightbox(true);
                        }}
                        className="text-rose-600 hover:rose-700 font-medium text-sm cursor-pointer"
                      >
                        Tümünü Gör
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                      {items.slice(0, 6).map((item, index) => (
                        <div key={item.id} className="relative group">
                          <img
                            src={item.url}
                            alt={item.title}
                            className="w-full h-20 md:h-24 object-cover object-top rounded-lg cursor-pointer transition-transform hover:scale-105"
                            onClick={() => openImageLightbox(uploaderName, index)}
                          />
                          {item.type === 'video' && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg">
                              <i className="ri-play-fill text-white text-lg"></i>
                            </div>
                          )}
                          <div className="absolute top-2 right-2 bg-black/70 text-white px-1.5 py-0.5 rounded text-xs">
                            <i className={`ri-heart-${item.liked ? 'fill' : 'line'} mr-1`}></i>
                            {item.likes}
                          </div>
                        </div>
                      ))}
                      {items.length > 6 && (
                        <div
                          onClick={() => openImageLightbox(uploaderName, 0)}
                          className="h-20 md:h-24 bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors"
                        >
                          <div className="text-center">
                            <div className="text-xl font-bold text-gray-600">+{items.length - 6}</div>
                            <div className="text-xs text-gray-500">Daha</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {Object.keys(mediaGallery).length === 0 && (
                <div className="text-center py-12">
                  <i className="ri-image-line text-4xl text-gray-300 mb-4"></i>
                  <p className="text-gray-500">Henüz medya paylaşılmamış.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Image Lightbox */}
      {showImageLightbox && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <button
            onClick={() => setShowImageLightbox(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 cursor-pointer p-2 z-10"
          >
            <i className="ri-close-line text-2xl"></i>
          </button>

          <div className="w-full max-w-4xl mx-4">
            {(() => {
              const currentImages = selectedFolder === 'all' 
                ? getAllMedia() 
                : (selectedFolder ? mediaGallery[selectedFolder] || [] : []);
              const currentImage = currentImages[selectedImageIndex];
              
              if (!currentImage) return null;

              return (
                <div className="bg-white rounded-lg overflow-hidden">
                  <div className="relative">
                    <img
                      src={currentImage.url}
                      alt={currentImage.title}
                      className="w-full h-96 object-cover object-top"
                    />
                    {currentImage.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center cursor-pointer">
                          <i className="ri-play-fill text-2xl text-gray-800"></i>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{currentImage.title}</h3>
                        <p className="text-gray-600">
                          Yükleyen: {selectedFolder === 'all' ? (currentImage as any).uploaderName : selectedFolder}
                        </p>
                        <p className="text-sm text-gray-500">{currentImage.uploadDate}</p>
                      </div>
                      <button
                        onClick={() => handleLike(currentImage.id)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg cursor-pointer transition-colors ${
                          currentImage.liked
                            ? 'bg-rose-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-rose-50 hover:text-rose-600'
                        }`}
                      >
                        <i className={`ri-heart-${currentImage.liked ? 'fill' : 'line'}`}></i>
                        <span>{currentImage.likes}</span>
                      </button>
                    </div>

                    {/* Yorumlar */}
                    <div className="space-y-3 max-h-40 overflow-y-auto">
                      {currentImage.comments.map((comment) => (
                        <div key={comment.id} className="flex space-x-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                            <i className="ri-user-line text-gray-500 text-sm"></i>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-sm text-gray-900">{comment.user}</span>
                              <span className="text-xs text-gray-500">{comment.timestamp}</span>
                            </div>
                            <p className="text-sm text-gray-700">{comment.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Yorum ekleme */}
                    <div className="mt-4 flex space-x-3">
                      <input
                        type="text"
                        placeholder="Yorum ekle..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && (e.target as HTMLInputElement).value.trim()) {
                            handleComment(currentImage.id, (e.target as HTMLInputElement).value);
                            (e.target as HTMLInputElement).value = '';
                          }
                        }}
                      />
                      <button className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg cursor-pointer">
                        <i className="ri-send-plane-line"></i>
                      </button>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between mt-6">
                      <button
                        onClick={() => setSelectedImageIndex(Math.max(0, selectedImageIndex - 1))}
                        disabled={selectedImageIndex === 0}
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg cursor-pointer"
                      >
                        <i className="ri-arrow-left-line"></i>
                        <span>Önceki</span>
                      </button>
                      
                      <span className="text-sm text-gray-500">
                        {selectedImageIndex + 1} / {currentImages.length}
                      </span>
                      
                      <button
                        onClick={() => setSelectedImageIndex(Math.min(currentImages.length - 1, selectedImageIndex + 1))}
                        disabled={selectedImageIndex >= currentImages.length - 1}
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg cursor-pointer"
                      >
                        <span>Sonraki</span>
                        <i className="ri-arrow-right-line"></i>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* Onay Bekleyen İçerikler Modal - Düzeltilmiş Çıkış Butonu */}
      {showPendingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 md:p-4">
          <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[95vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 md:p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900">Onay Bekleyen İçerikler</h3>
                  <div className="flex flex-wrap gap-2 mt-2 text-xs md:text-sm text-gray-600">
                    <span>📷 {stats.pendingPhotos} Fotoğraf</span>
                    <span>🎥 {stats.pendingVideos} Video</span>
                    <span>🎤 {stats.pendingAudio} Sesli Mesaj</span>
                    <span>📝 {stats.pendingNotes} Not</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowPendingModal(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <i className="ri-close-line text-lg md:text-xl"></i>
                </button>
              </div>
              
              {/* Toplu İşlemler */}
              <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-4 p-3 bg-blue-50 rounded-lg">
                <button
                  onClick={handleSelectAll}
                  className="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer text-sm md:text-base"
                >
                  <i className={`${selectedItems.length === pendingContent.length ? 'ri-checkbox-fill' : 'ri-checkbox-blank-line'} mr-1 md:mr-2`}></i>
                  {selectedItems.length === pendingContent.length ? 'Tümünü Kaldır' : 'Tümünü Seç'}
                </button>
                {selectedItems.length > 0 && (
                  <>
                    <span className="text-blue-700 font-medium text-sm md:text-base">
                      {selectedItems.length} seçildi
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={handleBulkApprove}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-colors cursor-pointer flex items-center"
                      >
                        <i className="ri-check-line mr-1"></i>
                        Toplu Onayla
                      </button>
                      <button
                        onClick={handleBulkReject}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-colors cursor-pointer flex items-center"
                      >
                        <i className="ri-close-line mr-1"></i>
                        Toplu Reddet
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="p-4 md:p-6">
              <div className="space-y-3 md:space-y-4">
                {pendingContent.map((content) => (
                  <div key={content.id} className="bg-gray-50 rounded-lg p-3 md:p-4 border">
                    <div className="flex items-start gap-3 md:gap-4">
                      {/* Checkbox */}
                      <button
                        onClick={() => handleSelectItem(content.id)}
                        className={`w-5 h-5 md:w-6 md:h-6 rounded border-2 flex items-center justify-center cursor-pointer flex-shrink-0 mt-1 ${
                          selectedItems.includes(content.id)
                            ? 'bg-blue-500 border-blue-500 text-white'
                            : 'bg-white border-gray-300 hover:border-blue-400'
                        }`}
                      >
                        {selectedItems.includes(content.id) && (
                          <i className="ri-check-line text-xs md:text-sm"></i>
                        )}
                      </button>

                      {/* Content Preview */}
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                        {content.type === 'image' && content.preview && (
                          <img
                            src={content.preview}
                            alt="Önizleme"
                            className="w-full h-full object-cover object-top"
                          />
                        )}
                        {content.type === 'video' && content.preview && (
                          <div className="relative w-full h-full">
                            <img
                              src={content.preview}
                              alt="Video önizleme"
                              className="w-full h-full object-cover object-top"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                              <i className="ri-play-fill text-white text-lg md:text-xl"></i>
                            </div>
                          </div>
                        )}
                        {content.type === 'audio' && (
                          <div className="w-full h-full flex items-center justify-center">
                            <i className="ri-mic-line text-2xl md:text-3xl text-gray-400"></i>
                          </div>
                        )}
                        {content.type === 'note' && (
                          <div className="w-full h-full flex items-center justify-center">
                            <i className="ri-file-text-line text-2xl md:text-3xl text-gray-400"></i>
                          </div>
                        )}
                      </div>
                      
                      {/* Content Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <i className={`${getContentIcon(content.type)} text-gray-600 text-sm md:text-base`}></i>
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                                {getContentLabel(content.type)}
                              </span>
                            </div>
                            <h4 className="font-medium text-gray-900 text-sm md:text-base truncate">
                              {content.fileName || content.title || `${getContentLabel(content.type)} - ${content.guestName}`}
                            </h4>
                            <p className="text-xs md:text-sm text-gray-600">Gönderen: {content.guestName}</p>
                            <p className="text-xs text-gray-500">Tarih: {content.uploadDate}</p>
                            
                            {/* Sesli mesaj için süre bilgisi */}
                            {content.type === 'audio' && content.duration && (
                              <p className="text-xs text-purple-600 font-medium">Süre: {content.duration}</p>
                            )}
                            
                            {/* Not içeriği */}
                            {content.type === 'note' && content.content && (
                              <div className="mt-2 p-2 md:p-3 bg-white rounded-lg border">
                                <p className="text-xs md:text-sm text-gray-700 line-clamp-3">
                                  {content.content}
                                </p>
                              </div>
                            )}
                            
                            {/* Mesaj varsa göster */}
                            {content.message && content.type !== 'note' && (
                              <p className="text-xs md:text-sm text-gray-700 mt-1 italic">"{content.message}"</p>
                            )}
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="flex gap-2 flex-shrink-0">
                            <button
                              onClick={() => handleApproveContent(content.id)}
                              className="bg-green-500 hover:bg-green-600 text-white px-2 md:px-3 py-1 md:py-1.5 rounded-lg text-xs md:text-sm font-medium transition-colors cursor-pointer flex items-center"
                            >
                              <i className="ri-check-line mr-1"></i>
                              <span className="hidden sm:inline">Onayla</span>
                            </button>
                            <button
                              onClick={() => handleRejectContent(content.id)}
                              className="bg-red-500 hover:bg-red-600 text-white px-2 md:px-3 py-1 md:py-1.5 rounded-lg text-xs md:text-sm font-medium transition-colors cursor-pointer flex items-center"
                            >
                              <i className="ri-close-line mr-1"></i>
                              <span className="hidden sm:inline">Reddet</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {pendingContent.length === 0 && (
                <div className="text-center py-8 md:py-12">
                  <i className="ri-check-double-line text-3xl md:text-4xl text-gray-300 mb-4"></i>
                  <p className="text-sm md:text-base text-gray-500">Şu anda onay bekleyen içerik bulunmuyor.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ... existing modals ... */}

      {/* Misafir Düzenleme Modal */}
      {showEditModal && selectedGuest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold mb-4">Misafir Düzenle</h3>
              <form onSubmit={handleSaveEdit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ad Soyad
                  </label>
                  <input
                    type="text"
                    value={selectedGuest.name}
                    onChange={(e) => setSelectedGuest({...selectedGuest, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm md:text-base"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    E-posta
                  </label>
                  <input
                    type="email"
                    value={selectedGuest.email}
                    onChange={(e) => setSelectedGuest({...selectedGuest, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm md:text-base"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    value={selectedGuest.phone}
                    onChange={(e) => setSelectedGuest({...selectedGuest, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm md:text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kategori
                  </label>
                  <select
                    value={selectedGuest.category}
                    onChange={(e) => setSelectedGuest({...selectedGuest, category: e.target.value})}
                    className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm md:text-base"
                  >
                    <option value="family">Aile</option>
                    <option value="friends">Arkadaş</option>
                    <option value="work">İş</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Masa Numarası
                  </label>
                  <input
                    type="text"
                    value={selectedGuest.tableNumber}
                    onChange={(e) => setSelectedGuest({...selectedGuest, tableNumber: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm md:text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Durum
                  </label>
                  <select
                    value={selectedGuest.status}
                    onChange={(e) => setSelectedGuest({...selectedGuest, status: e.target.value})}
                    className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm md:text-base"
                  >
                    <option value="pending">Bekliyor</option>
                    <option value="confirmed">Onaylandı</option>
                    <option value="declined">Reddetti</option>
                  </select>
                </div>
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-rose-500 hover:bg-rose-600 text-white py-2 px-4 rounded-lg font-medium transition-colors cursor-pointer text-sm md:text-base"
                  >
                    Kaydet
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditModal(false);
                      setSelectedGuest(null);
                    }}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-medium transition-colors cursor-pointer text-sm md:text-base"
                  >
                    İptal
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add Guest Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold mb-4">Yeni Misafir Ekle</h3>
              <form onSubmit={handleAddGuest} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ad Soyad
                  </label>
                  <input
                    type="text"
                    value={newGuest.name}
                    onChange={(e) => setNewGuest({...newGuest, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm md:text-base"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    E-posta
                  </label>
                  <input
                    type="email"
                    value={newGuest.email}
                    onChange={(e) => setNewGuest({...newGuest, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm md:text-base"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    value={newGuest.phone}
                    onChange={(e) => setNewGuest({...newGuest, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm md:text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kategori
                  </label>
                  <select
                    value={newGuest.category}
                    onChange={(e) => setNewGuest({...newGuest, category: e.target.value})}
                    className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm md:text-base"
                  >
                    <option value="family">Aile</option>
                    <option value="friends">Arkadaş</option>
                    <option value="work">İş</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Masa Numarası
                  </label>
                  <input
                    type="text"
                    value={newGuest.tableNumber}
                    onChange={(e) => setNewGuest({...newGuest, tableNumber: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm md:text-base"
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-rose-500 hover:bg-rose-600 text-white py-2 px-4 rounded-lg font-medium transition-colors cursor-pointer text-sm md:text-base"
                  >
                    Ekle
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-medium transition-colors cursor-pointer text-sm md:text-base"
                  >
                    İptal
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Upload Settings Modal */}
      {showUploadSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold mb-4">Misafir Yükleme Ayarları</h3>
              <div className="space-y-4">
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={uploadSettings.enabled}
                      onChange={(e) => setUploadSettings({...uploadSettings, enabled: e.target.checked})}
                      className="mr-2"
                    />
                    <span className="text-sm md:text-base">Misafir medya yüklemeyi etkinleştir</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Yükleme Tarihi
                  </label>
                  <input
                    type="date"
                    value={uploadSettings.allowedDate}
                    onChange={(e) => setUploadSettings({...uploadSettings, allowedDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm md:text-base"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Seçilen tarihte misafirler fotoğraf/video/ses yükleyebilir
                  </p>
                </div>

                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={uploadSettings.autoOpen}
                      onChange={(e) => setUploadSettings({...uploadSettings, autoOpen: e.target.checked})}
                      className="mr-2"
                    />
                    <span className="text-sm md:text-base">Düğün günü otomatik açılsın</span>
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    İşaretlenirse, belirlenen tarihte yükleme otomatik açılır
                  </p>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-xs md:text-sm text-blue-800">
                    <i className="ri-information-line mr-1"></i>
                    Yeni özellikler: Sesli mesaj yükleme ve not bırakma da aktif
                  </p>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => {
                      console.log('Yükleme ayarları güncellendi:', uploadSettings);
                      setShowUploadSettings(false);
                    }}
                    className="flex-1 bg-rose-500 hover:bg-rose-600 text-white py-2 px-4 rounded-lg font-medium transition-colors cursor-pointer text-sm md:text-base"
                  >
                    Kaydet
                  </button>
                  <button
                    onClick={() => setShowUploadSettings(false)}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-medium transition-colors cursor-pointer text-sm md:text-base"
                  >
                    İptal
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
