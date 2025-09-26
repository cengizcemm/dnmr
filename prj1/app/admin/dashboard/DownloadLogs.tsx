'use client';

import { useState } from 'react';

interface DownloadLog {
  id: string;
  userId: string;
  userName: string;
  userRole: 'admin' | 'venue' | 'couple' | 'guest';
  mediaId: string;
  mediaTitle: string;
  mediaType: 'image' | 'video';
  downloadType: 'single' | 'bulk';
  fileSize: string;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  weddingId?: string;
  weddingTitle?: string;
}

export default function DownloadLogs() {
  const [selectedDateRange, setSelectedDateRange] = useState('today');
  const [selectedUserRole, setSelectedUserRole] = useState('all');
  const [selectedDownloadType, setSelectedDownloadType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock download logs data
  const downloadLogs: DownloadLog[] = [
    {
      id: 'DL-001',
      userId: 'USER-001',
      userName: 'Sarah & Michael',
      userRole: 'couple',
      mediaId: 'MEDIA-127',
      mediaTitle: 'Nikah Töreni Fotoğrafları',
      mediaType: 'image',
      downloadType: 'bulk',
      fileSize: '45.2 MB',
      timestamp: '2024-01-15 14:30:25',
      ipAddress: '192.168.1.100',
      userAgent: 'Chrome/91.0 Windows',
      weddingId: 'WEDDING-2024-SARAH-MICHAEL',
      weddingTitle: 'Sarah & Michael Düğünü'
    },
    {
      id: 'DL-002',
      userId: 'GUEST-050',
      userName: 'Emma Wilson',
      userRole: 'guest',
      mediaId: 'MEDIA-089',
      mediaTitle: 'Kutlama Anları',
      mediaType: 'image',
      downloadType: 'single',
      fileSize: '3.2 MB',
      timestamp: '2024-01-15 13:45:12',
      ipAddress: '192.168.1.102',
      userAgent: 'Chrome/91.0 Android',
      weddingId: 'WEDDING-2024-SARAH-MICHAEL',
      weddingTitle: 'Sarah & Michael Düğünü'
    },
    {
      id: 'DL-003',
      userId: 'VENUE-005',
      userName: 'Grand Hotel - Mehmet Öztürk',
      userRole: 'venue',
      mediaId: 'MEDIA-VID-001',
      mediaTitle: 'Düğün Hikayesi Video',
      mediaType: 'video',
      downloadType: 'single',
      fileSize: '125.8 MB',
      timestamp: '2024-01-15 12:20:33',
      ipAddress: '192.168.1.105',
      userAgent: 'Safari/14.1 macOS',
      weddingId: 'WEDDING-2024-SARAH-MICHAEL',
      weddingTitle: 'Sarah & Michael Düğünü'
    },
    {
      id: 'DL-004',
      userId: 'ADMIN-001',
      userName: 'Admin User',
      userRole: 'admin',
      mediaId: 'MEDIA-BULK-001',
      mediaTitle: 'Tüm Düğün Medyaları',
      mediaType: 'image',
      downloadType: 'bulk',
      fileSize: '256.4 MB',
      timestamp: '2024-01-15 11:15:44',
      ipAddress: '192.168.1.001',
      userAgent: 'Chrome/91.0 Windows',
      weddingId: 'WEDDING-2024-JOHN-JANE',
      weddingTitle: 'John & Jane Düğünü'
    },
    {
      id: 'DL-005',
      userId: 'GUEST-075',
      userName: 'Ahmet Kaya',
      userRole: 'guest',
      mediaId: 'MEDIA-SELF-001',
      mediaTitle: 'Kendi Yüklediğim Fotoğraflar',
      mediaType: 'image',
      downloadType: 'bulk',
      fileSize: '18.7 MB',
      timestamp: '2024-01-15 10:30:20',
      ipAddress: '192.168.1.104',
      userAgent: 'Chrome/91.0 iPhone',
      weddingId: 'WEDDING-2024-ALEX-EMMA',
      weddingTitle: 'Alex & Emma Düğünü'
    },
    {
      id: 'DL-006',
      userId: 'USER-003',
      userName: 'Alex & Emma',
      userRole: 'couple',
      mediaId: 'MEDIA-145',
      mediaTitle: 'Pasta Kesimi',
      mediaType: 'image',
      downloadType: 'single',
      fileSize: '4.1 MB',
      timestamp: '2024-01-15 09:45:15',
      ipAddress: '192.168.1.103',
      userAgent: 'Firefox/89.0 Windows'
    }
  ];

  const filteredLogs = downloadLogs.filter(log => {
    const matchesRole = selectedUserRole === 'all' || log.userRole === selectedUserRole;
    const matchesType = selectedDownloadType === 'all' || log.downloadType === selectedDownloadType;
    const matchesSearch = searchTerm === '' || 
      log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.mediaTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.weddingTitle?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesRole && matchesType && matchesSearch;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'venue': return 'bg-green-100 text-green-800';
      case 'couple': return 'bg-rose-100 text-rose-800';
      case 'guest': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'bulk': return 'bg-orange-100 text-orange-800';
      case 'single': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMediaIcon = (type: string) => {
    return type === 'video' ? 'ri-video-line' : 'ri-image-line';
  };

  const totalDownloads = downloadLogs.length;
  const totalSize = downloadLogs.reduce((sum, log) => {
    const size = parseFloat(log.fileSize);
    return sum + size;
  }, 0);
  const bulkDownloads = downloadLogs.filter(log => log.downloadType === 'bulk').length;
  const todayDownloads = downloadLogs.filter(log => 
    log.timestamp.startsWith('2024-01-15')
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">İndirme Kayıtları</h2>
          <p className="text-gray-600 mt-1">Tüm medya indirme aktivitelerini izleyin ve analiz edin</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer flex items-center whitespace-nowrap">
            <i className="ri-download-line mr-2"></i>
            Rapor İndir
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer flex items-center whitespace-nowrap">
            <i className="ri-shield-line mr-2"></i>
            İndirmeleri Durdur
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-download-cloud-line text-blue-600 text-xl"></i>
            </div>
            <div>
              <p className="text-sm text-gray-600">Toplam İndirme</p>
              <p className="text-2xl font-bold text-gray-900">{totalDownloads}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-hard-drive-line text-green-600 text-xl"></i>
            </div>
            <div>
              <p className="text-sm text-gray-600">Toplam Boyut</p>
              <p className="text-2xl font-bold text-gray-900">{totalSize.toFixed(1)} MB</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-stack-line text-orange-600 text-xl"></i>
            </div>
            <div>
              <p className="text-sm text-gray-600">Toplu İndirme</p>
              <p className="text-2xl font-bold text-gray-900">{bulkDownloads}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-calendar-line text-purple-600 text-xl"></i>
            </div>
            <div>
              <p className="text-sm text-gray-600">Bugünkü İndirmeler</p>
              <p className="text-2xl font-bold text-gray-900">{todayDownloads}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tarih Aralığı</label>
            <select
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
            >
              <option value="today">Bugün</option>
              <option value="week">Son 7 Gün</option>
              <option value="month">Son 30 Gün</option>
              <option value="all">Tüm Zamanlar</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kullanıcı Rolü</label>
            <select
              value={selectedUserRole}
              onChange={(e) => setSelectedUserRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
            >
              <option value="all">Tüm Roller</option>
              <option value="admin">Admin</option>
              <option value="venue">Mekan</option>
              <option value="couple">Çift</option>
              <option value="guest">Misafir</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">İndirme Tipi</label>
            <select
              value={selectedDownloadType}
              onChange={(e) => setSelectedDownloadType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
            >
              <option value="all">Tüm Tipler</option>
              <option value="single">Tekli</option>
              <option value="bulk">Toplu</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Arama</label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Kullanıcı veya medya ara..."
                className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <i className="ri-search-line absolute left-3 top-2.5 text-gray-400"></i>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <span className="text-sm text-gray-600">{filteredLogs.length} kayıt gösteriliyor</span>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>Toplam: {totalDownloads} indirme</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Canlı izleme aktif</span>
            </div>
          </div>
        </div>
      </div>

      {/* Download Logs Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kullanıcı & İndirme
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Medya Bilgileri
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Düğün
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Zaman & Boyut
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IP & Cihaz
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium mr-3">
                        {log.userName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{log.userName}</div>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(log.userRole)}`}>
                            {log.userRole === 'admin' ? 'Admin' :
                             log.userRole === 'venue' ? 'Mekan' :
                             log.userRole === 'couple' ? 'Çift' : 'Misafir'}
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(log.downloadType)}`}>
                            {log.downloadType === 'bulk' ? 'Toplu' : 'Tekli'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                        <i className={`${getMediaIcon(log.mediaType)} text-gray-600`}></i>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 max-w-xs truncate">{log.mediaTitle}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {log.mediaType === 'video' ? 'Video' : 'Fotoğraf'} • ID: {log.mediaId}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {log.weddingTitle && (
                      <div>
                        <div className="text-sm text-gray-900">{log.weddingTitle}</div>
                        <div className="text-xs text-gray-500">{log.weddingId}</div>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{log.timestamp.split(' ')[1]}</div>
                    <div className="text-xs text-gray-500">{log.timestamp.split(' ')[0]}</div>
                    <div className="text-xs font-medium text-blue-600 mt-1">{log.fileSize}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{log.ipAddress}</div>
                    <div className="text-xs text-gray-500 max-w-xs truncate">{log.userAgent}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLogs.length === 0 && (
          <div className="text-center py-12">
            <i className="ri-download-cloud-line text-4xl text-gray-300 mb-4"></i>
            <h3 className="text-lg font-medium text-gray-900 mb-2">İndirme Kaydı Bulunamadı</h3>
            <p className="text-gray-500">Seçilen filtrelere uygun indirme kaydı bulunamadı.</p>
          </div>
        )}
      </div>

      {/* Download Security Alert */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-start">
          <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
            <i className="ri-shield-line text-yellow-600 text-xl"></i>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Güvenlik Uyarısı</h3>
            <p className="text-sm text-gray-700 mb-3">
              İndirme aktivitelerini düzenli olarak kontrol edin. Şüpheli aktiviteler tespit edilirse
              ilgili kullanıcının indirme yetkilerini geçici olarak askıya alabilirsiniz.
            </p>
            <div className="flex items-center space-x-4 text-xs text-gray-600">
              <span>• Günlük indirme limiti: 100 dosya</span>
              <span>• Maksimum dosya boyutu: 100MB</span>
              <span>• Toplu indirme limiti: 50 dosya</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}