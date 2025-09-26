'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export default function Analytics() {
  const monthlyData = [
    { month: 'Ocak', users: 2400, venues: 12, weddings: 45 },
    { month: 'Şubat', users: 3200, venues: 15, weddings: 52 },
    { month: 'Mart', users: 2800, venues: 18, weddings: 38 },
    { month: 'Nisan', users: 4100, venues: 22, weddings: 67 },
    { month: 'Mayıs', users: 3800, venues: 20, weddings: 78 },
    { month: 'Haziran', users: 4500, venues: 24, weddings: 89 }
  ];

  const cityData = [
    { city: 'İstanbul', value: 45 },
    { city: 'Ankara', value: 23 },
    { city: 'İzmir', value: 18 },
    { city: 'Antalya', value: 12 },
    { city: 'Diğer', value: 32 }
  ];

  const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6'];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Analitik Dashboard</h2>
        <p className="text-gray-600">Sistem performansı ve kullanım istatistikleri</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Toplam Gelir', value: '₺487,200', change: '+12%', icon: 'ri-money-dollar-circle-line', color: 'text-green-600' },
          { title: 'Ortalama Düğün Değeri', value: '₺3,120', change: '+8%', icon: 'ri-heart-line', color: 'text-rose-600' },
          { title: 'Kullanıcı Artışı', value: '%24', change: '+5%', icon: 'ri-user-add-line', color: 'text-blue-600' },
          { title: 'Platform Kullanımı', value: '%87', change: '+2%', icon: 'ri-bar-chart-line', color: 'text-purple-600' }
        ].map((metric, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                <p className={`text-sm ${metric.color} mt-1`}>{metric.change} bu ay</p>
              </div>
              <i className={`${metric.icon} text-2xl ${metric.color}`}></i>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Monthly Growth */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Aylık Büyüme Trendi</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="users" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
              <Area type="monotone" dataKey="venues" stackId="2" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* City Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Şehirlere Göre Dağılım</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={cityData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {cityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-2 mt-4">
            {cityData.map((city, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-sm text-gray-600">{city.city}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wedding Performance */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Düğün Performansı</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="weddings" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Son Sistem Aktiviteleri</h3>
        <div className="space-y-4">
          {[
            { time: '2 dakika önce', user: 'Sarah & Michael', action: 'Yeni fotoğraf koleksiyonu oluşturdu', type: 'upload' },
            { time: '15 dakika önce', user: 'Grand Palace Hotel', action: 'Yeni çift profili onayladı', type: 'approval' },
            { time: '1 saat önce', user: 'System', action: 'Otomatik yedekleme tamamlandı', type: 'system' },
            { time: '2 saat önce', user: 'Emma Wilson', action: '25 misafir davet gönderdi', type: 'invite' },
            { time: '3 saat önce', user: 'Ocean View Resort', action: 'Profil bilgilerini güncelledi', type: 'update' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center p-3 rounded-lg hover:bg-gray-50">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                activity.type === 'upload' ? 'bg-green-100 text-green-600' :
                activity.type === 'approval' ? 'bg-blue-100 text-blue-600' :
                activity.type === 'system' ? 'bg-purple-100 text-purple-600' :
                activity.type === 'invite' ? 'bg-yellow-100 text-yellow-600' :
                'bg-gray-100 text-gray-600'
              }`}>
                <i className={`${
                  activity.type === 'upload' ? 'ri-upload-line' :
                  activity.type === 'approval' ? 'ri-check-line' :
                  activity.type === 'system' ? 'ri-settings-line' :
                  activity.type === 'invite' ? 'ri-mail-send-line' :
                  'ri-edit-line'
                } text-sm`}></i>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                <p className="text-sm text-gray-600">{activity.action}</p>
              </div>
              <span className="text-xs text-gray-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}