'use client';

import { useState } from 'react';

export default function VoiceMessages() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedMessages, setSelectedMessages] = useState<number[]>([]);
  const [playingMessageId, setPlayingMessageId] = useState<number | null>(null);

  const voiceMessages = [
    {
      id: 1,
      guestName: 'Emma Wilson',
      guestEmail: 'emma@email.com',
      message: 'Çok mutlu oldum sizin için! Düğününüz harika geçti...',
      duration: '2:15',
      uploadDate: '2024-03-15 14:30',
      status: 'pending',
      audioUrl: '#',
      waveform: [0.2, 0.8, 0.4, 0.9, 0.3, 0.7, 0.5, 0.6, 0.8, 0.2, 0.4, 0.9, 0.3, 0.6, 0.7, 0.5]
    },
    {
      id: 2,
      guestName: 'James Brown',
      guestEmail: 'james@email.com',
      message: 'Sizinle tanıştığımıza çok memnun olduk. İyi ki varsınız...',
      duration: '1:45',
      uploadDate: '2024-03-15 12:20',
      status: 'approved',
      audioUrl: '#',
      waveform: [0.1, 0.6, 0.3, 0.8, 0.4, 0.5, 0.7, 0.9, 0.2, 0.4, 0.6, 0.3, 0.8, 0.5, 0.7, 0.4]
    },
    {
      id: 3,
      guestName: 'Lisa Garcia',
      guestEmail: 'lisa@email.com',
      message: 'Bugün çok güzel bir gün oldu. Teşekkürler...',
      duration: '3:20',
      uploadDate: '2024-03-14 18:45',
      status: 'pending',
      audioUrl: '#',
      waveform: [0.4, 0.7, 0.2, 0.9, 0.5, 0.3, 0.8, 0.6, 0.1, 0.7, 0.4, 0.8, 0.3, 0.9, 0.2, 0.6]
    },
    {
      id: 4,
      guestName: 'David Martinez',
      guestEmail: 'david@email.com',
      message: 'Çok güzel bir düğündü. Sizinle arkadaş olmaktan mutluyuz...',
      duration: '2:50',
      uploadDate: '2024-03-13 16:15',
      status: 'approved',
      audioUrl: '#',
      waveform: [0.3, 0.8, 0.5, 0.6, 0.9, 0.2, 0.4, 0.7, 0.3, 0.8, 0.5, 0.6, 0.2, 0.9, 0.4, 0.7]
    },
    {
      id: 5,
      guestName: 'Anna Taylor',
      guestEmail: 'anna@email.com',
      message: 'Evliliğinizde çok mutlu olmanızı diliyorum...',
      duration: '1:30',
      uploadDate: '2024-03-12 20:30',
      status: 'rejected',
      audioUrl: '#',
      waveform: [0.5, 0.3, 0.8, 0.4, 0.7, 0.6, 0.2, 0.9, 0.3, 0.5, 0.8, 0.4, 0.6, 0.7, 0.2, 0.9]
    }
  ];

  const filters = [
    { id: 'all', label: 'Tüm Mesajlar', count: voiceMessages.length },
    { id: 'pending', label: 'Onay Bekleyen', count: voiceMessages.filter(m => m.status === 'pending').length },
    { id: 'approved', label: 'Onaylanan', count: voiceMessages.filter(m => m.status === 'approved').length },
    { id: 'rejected', label: 'Reddedilen', count: voiceMessages.filter(m => m.status === 'rejected').length }
  ];

  const filteredMessages = voiceMessages.filter(message => {
    if (activeFilter === 'all') return true;
    return message.status === activeFilter;
  });

  const stats = {
    total: voiceMessages.length,
    pending: voiceMessages.filter(m => m.status === 'pending').length,
    approved: voiceMessages.filter(m => m.status === 'approved').length,
    rejected: voiceMessages.filter(m => m.status === 'rejected').length,
    totalDuration: voiceMessages.reduce((total, msg) => {
      const [min, sec] = msg.duration.split(':').map(Number);
      return total + (min * 60) + sec;
    }, 0)
  };

  const formatTotalDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}s ${mins}dk`;
    }
    return `${mins}dk`;
  };

  const handlePlayPause = (messageId: number) => {
    if (playingMessageId === messageId) {
      setPlayingMessageId(null);
    } else {
      setPlayingMessageId(messageId);
    }
  };

  const handleApprove = (messageId: number) => {
    console.log('Sesli mesaj onaylandı:', messageId);
    alert('Sesli mesaj onaylandı ve profilde görüntüleniyor!');
  };

  const handleReject = (messageId: number) => {
    console.log('Sesli mesaj reddedildi:', messageId);
    alert('Sesli mesaj reddedildi!');
  };

  const handleSelectAll = () => {
    if (selectedMessages.length === filteredMessages.length) {
      setSelectedMessages([]);
    } else {
      setSelectedMessages(filteredMessages.map(msg => msg.id));
    }
  };

  const handleSelectMessage = (messageId: number) => {
    setSelectedMessages(prev => 
      prev.includes(messageId) 
        ? prev.filter(id => id !== messageId)
        : [...prev, messageId]
    );
  };

  const handleBulkApprove = () => {
    if (selectedMessages.length === 0) {
      alert('Lütfen onaylamak için mesaj seçin');
      return;
    }
    
    alert(`${selectedMessages.length} sesli mesaj toplu olarak onaylandı!`);
    setSelectedMessages([]);
  };

  const handleBulkReject = () => {
    if (selectedMessages.length === 0) {
      alert('Lütfen reddetmek için mesaj seçin');
      return;
    }
    
    if (confirm(`${selectedMessages.length} sesli mesajı reddetmek istediğinizden emin misiniz?`)) {
      alert(`${selectedMessages.length} sesli mesaj toplu olarak reddedildi!`);
      setSelectedMessages([]);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approved': return 'Onaylandı';
      case 'pending': return 'Bekliyor';
      case 'rejected': return 'Reddedildi';
      default: return 'Bilinmiyor';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">Sesli Mesajlar</h2>
            <p className="text-gray-600">Misafirlerinizden gelen sesli mesajları yönetin</p>
          </div>
          <div className="flex items-center space-x-3">
            {selectedMessages.length > 0 && (
              <div className="flex gap-2">
                <button
                  onClick={handleBulkApprove}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer flex items-center"
                >
                  <i className="ri-check-line mr-2"></i>
                  Toplu Onayla ({selectedMessages.length})
                </button>
                <button
                  onClick={handleBulkReject}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer flex items-center"
                >
                  <i className="ri-close-line mr-2"></i>
                  Toplu Reddet ({selectedMessages.length})
                </button>
              </div>
            )}
            <button className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer flex items-center">
              <i className="ri-download-line mr-2"></i>
              Tümünü İndir
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Toplam</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <i className="ri-mic-line text-white text-lg"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Onay Bekleyen</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
              <i className="ri-time-line text-white text-lg"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Onaylanan</p>
              <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
            </div>
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <i className="ri-check-line text-white text-lg"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Reddedilen</p>
              <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
            </div>
            <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
              <i className="ri-close-line text-white text-lg"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Toplam Süre</p>
              <p className="text-2xl font-bold text-purple-600">{formatTotalDuration(stats.totalDuration)}</p>
            </div>
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
              <i className="ri-time-fill text-white text-lg"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
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
          
          <button
            onClick={handleSelectAll}
            className="flex items-center text-gray-600 hover:text-gray-900 cursor-pointer"
          >
            <i className={`${selectedMessages.length === filteredMessages.length ? 'ri-checkbox-fill' : 'ri-checkbox-blank-line'} mr-2`}></i>
            {selectedMessages.length === filteredMessages.length ? 'Tümünü Kaldır' : 'Tümünü Seç'}
          </button>
        </div>
      </div>

      {/* Voice Messages List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="space-y-4">
            {filteredMessages.map((message) => (
              <div key={message.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  {/* Checkbox */}
                  <button
                    onClick={() => handleSelectMessage(message.id)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer mt-1 ${
                      selectedMessages.includes(message.id)
                        ? 'bg-rose-500 border-rose-500 text-white'
                        : 'bg-white border-gray-300 hover:border-rose-400'
                    }`}
                  >
                    {selectedMessages.includes(message.id) && (
                      <i className="ri-check-line text-xs"></i>
                    )}
                  </button>

                  {/* User Avatar */}
                  <div className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="ri-user-line text-white text-lg"></i>
                  </div>
                  
                  {/* Message Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{message.guestName}</h3>
                        <p className="text-sm text-gray-600">{message.guestEmail}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(message.status)}`}>
                          {getStatusLabel(message.status)}
                        </span>
                        <span className="text-xs text-gray-500">{message.uploadDate}</span>
                      </div>
                    </div>
                    
                    {/* Audio Player */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-3">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handlePlayPause(message.id)}
                          className="w-10 h-10 bg-rose-500 hover:bg-rose-600 text-white rounded-full flex items-center justify-center cursor-pointer transition-colors"
                        >
                          <i className={`${playingMessageId === message.id ? 'ri-pause-fill' : 'ri-play-fill'}`}></i>
                        </button>
                        
                        {/* Waveform */}
                        <div className="flex-1 flex items-center gap-1 h-8">
                          {message.waveform.map((height, index) => (
                            <div
                              key={index}
                              className={`w-1 bg-rose-300 rounded-full transition-colors ${
                                playingMessageId === message.id ? 'bg-rose-500' : ''
                              }`}
                              style={{ height: `${height * 100}%` }}
                            />
                          ))}
                        </div>
                        
                        <span className="text-sm text-gray-600 font-medium">{message.duration}</span>
                      </div>
                    </div>
                    
                    {/* Message Text */}
                    <p className="text-sm text-gray-700 italic mb-3">"{message.message}"</p>
                    
                    {/* Action Buttons */}
                    {message.status === 'pending' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApprove(message.id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer flex items-center"
                        >
                          <i className="ri-check-line mr-1"></i>
                          Onayla
                        </button>
                        <button
                          onClick={() => handleReject(message.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer flex items-center"
                        >
                          <i className="ri-close-line mr-1"></i>
                          Reddet
                        </button>
                      </div>
                    )}
                    
                    {message.status === 'approved' && (
                      <div className="flex gap-2">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer flex items-center">
                          <i className="ri-download-line mr-1"></i>
                          İndir
                        </button>
                        <button className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer flex items-center">
                          <i className="ri-share-line mr-1"></i>
                          Paylaş
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredMessages.length === 0 && (
            <div className="text-center py-12">
              <i className="ri-mic-line text-4xl text-gray-300 mb-4"></i>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Sesli Mesaj Bulunamadı</h3>
              <p className="text-gray-500">Seçilen filtreye uygun sesli mesaj bulunamadı.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}