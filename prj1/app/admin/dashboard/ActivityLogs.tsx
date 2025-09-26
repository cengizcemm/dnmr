'use client';

import { useState } from 'react';

interface ActivityLog {
  id: number;
  userId: string;
  userName: string;
  userType: 'couple' | 'guest' | 'venue' | 'admin';
  action: string;
  category: 'profile' | 'media' | 'settings' | 'interaction' | 'system';
  details: string;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
}

export default function ActivityLogs() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedUserType, setSelectedUserType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('today');

  // Mock activity logs data
  const activityLogs: ActivityLog[] = [
    {
      id: 1,
      userId: 'USER-001',
      userName: 'Sarah & Michael',
      userType: 'couple',
      action: 'UPDATE_COVER_PHOTO',
      category: 'profile',
      details: 'Kapak fotoğrafını "Romantik Gül Bahçesi" şablonuyla değiştirdi',
      timestamp: '2024-01-15 14:30:25',
      ipAddress: '192.168.1.100',
      userAgent: 'Chrome/91.0 Windows'
    },
    {
      id: 2,
      userId: 'USER-001',
      userName: 'Sarah & Michael',
      userType: 'couple',
      action: 'UPDATE_STORY',
      category: 'profile',
      details: 'Aşk hikayesini güncelledi (850 karakter)',
      timestamp: '2024-01-15 14:25:12',
      ipAddress: '192.168.1.100',
      userAgent: 'Chrome/91.0 Windows'
    },
    {
      id: 3,
      userId: 'USER-002',
      userName: 'John & Jane',
      userType: 'couple',
      action: 'UPDATE_THEME',
      category: 'profile',
      details: 'Tema rengini "Mavi Teması"na değiştirdi',
      timestamp: '2024-01-15 13:45:33',
      ipAddress: '192.168.1.101',
      userAgent: 'Safari/14.1 macOS'
    },
    {
      id: 4,
      userId: 'GUEST-050',
      userName: 'Emma Wilson',
      userType: 'guest',
      action: 'UPLOAD_PHOTOS',
      category: 'media',
      details: '15 fotoğraf yükledi (WEDDING-2024-SARAH-MICHAEL)',
      timestamp: '2024-01-15 12:15:44',
      ipAddress: '192.168.1.102',
      userAgent: 'Chrome/91.0 Android'
    },
    {
      id: 5,
      userId: 'USER-003',
      userName: 'Alex & Emma',
      userType: 'couple',
      action: 'UPDATE_FONT',
      category: 'profile',
      details: 'Yazı tipini "Dancing Script"e değiştirdi',
      timestamp: '2024-01-15 11:30:15',
      ipAddress: '192.168.1.103',
      userAgent: 'Firefox/89.0 Windows'
    },
    {
      id: 6,
      userId: 'GUEST-075',
      userName: 'Ahmet Kaya',
      userType: 'guest',
      action: 'LIKE_PHOTO',
      category: 'interaction',
      details: 'Fotoğraf beğendi (Photo ID: 127)',
      timestamp: '2024-01-15 10:45:20',
      ipAddress: '192.168.1.104',
      userAgent: 'Chrome/91.0 iPhone'
    },
    {
      id: 7,
      userId: 'VENUE-005',
      userName: 'Grand Hotel',
      userType: 'venue',
      action: 'UPDATE_PROFILE',
      category: 'profile',
      details: 'Venue profil bilgilerini güncelledi',
      timestamp: '2024-01-15 09:20:30',
      ipAddress: '192.168.1.105',
      userAgent: 'Chrome/91.0 Windows'
    },
    {
      id: 8,
      userId: 'USER-004',
      userName: 'David & Lisa',
      userType: 'couple',
      action: 'DELETE_PHOTO',
      category: 'media',
      details: 'Galeri fotoğrafını sildi (Photo ID: 89)',
      timestamp: '2024-01-15 08:15:45',
      ipAddress: '192.168.1.106',
      userAgent: 'Safari/14.1 iPad'
    }
  ];

  const categories = [
    { id: 'all', label: 'Tüm Kategoriler', count: activityLogs.length },
    { id: 'profile', label: 'Profil Değişiklikleri', count: activityLogs.filter(log => log.category === 'profile').length },
    { id: 'media', label: 'Medya İşlemleri', count: activityLogs.filter(log => log.category === 'media').length },
    { id: 'interaction', label: 'Etkileşimler', count: activityLogs.filter(log => log.category === 'interaction').length },
    { id: 'system', label: 'Sistem İşlemleri', count: activityLogs.filter(log => log.category === 'system').length }
  ];

  const userTypes = [
    { id: 'all', label: 'Tüm Kullanıcılar', count: activityLogs.length },
    { id: 'couple', label: 'Çiftler', count: activityLogs.filter(log => log.userType === 'couple').length },
    { id: 'guest', label: 'Misafirler', count: activityLogs.filter(log => log.userType === 'guest').length },
    { id: 'venue', label: 'Mekanlar', count: activityLogs.filter(log => log.userType === 'venue').length }
  ];

  const getActionIcon = (action: string) => {
    const iconMap: { [key: string]: string } = {
      'UPDATE_COVER_PHOTO': 'ri-image-line',
      'UPDATE_STORY': 'ri-article-line',
      'UPDATE_THEME': 'ri-palette-line',
      'UPDATE_FONT': 'ri-font-size-line',
      'UPLOAD_PHOTOS': 'ri-upload-line',
      'DELETE_PHOTO': 'ri-delete-bin-line',
      'LIKE_PHOTO': 'ri-heart-line',
      'UPDATE_PROFILE': 'ri-user-settings-line'
    };
    return iconMap[action] || 'ri-information-line';
  };

  const getActionColor = (category: string) => {
    const colorMap: { [key: string]: string } = {
      'profile': 'text-blue-600 bg-blue-100',
      'media': 'text-green-600 bg-green-100',
      'interaction': 'text-rose-600 bg-rose-100',
      'system': 'text-purple-600 bg-purple-100'
    };
    return colorMap[category] || 'text-gray-600 bg-gray-100';
  };

  const getUserTypeColor = (userType: string) => {
    const colorMap: { [key: string]: string } = {
      'couple': 'bg-rose-100 text-rose-800',
      'guest': 'bg-blue-100 text-blue-800',
      'venue': 'bg-green-100 text-green-800',
      'admin': 'bg-purple-100 text-purple-800'
    };
    return colorMap[userType] || 'bg-gray-100 text-gray-800';
  };

  const filteredLogs = activityLogs.filter(log => {
    const matchesCategory = selectedCategory === 'all' || log.category === selectedCategory;
    const matchesUserType = selectedUserType === 'all' || log.userType === selectedUserType;
    const matchesSearch = searchTerm === '' || 
      log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesUserType && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Aktivite Kayıtları</h2>
          <p className="text-gray-600 mt-1">Tüm kullanıcı aktivitelerini izleyin ve analiz edin</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer flex items-center">
            <i className="ri-download-line mr-2"></i>
            Dışa Aktar
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.label} ({category.count})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kullanıcı Tipi</label>
            <select
              value={selectedUserType}
              onChange={(e) => setSelectedUserType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
            >
              {userTypes.map(type => (
                <option key={type.id} value={type.id}>
                  {type.label} ({type.count})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tarih Aralığı</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
            >
              <option value="today">Bugün</option>
              <option value="week">Son 7 Gün</option>
              <option value="month">Son 30 Gün</option>
              <option value="all">Tüm Zamanlar</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Arama</label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Kullanıcı adı veya işlem ara..."
                className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <i className="ri-search-line absolute left-3 top-2.5 text-gray-400"></i>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>{filteredLogs.length} kayıt gösteriliyor</span>
          <div className="flex items-center space-x-4">
            <span>Toplam: {activityLogs.length} aktivite</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Canlı izleme aktif</span>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Logs Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kullanıcı & İşlem
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kategori
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Detaylar
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Zaman
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
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${getActionColor(log.category)}`}>
                        <i className={getActionIcon(log.action)}></i>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{log.userName}</div>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getUserTypeColor(log.userType)}`}>
                            {log.userType === 'couple' ? 'Çift' : 
                             log.userType === 'guest' ? 'Misafir' : 
                             log.userType === 'venue' ? 'Mekan' : 'Admin'}
                          </span>
                          <span className="text-xs text-gray-500">ID: {log.userId}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getActionColor(log.category)}`}>
                      {log.category === 'profile' ? 'Profil' :
                       log.category === 'media' ? 'Medya' :
                       log.category === 'interaction' ? 'Etkileşim' : 'Sistem'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900 max-w-xs truncate">{log.details}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{log.timestamp.split(' ')[1]}</div>
                    <div className="text-xs text-gray-500">{log.timestamp.split(' ')[0]}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{log.ipAddress}</div>
                    <div className="text-xs text-gray-500">{log.userAgent}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLogs.length === 0 && (
          <div className="text-center py-12">
            <i className="ri-file-search-line text-4xl text-gray-300 mb-4"></i>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Kayıt Bulunamadı</h3>
            <p className="text-gray-500">Seçilen filtrelere uygun aktivite kaydı bulunamadı.</p>
          </div>
        )}
      </div>

      {/* Stats Summary */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-user-settings-line text-blue-600 text-xl"></i>
            </div>
            <div>
              <p className="text-sm text-gray-600">Profil Değişiklikleri</p>
              <p className="text-2xl font-bold text-gray-900">
                {activityLogs.filter(log => log.category === 'profile').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-upload-line text-green-600 text-xl"></i>
            </div>
            <div>
              <p className="text-sm text-gray-600">Medya Yüklemeleri</p>
              <p className="text-2xl font-bold text-gray-900">
                {activityLogs.filter(log => log.category === 'media' && log.action.includes('UPLOAD')).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-heart-line text-rose-600 text-xl"></i>
            </div>
            <div>
              <p className="text-sm text-gray-600">Beğeniler</p>
              <p className="text-2xl font-bold text-gray-900">
                {activityLogs.filter(log => log.action === 'LIKE_PHOTO').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-time-line text-purple-600 text-xl"></i>
            </div>
            <div>
              <p className="text-sm text-gray-600">Bugünkü Aktiviteler</p>
              <p className="text-2xl font-bold text-gray-900">{activityLogs.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}