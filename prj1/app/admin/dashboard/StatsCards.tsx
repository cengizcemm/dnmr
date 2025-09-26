'use client';

export default function StatsCards() {
  const stats = [
    {
      title: 'Toplam Mekanlar',
      value: '24',
      change: '+12%',
      changeType: 'positive',
      icon: 'ri-building-line',
      color: 'bg-blue-500'
    },
    {
      title: 'Aktif Düğünler',
      value: '156',
      change: '+8%',
      changeType: 'positive',
      icon: 'ri-heart-line',
      color: 'bg-rose-500'
    },
    {
      title: 'Toplam Kullanıcı',
      value: '2,847',
      change: '+24%',
      changeType: 'positive',
      icon: 'ri-user-line',
      color: 'bg-green-500'
    },
    {
      title: 'Aylık Gelir',
      value: '₺45,200',
      change: '-3%',
      changeType: 'negative',
      icon: 'ri-money-dollar-circle-line',
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
            <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
              <i className={`${stat.icon} text-white text-xl`}></i>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className={`text-sm font-medium ${
              stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.change}
            </span>
            <span className="text-gray-600 text-sm ml-2">son aya göre</span>
          </div>
        </div>
      ))}
    </div>
  );
}