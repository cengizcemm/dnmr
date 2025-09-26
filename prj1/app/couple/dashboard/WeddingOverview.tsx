
'use client';

import { useState } from 'react';

export default function WeddingOverview() {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showTaskEditModal, setShowTaskEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [showVenueModal, setShowVenueModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    category: 'planning',
    priority: 'medium',
    dueDate: ''
  });

  const [tasks, setTasks] = useState([
    { id: 1, title: 'Davet Listesi Hazırla', description: 'Tüm misafirlerin listesini çıkar', category: 'planning', priority: 'high', dueDate: '2024-04-01', completed: true },
    { id: 2, title: 'Düğün Pastası Sipariş', description: 'Pastane ile görüşme ayarla', category: 'catering', priority: 'high', dueDate: '2024-04-05', completed: false },
    { id: 3, title: 'Müzik Seçimi', description: 'DJ ile playlist hazırla', category: 'entertainment', priority: 'medium', dueDate: '2024-04-10', completed: false },
    { id: 4, title: 'Fotoğrafçı Rezervasyonu', description: 'Fotoğrafçı ile son görüşme', category: 'photography', priority: 'high', dueDate: '2024-03-25', completed: false },
    { id: 5, title: 'Nikah Kıyafetleri', description: 'Son prova randevusu', category: 'clothing', priority: 'medium', dueDate: '2024-04-08', completed: false },
    { id: 6, title: 'Çiçek Aranjmanları', description: 'Masa ve gelin buketi siparişi', category: 'decoration', priority: 'medium', dueDate: '2024-04-12', completed: false }
  ]);

  const stats = {
    totalTasks: tasks.length,
    completedTasks: tasks.filter(task => task.completed).length,
    pendingTasks: tasks.filter(task => !task.completed).length,
    highPriorityTasks: tasks.filter(task => task.priority === 'high' && !task.completed).length
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    const newTaskData = {
      id: tasks.length + 1,
      ...newTask,
      completed: false
    };
    setTasks([...tasks, newTaskData]);
    setShowTaskModal(false);
    setNewTask({ title: '', description: '', category: 'planning', priority: 'medium', dueDate: '' });
  };

  const handleEditTask = (task: any) => {
    setSelectedTask(task);
    setShowTaskEditModal(true);
  };

  const handleSaveEditTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTask) {
      setTasks(tasks.map(task => 
        task.id === selectedTask.id ? selectedTask : task
      ));
      setShowTaskEditModal(false);
      setSelectedTask(null);
    }
  };

  const handleToggleTask = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (taskId: number) => {
    if (confirm('Bu görevi silmek istediğinizden emin misiniz?')) {
      setTasks(tasks.filter(task => task.id !== taskId));
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'Yüksek';
      case 'medium': return 'Orta';
      case 'low': return 'Düşük';
      default: return 'Orta';
    }
  };

  const getCategoryLabel = (category: string) => {
    const categories = {
      planning: 'Planlama',
      catering: 'Yemek/İçecek',
      entertainment: 'Eğlence',
      photography: 'Fotoğraf',
      clothing: 'Kıyafet',
      decoration: 'Dekorasyon',
      venue: 'Mekan',
      invitation: 'Davetiye'
    };
    return categories[category as keyof typeof categories] || category;
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-lg shadow p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Hoş Geldiniz, Sarah & Michael!</h1>
            <p className="text-rose-100">Düğününüze kalan süre: <span className="font-semibold">45 gün</span></p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{new Date('2024-06-15').toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' })}</div>
            <div className="text-rose-100">Düğün Tarihi</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Toplam Görev</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalTasks}</p>
            </div>
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <i className="ri-task-line text-white text-lg"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Tamamlanan</p>
              <p className="text-2xl font-bold text-green-600">{stats.completedTasks}</p>
            </div>
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <i className="ri-check-line text-white text-lg"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Bekleyen</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pendingTasks}</p>
            </div>
            <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
              <i className="ri-time-line text-white text-lg"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Acil Görev</p>
              <p className="text-2xl font-bold text-red-600">{stats.highPriorityTasks}</p>
            </div>
            <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
              <i className="ri-alarm-warning-line text-white text-lg"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Hızlı İşlemler</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => setShowGuestModal(true)}
            className="bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg p-4 text-center cursor-pointer transition-colors"
          >
            <i className="ri-group-line text-2xl text-rose-600 mb-2"></i>
            <p className="font-medium text-rose-800">Misafir Ekle</p>
          </button>
          
          <button 
            onClick={() => setShowTaskModal(true)}
            className="bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-4 text-center cursor-pointer transition-colors"
          >
            <i className="ri-add-line text-2xl text-blue-600 mb-2"></i>
            <p className="font-medium text-blue-800">Görev Ekle</p>
          </button>
          
          <button 
            onClick={() => setShowVenueModal(true)}
            className="bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg p-4 text-center cursor-pointer transition-colors"
          >
            <i className="ri-building-line text-2xl text-purple-600 mb-2"></i>
            <p className="font-medium text-purple-800">Mekan Ayarları</p>
          </button>
          
          <button className="bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg p-4 text-center cursor-pointer transition-colors">
            <i className="ri-download-line text-2xl text-green-600 mb-2"></i>
            <p className="font-medium text-green-800">Rapor İndir</p>
          </button>
        </div>
      </div>

      {/* Wedding Preparation Checklist */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Düğün Hazırlık Listesi</h2>
              <p className="text-gray-600 text-sm mt-1">
                {stats.completedTasks}/{stats.totalTasks} görev tamamlandı 
                ({Math.round((stats.completedTasks / stats.totalTasks) * 100)}%)
              </p>
            </div>
            <button
              onClick={() => setShowTaskModal(true)}
              className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer flex items-center"
            >
              <i className="ri-add-line mr-2"></i>
              Yeni Görev
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-rose-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(stats.completedTasks / stats.totalTasks) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {tasks.map((task) => (
              <div 
                key={task.id} 
                className={`border rounded-lg p-4 transition-all duration-200 ${
                  task.completed 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => handleToggleTask(task.id)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-colors mt-0.5 ${
                      task.completed
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'bg-white border-gray-300 hover:border-green-400'
                    }`}
                  >
                    {task.completed && <i className="ri-check-line text-xs"></i>}
                  </button>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className={`font-medium ${task.completed ? 'text-green-800 line-through' : 'text-gray-900'}`}>
                          {task.title}
                        </h3>
                        <p className={`text-sm mt-1 ${task.completed ? 'text-green-600' : 'text-gray-600'}`}>
                          {task.description}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                            {getPriorityLabel(task.priority)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {getCategoryLabel(task.category)}
                          </span>
                          <span className="text-xs text-gray-500">
                            Son Tarih: {new Date(task.dueDate).toLocaleDateString('tr-TR')}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex gap-1 ml-4">
                        <button
                          onClick={() => handleEditTask(task)}
                          className="text-gray-400 hover:text-blue-600 cursor-pointer p-1"
                        >
                          <i className="ri-edit-line"></i>
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="text-gray-400 hover:text-red-600 cursor-pointer p-1"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {tasks.length === 0 && (
            <div className="text-center py-8">
              <i className="ri-task-line text-4xl text-gray-300 mb-4"></i>
              <p className="text-gray-500">Henüz görev eklenmemiş. İlk görevinizi ekleyin!</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Son Aktiviteler</h2>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <i className="ri-user-add-line text-white text-sm"></i>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">5 yeni misafir eklendi</p>
              <p className="text-xs text-gray-500">2 saat önce</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <i className="ri-check-line text-white text-sm"></i>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">"Davet Listesi Hazırla" görevi tamamlandı</p>
              <p className="text-xs text-gray-500">5 saat önce</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
              <i className="ri-image-line text-white text-sm"></i>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">3 yeni fotoğraf paylaşıldı</p>
              <p className="text-xs text-gray-500">1 gün önce</p>
            </div>
          </div>
        </div>
      </div>

      {/* Task Add Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Yeni Görev Ekle</h3>
              <form onSubmit={handleAddTask} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Görev Başlığı
                  </label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Açıklama
                  </label>
                  <textarea
                    value={newTask.description}
                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kategori
                  </label>
                  <select
                    value={newTask.category}
                    onChange={(e) => setNewTask({...newTask, category: e.target.value})}
                    className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  >
                    <option value="planning">Planlama</option>
                    <option value="catering">Yemek/İçecek</option>
                    <option value="entertainment">Eğlence</option>
                    <option value="photography">Fotoğraf</option>
                    <option value="clothing">Kıyafet</option>
                    <option value="decoration">Dekorasyon</option>
                    <option value="venue">Mekan</option>
                    <option value="invitation">Davetiye</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Öncelik
                  </label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                    className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  >
                    <option value="low">Düşük</option>
                    <option value="medium">Orta</option>
                    <option value="high">Yüksek</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Son Tarih
                  </label>
                  <input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-rose-500 hover:bg-rose-600 text-white py-2 px-4 rounded-lg font-medium transition-colors cursor-pointer"
                  >
                    Ekle
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowTaskModal(false)}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-medium transition-colors cursor-pointer"
                  >
                    İptal
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Task Edit Modal */}
      {showTaskEditModal && selectedTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Görevi Düzenle</h3>
              <form onSubmit={handleSaveEditTask} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Görev Başlığı
                  </label>
                  <input
                    type="text"
                    value={selectedTask.title}
                    onChange={(e) => setSelectedTask({...selectedTask, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Açıklama
                  </label>
                  <textarea
                    value={selectedTask.description}
                    onChange={(e) => setSelectedTask({...selectedTask, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kategori
                  </label>
                  <select
                    value={selectedTask.category}
                    onChange={(e) => setSelectedTask({...selectedTask, category: e.target.value})}
                    className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  >
                    <option value="planning">Planlama</option>
                    <option value="catering">Yemek/İçecek</option>
                    <option value="entertainment">Eğlence</option>
                    <option value="photography">Fotoğraf</option>
                    <option value="clothing">Kıyafet</option>
                    <option value="decoration">Dekorasyon</option>
                    <option value="venue">Mekan</option>
                    <option value="invitation">Davetiye</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Öncelik
                  </label>
                  <select
                    value={selectedTask.priority}
                    onChange={(e) => setSelectedTask({...selectedTask, priority: e.target.value})}
                    className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  >
                    <option value="low">Düşük</option>
                    <option value="medium">Orta</option>
                    <option value="high">Yüksek</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Son Tarih
                  </label>
                  <input
                    type="date"
                    value={selectedTask.dueDate}
                    onChange={(e) => setSelectedTask({...selectedTask, dueDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-rose-500 hover:bg-rose-600 text-white py-2 px-4 rounded-lg font-medium transition-colors cursor-pointer"
                  >
                    Kaydet
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowTaskEditModal(false);
                      setSelectedTask(null);
                    }}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-medium transition-colors cursor-pointer"
                  >
                    İptal
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Guest Modal */}
      {showGuestModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Misafir Yönetimi</h3>
              <p className="text-gray-600 mb-6">Misafir ekleme ve yönetme işlemleri için misafir yönetimi sayfasına yönlendirileceksiniz.</p>
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setShowGuestModal(false);
                    // Misafir yönetimi sayfasına yönlendir
                    window.location.hash = 'guests';
                  }}
                  className="flex-1 bg-rose-500 hover:bg-rose-600 text-white py-2 px-4 rounded-lg font-medium transition-colors cursor-pointer"
                >
                  Misafir Yönetimine Git
                </button>
                <button
                  onClick={() => setShowGuestModal(false)}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-medium transition-colors cursor-pointer"
                >
                  İptal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Venue Modal */}
      {showVenueModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Mekan Ayarları</h3>
              <p className="text-gray-600 mb-6">Düğün mekanınızın detaylarını ve ayarlarını güncellemek için profil düzenleyici sayfasına yönlendirileceksiniz.</p>
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setShowVenueModal(false);
                    // Profil düzenleyici sayfasına yönlendir
                    window.location.hash = 'profile';
                  }}
                  className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg font-medium transition-colors cursor-pointer"
                >
                  Profil Düzenleyiciye Git
                </button>
                <button
                  onClick={() => setShowVenueModal(false)}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-medium transition-colors cursor-pointer"
                >
                  İptal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
