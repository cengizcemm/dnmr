
'use client';

interface VenueStatsProps {
  onStatClick?: (statType: string) => void;
}

export default function VenueStats({ onStatClick }: VenueStatsProps) {
  const stats = [
    {
      title: 'Toplam Çift',
      value: '24',
      change: '+3 bu ay',
      icon: 'ri-heart-line',
      color: 'text-rose-600',
      bgColor: 'bg-rose-100',
      type: 'couples'
    },
    {
      title: 'Bu Ay Rezervasyon',
      value: '8',
      change: '+2 geçen ay',
      icon: 'ri-calendar-check-line',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      type: 'bookings'
    },
    {
      title: 'Aylık Gelir',
      value: '₺245,000',
      change: '+12% artış',
      icon: 'ri-money-dollar-circle-line',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      type: 'revenue'
    },
    {
      title: 'Medya Yüklemeleri',
      value: '1,247',
      change: '+156 bu hafta',
      icon: 'ri-image-line',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      type: 'media'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => onStatClick?.(stat.type)}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-green-600">{stat.change}</p>
            </div>
            <div className={`w-12 h-12 ${stat.bgColor} ${stat.color} rounded-lg flex items-center justify-center`}>
              <i className={`${stat.icon} text-xl`}></i>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
