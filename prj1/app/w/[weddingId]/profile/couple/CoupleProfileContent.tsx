
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import ImageLightbox from '../../../../components/ImageLightbox';
import VoiceUploader from '../../../../components/VoiceUploader';
import UploadProgress from '../../../../components/UploadProgress';

interface CoupleProfileContentProps {
  weddingId: string;
}

export default function CoupleProfileContent({ weddingId }: CoupleProfileContentProps) {
  const [showFullStory, setShowFullStory] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string>('');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [message, setMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);
  const [showVoiceUpload, setShowVoiceUpload] = useState(false);
  const [uploadingPhotos, setUploadingPhotos] = useState<File[]>([]);
  const [uploaderName, setUploaderName] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [rsvpStatus, setRsvpStatus] = useState<'attending' | 'not-attending' | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadError, setUploadError] = useState('');
  const [showUploadSuccess, setShowUploadSuccess] = useState(false);
  const [isNameRequired, setIsNameRequired] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showVoiceUploader, setShowVoiceUploader] = useState(false);
  const [congratsMessage, setCongratsMessage] = useState('');
  const [showCongratsForm, setShowCongratsForm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Added user state and role
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<string>('guest');

  // Kullanıcı bilgilerini al
  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      const userData = JSON.parse(user);
      setCurrentUser(userData);
      setUserRole(userData.role || 'guest');
    }
  }, []);

  // Dashboard URL'ini kullanıcı rolüne göre belirle
  const getDashboardUrl = () => {
    switch (userRole) {
      case 'couple':
        return '/couple/dashboard';
      case 'admin':
        return '/admin/dashboard';
      case 'venue':
        return '/venue/dashboard';
      case 'guest':
      default:
        return '/guest/dashboard';
    }
  };

  // Dashboard buton metni
  const getDashboardButtonText = () => {
    switch (userRole) {
      case 'couple':
        return "Çift Dashboard'ına Dön";
      case 'admin':
        return "Admin Dashboard'ına Dön";
      case 'venue':
        return "Mekan Dashboard'ına Dön";
      case 'guest':
      default:
        return "Misafir Dashboard'ına Dön";
    }
  };

  // Basit ses yükleme bileşeni
  const SimpleVoiceUploader = ({ onUpload }: { onUpload: (audioBlob: Blob) => void }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [hasRecording, setHasRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const startRecording = async () => {
      try {
        audioChunksRef.current = [];
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const url = URL.createObjectURL(audioBlob);
          setAudioUrl(url);
          setHasRecording(true);
          stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorder.start(100);
        setIsRecording(true);
        setRecordingTime(0);

        timerRef.current = setInterval(() => {
          setRecordingTime(prev => prev + 1);
        }, 1000);
      } catch (error) {
        alert('Mikrofon izni gerekli');
      }
    };

    const stopRecording = () => {
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      }
    };

    const playRecording = () => {
      if (audioUrl && !isPlaying) {
        const audio = new Audio(audioUrl);
        audioRef.current = audio;
        audio.onended = () => setIsPlaying(false);
        audio.play();
        setIsPlaying(true);
      } else if (audioRef.current && isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    const deleteRecording = () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
        setAudioUrl(null);
      }
      setHasRecording(false);
      setRecordingTime(0);
      setIsPlaying(false);
    };

    const uploadVoiceMessage = async () => {
      if (!audioUrl) return;
      const response = await fetch(audioUrl);
      const audioBlob = await response.blob();
      onUpload(audioBlob);
      deleteRecording();
    };

    const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
      <div className="bg-white border rounded-lg p-4 space-y-4">
        <h3 className="text-base font-medium text-gray-900">
          {hasRecording ? 'Sesli Mesaj Hazır' : 'Sesli Mesaj Kaydet'}
        </h3>

        {recordingTime > 0 && (
          <div className="text-sm text-gray-600 font-mono">
            {formatTime(recordingTime)}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          {!hasRecording && (
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer min-h-[44px] text-white flex items-center ${
                isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {isRecording ? (
                <>
                  <i className="ri-stop-circle-line mr-2"></i>
                  Kaydı Durdur
                </>
              ) : (
                <>
                  <i className="ri-mic-line mr-2"></i>
                  Sesli Mesaj Kaydet
                </>
              )}
            </button>
          )}

          {hasRecording && (
            <>
              <button
                onClick={playRecording}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer min-h-[44px] flex items-center"
              >
                <i className={`${isPlaying ? 'ri-pause-circle-line' : 'ri-play-circle-line'} mr-2`}></i>
                {isPlaying ? 'Duraklat' : 'Dinle'}
              </button>

              <button
                onClick={deleteRecording}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer min-h-[44px] flex items-center"
              >
                <i className="ri-delete-bin-line mr-2"></i>
                Sil
              </button>
            </>
          )}
        </div>

        {isRecording && (
          <div className="flex items-center space-x-2 py-2">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 bg-red-500 rounded-full h-4 animate-pulse"
                  style={{ animationDelay: `${i * 0.1}s` }}
                ></div>
              ))}
            </div>
            <span className="text-sm text-red-600 font-medium">KAYIT EDİLİYOR</span>
          </div>
        )}

        {hasRecording && (
          <>
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="flex items-center space-x-1 h-8">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-blue-400 rounded-full w-1 opacity-60"
                    style={{ height: `${Math.random() * 100 + 20}%` }}
                  ></div>
                ))}
              </div>
            </div>

            <button
              onClick={uploadVoiceMessage}
              className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors cursor-pointer min-h-[44px] flex items-center justify-center"
            >
              <i className="ri-send-plane-line mr-2"></i>
              Mesajı Gönder
            </button>
          </>
        )}

        <div className="text-xs text-gray-500 bg-gray-50 rounded p-3">
          <div className="space-y-1">
            <p>• Maksimum 2 dakika</p>
            <p>• Temiz ses için sessiz ortamda kayıt yapın</p>
            <p>• Mesajınız onay bekleyecek</p>
          </div>
        </div>
      </div>
    );
  };

  // Mock data for voice messages
  const [voiceMessages] = useState([
    {
      id: 1,
      senderName: 'Emma Wilson',
      audioUrl: '/api/voice/message1.mp3',
      duration: 45,
      timestamp: '2 saat önce',
      approved: true
    },
    {
      id: 2,
      senderName: 'James Brown',
      audioUrl: '/api/voice/message2.mp3',
      duration: 30,
      timestamp: '5 saat önce',
      approved: true
    },
    {
      id: 3,
      senderName: 'Lisa Garcia',
      audioUrl: '/api/voice/message3.mp3',
      duration: 60,
      timestamp: '1 gün önce',
      approved: false
    }
  ]);

  // Mock data for guest photos (pending approval)
  const [guestPhotos] = useState([
    {
      id: 1,
      url: 'https://readdy.ai/api/search-image?query=Wedding%20guest%20photo%2C%20celebration%20moment%2C%20happy%20people%20at%20wedding%2C%20candid%20photography%2C%20joyful%20expressions&width=300&height=400&seq=guest-photo-1&orientation=portrait',
      uploadedBy: 'Anna Taylor',
      timestamp: '1 saat önce',
      approved: false
    },
    {
      id: 2,
      url: 'https://readdy.ai/api/search-image?query=Wedding%20reception%20photo%2C%20dinner%20table%2C%20guests%20enjoying%20food%2C%20wedding%20celebration%2C%20social%20gathering&width=300&height=400&seq=guest-photo-2&orientation=portrait',
      uploadedBy: 'Michael Davis',
      timestamp: '3 saat önce',
      approved: true
    }
  ]);

  // Mock data for the couple
  const coupleData = {
    'wedding-sarah-michael': {
      bride: { name: 'Sarah Johnson', age: 28, occupation: 'Grafik Tasarımcı' },
      groom: { name: 'Michael Smith', age: 30, occupation: 'Yazılım Geliştirici' },
      story: 'Üniversitede tanıştık ve 5 yıl birlikte olduktan sonra nişanlandık. İkimiz de fotoğrafçılığı ve seyahati seviyoruz.',
      weddingDate: '15 Haziran 2024',
      venue: 'Grand Palace Hotel, İstanbul',
      photos: [
        'https://readdy.ai/api/search-image?query=Happy%20wedding%20couple%20portrait%2C%20bride%20in%20white%20dress%2C%20groom%20in%20black%20suit%2C%20romantic%20pose%2C%20professional%20wedding%20photography%2C%20outdoor%20garden%20setting&width=400&height=500&seq=couple-1&orientation=portrait',
        'https://readdy.ai/api/search-image?query=Wedding%20couple%20kissing%20under%20arch%2C%20romantic%20wedding%20ceremony%20moment%2C%20beautiful%20natural%20lighting%2C%20garden%20wedding%20venue%2C%20emotional%20intimate%20moment&width=400&height=500&seq=couple-2&orientation=portrait',
        'https://readdy.ai/api/search-image?query=Wedding%20couple%20dancing%20together%2C%20first%20dance%2C%20elegant%20ballroom%2C%20romantic%20lighting%2C%20bride%20white%20dress%20groom%20black%20tuxedo%2C%20celebration%20moment&width=400&height=500&seq=couple-3&orientation=portrait'
      ]
    },
    'wedding-emma-james': {
      bride: { name: 'Emma Wilson', age: 26, occupation: 'Öğretmen' },
      groom: { name: 'James Brown', age: 29, occupation: 'Doktor' },
      story: 'Arkadaşlarımız tanıştırdı ve ilk görüşte aşk oldu. 3 yıldır birlikteyiz ve sonunda evleniyoruz!',
      weddingDate: '22 Temmuz 2024',
      venue: 'Seaside Resort, Bodrum',
      photos: [
        'https://readdy.ai/api/search-image?query=Beach%20wedding%20couple%20portrait%2C%20bride%20flowing%20dress%2C%20groom%20casual%20suit%2C%20ocean%20background%2C%20sunset%20lighting%2C%20romantic%20seaside%20wedding&width=400&height=500&seq=couple-4&orientation=portrait',
        'https://readdy.ai/api/search-image?query=Wedding%20couple%20walking%20on%20beach%2C%20holding%20hands%2C%20wedding%20dress%20flowing%20in%20wind%2C%20golden%20hour%2C%20romantic%20beach%20wedding%20moment&width=400&height=500&seq=couple-5&orientation=portrait'
      ]
    },
    'wedding-alice-david': {
      bride: { name: 'Alice Johnson', age: 25, occupation: 'Hemşire' },
      groom: { name: 'David Miller', age: 27, occupation: 'Mimar' },
      story: 'Hastanede tanıştık, David yaralanmıştı ve ben onu tedavi ettim. O günden beri ayrılmadık.',
      weddingDate: '10 Ağustos 2024',
      venue: 'Mountain View Resort, Antalya',
      photos: [
        'https://readdy.ai/api/search-image?query=Mountain%20wedding%20couple%2C%20bride%20white%20dress%2C%20groom%20dark%20suit%2C%20scenic%20mountain%20background%2C%20natural%20outdoor%20wedding%20photography&width=400&height=500&seq=couple-6&orientation=portrait'
      ]
    }
  };

  // Wedding ID mapping
  const getWeddingData = (id: string) => {
    // Handle different ID formats
    const normalizedId = id.toLowerCase().replace(/[-_]/g, '-');

    if (normalizedId.includes('sarah') || normalizedId.includes('michael')) {
      return coupleData['wedding-sarah-michael'];
    } else if (normalizedId.includes('emma') || normalizedId.includes('james')) {
      return coupleData['wedding-emma-james'];
    } else if (normalizedId.includes('alice') || normalizedId.includes('david') || normalizedId.includes('lisa')) {
      return coupleData['wedding-alice-david'];
    }

    // Default fallback
    return coupleData['wedding-sarah-michael'];
  };

  const couple = getWeddingData(weddingId);

  // Guest photos (mock data)
  const guestPhotosData = [
    {
      id: 1,
      url: 'https://readdy.ai/api/search-image?query=Wedding%20guest%20candid%20photo%2C%20happy%20celebration%20moment%2C%20people%20dancing%2C%20party%20atmosphere%2C%20wedding%20reception%2C%20joyful%20expressions&width=300&height=400&seq=guest-1&orientation=portrait',
      uploader: 'Emma Wilson',
      timestamp: '2 saat önce',
      category: 'guest'
    },
    {
      id: 2,
      url: 'https://readdy.ai/api/search-image?query=Wedding%20ceremony%20guest%20photo%2C%20emotional%20moment%2C%20wedding%20venue%2C%20guests%20watching%20ceremony%2C%20happy%20tears%2C%20celebration&width=300&height=400&seq=guest-2&orientation=portrait',
      uploader: 'John Davis',
      timestamp: '4 saat önce',
      category: 'guest'
    },
    {
      id: 3,
      url: 'https://readdy.ai/api/search-image?query=Wedding%20reception%20group%20photo%2C%20friends%20together%2C%20formal%20attire%2C%20wedding%20venue%20background%2C%20smiling%20faces%2C%20celebration%20group&width=300&height=400&seq=guest-3&orientation=portrait',
      uploader: 'Lisa Anderson',
      timestamp: '1 gün önce',
      category: 'guest'
    }
  ];

  // Combine couple and guest photos for lightbox
  const allPhotos = [
    ...couple.photos.map((url, index) => ({
      id: `couple-${index}`,
      url,
      uploader: `${couple.bride.name} & ${couple.groom.name}`,
      timestamp: 'Düğün albümü',
      category: 'couple' as const
    })),
    ...guestPhotosData
  ];

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter(file => {
      const isValidType = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type);
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB
      return isValidType && isValidSize;
    });

    if (validFiles.length !== files.length) {
      setUploadError('Bazı dosyalar geçersiz format veya çok büyük (max 10MB)');
    } else {
      setUploadError('');
    }

    setSelectedFiles(prev => [...prev, ...validFiles]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const isValidType = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type);
      const isValidSize = file.size <= 10 * 1024 * 1024;
      return isValidType && isValidSize;
    });

    if (validFiles.length !== files.length) {
      setUploadError('Bazı dosyalar geçersiz format veya çok büyük (max 10MB)');
    } else {
      setUploadError('');
    }

    setSelectedFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    if (!uploaderName.trim()) {
      setIsNameRequired(true);
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setUploadError('');

    try {
      // Simulate upload progress
      for (let i = 0; i <= 100; i += 10) {
        setUploadProgress(i);
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      // Reset form
      setSelectedFiles([]);
      setUploaderName('');
      setIsNameRequired(false);
      setShowUploadSuccess(true);

      // Hide success message after 3 seconds
      setTimeout(() => setShowUploadSuccess(false), 3000);
    } catch (error) {
      setUploadError('Yükleme sırasında bir hata oluştu');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setShowLightbox(true);
  };

  const handleSendCongrats = () => {
    if (!congratsMessage.trim()) return;

    // Simulate sending message
    alert(`Tebrik mesajınız gönderildi: ${congratsMessage}`);
    setCongratsMessage('');
    setShowCongratsForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Sol - Dashboard'a Dön Butonu */}
            <Link
              href={getDashboardUrl()}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
            >
              <i className="ri-arrow-left-line text-lg"></i>
              <span className="font-medium">{getDashboardButtonText()}</span>
            </Link>

            {/* Orta - Çift Bilgisi */}
            <div className="text-center">
              <h1 className="text-xl font-semibold text-gray-900">Sarah & Michael</h1>
              <p className="text-sm text-gray-600">15 Haziran 2024</p>
            </div>

            {/* Sağ - Kullanıcı Bilgisi */}
            <div className="flex items-center space-x-2">
              <img
                src={currentUser?.avatar || "https://readdy.ai/api/search-image?query=Happy%20person%20avatar%2C%20friendly%20smile%2C%20professional%20headshot%2C%20wedding%20guest%20portrait&width=100&height=100&seq=user-avatar&orientation=squarish"}
                alt={currentUser?.name || 'Kullanıcı'}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-sm font-medium text-gray-700">
                {currentUser?.name || 'Misafir'}
              </span>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full capitalize">
                {userRole}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Success Message */}
        {showUploadSuccess && (
          <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center">
            <i className="ri-check-line mr-2"></i>
            Fotoğraflarınız başarıyla yüklendi!
          </div>
        )}

        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden mb-8">
          <div
            className="h-64 bg-cover bg-center relative"
            style={{
              backgroundImage: `url('https://readdy.ai/api/search-image?query=Romantic%20wedding%20venue%20background%2C%20elegant%20wedding%20decoration%2C%20beautiful%20floral%20arrangements%2C%20luxury%20wedding%20setup%2C%20dreamy%20wedding%20atmosphere&width=1200&height=400&seq=wedding-bg&orientation=landscape')`
            }}
          >
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-3xl font-bold mb-2">{couple.bride.name} & {couple.groom.name}</h1>
              <p className="text-lg opacity-90">{couple.weddingDate} • {couple.venue}</p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Couple Info */}
          <div className="lg:col-span-1">
            {/* Couple Details */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Çift Hakkında</h3>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                    <i className="ri-heart-2-line text-rose-600"></i>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{couple.bride.name}</h4>
                    <p className="text-sm text-gray-600">{couple.bride.age} yaşında • {couple.bride.occupation}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <i className="ri-heart-2-line text-blue-600"></i>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{couple.groom.name}</h4>
                    <p className="text-sm text-gray-600">{couple.groom.age} yaşında • {couple.groom.occupation}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Love Story */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Aşk Hikayemiz</h3>
              <p className="text-gray-700 leading-relaxed">{couple.story}</p>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Hızlı İşlemler</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setShowVoiceUploader(true)}
                  className="w-full bg-green-50 hover:bg-green-100 text-green-700 py-3 px-4 rounded-lg font-medium transition-colors cursor-pointer flex items-center justify-center whitespace-nowrap"
                >
                  <i className="ri-mic-line mr-2"></i>
                  Sesli Mesaj Bırak
                </button>

                <button
                  onClick={() => setShowCongratsForm(true)}
                  className="w-full bg-purple-50 hover:bg-purple-100 text-purple-700 py-3 px-4 rounded-lg font-medium transition-colors cursor-pointer flex items-center justify-center whitespace-nowrap"
                >
                  <i className="ri-message-3-line mr-2"></i>
                  Tebrik Mesajı Gönder
                </button>

                <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 py-3 px-4 rounded-lg font-medium transition-colors cursor-pointer flex items-center justify-center whitespace-nowrap">
                  <i className="ri-share-line mr-2"></i>
                  Profili Paylaş
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Photos & Upload */}
          <div className="lg:col-span-2">
            {/* Photo Upload Section */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Anılarınızı Paylaşın</h3>

              {/* Uploader Name Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  İsminiz <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={uploaderName}
                  onChange={(e) => {
                    setUploaderName(e.target.value);
                    if (isNameRequired) setIsNameRequired(false);
                  }}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent ${
                    isNameRequired ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Lütfen isminizi yazın"
                />
                {isNameRequired && (
                  <p className="text-red-500 text-sm mt-1">İsminizi yazmanız gerekiyor</p>
                )}
              </div>

              {/* Drag & Drop Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer 
                  ${dragActive ? 'border-rose-400 bg-rose-50' : 'border-gray-300 hover:border-rose-400 hover:bg-rose-50'}`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
                    <i className="ri-image-add-line text-white text-2xl"></i>
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-900 mb-2">
                      Fotoğrafları buraya sürükleyin veya seçin
                    </p>
                    <p className="text-sm text-gray-600">
                      JPG, PNG, WEBP formatları desteklenir (Max 10MB)
                    </p>
                  </div>
                  <button
                    type="button"
                    className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105 whitespace-nowrap cursor-pointer"
                  >
                    Dosya Seç
                  </button>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleFileSelect}
                className="hidden"
              />

              {/* Error Message */}
              {uploadError && (
                <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {uploadError}
                </div>
              )}

              {/* Selected Files Preview */}
              {selectedFiles.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-medium text-gray-900 mb-3">Seçilen Dosyalar ({selectedFiles.length})</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="relative bg-gray-50 rounded-lg p-3">
                        <div className="aspect-square bg-gray-200 rounded-lg mb-2 overflow-hidden">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-xs text-gray-600 truncate mb-1">{file.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                        <button
                          onClick={() => removeFile(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer"
                        >
                          <i className="ri-close-line text-xs"></i>
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Upload Button & Progress */}
                  <div className="mt-4">
                    {uploading ? (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Yükleniyor...</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-rose-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          ></div>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={handleUpload}
                        disabled={selectedFiles.length === 0 || !uploaderName.trim()}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-400 disabled:to-gray-400 text-white py-3 px-4 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer"
                      >
                        <i className="ri-upload-cloud-line mr-2"></i>
                        {selectedFiles.length} Fotoğrafı Yükle
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Upload Info */}
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <i className="ri-information-line text-blue-600 mt-0.5"></i>
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Önemli Bilgiler:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Yüklediğiniz fotoğraflar çift tarafından onaylandıktan sonra görünür olacak</li>
                      <li>• Lütfen sadece düğünle ilgili fotoğrafları yükleyin</li>
                      <li>• İsminizi yazmayı unutmayın, böylece çift kimin paylaştığını bilecek</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Photo Gallery */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Düğün Fotoğrafları</h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {allPhotos.map((photo, index) => (
                  <div key={photo.id} className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer">
                    <img
                      src={photo.url}
                      alt={`${photo.uploader} tarafından paylaşıldı`}
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-300"
                      onClick={() => openLightbox(index)}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors">
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                        <p className="text-white text-xs font-medium">{photo.uploader}</p>
                        <p className="text-white/80 text-xs">{photo.timestamp}</p>
                        {photo.category === 'couple' && (
                          <div className="inline-flex items-center bg-rose-500/80 text-white text-xs px-2 py-1 rounded-full mt-1">
                            <i className="ri-heart-fill mr-1"></i>
                            Çift
                          </div>
                        )}
                        {photo.category === 'guest' && (
                          <div className="inline-flex items-center bg-blue-500/80 text-white text-xs px-2 py-1 rounded-full mt-1">
                            <i className="ri-user-fill mr-1"></i>
                            Misafir
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Voice Message Uploader Modal */}
        {showVoiceUploader && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Sesli Mesaj Bırak</h3>
                <button
                  onClick={() => setShowVoiceUploader(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>

              <SimpleVoiceUploader
                onUpload={(audioBlob) => {
                  console.log('Voice message uploaded:', audioBlob);
                  setShowVoiceUploader(false);
                }}
              />
            </div>
          </div>
        )}

        {/* Congratulations Form Modal */}
        {showCongratsForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Tebrik Mesajı Gönder</h3>
                <button
                  onClick={() => setShowCongratsForm(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mesajınız
                  </label>
                  <textarea
                    value={congratsMessage}
                    onChange={(e) => setCongratsMessage(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none"
                    rows={4}
                    maxLength={500}
                    placeholder="Çifte tebrik mesajınızı yazın..."
                  />
                  <p className="text-xs text-gray-500 mt-1">{congratsMessage.length}/500 karakter</p>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowCongratsForm(false)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap"
                  >
                    İptal
                  </button>
                  <button
                    onClick={handleSendCongrats}
                    disabled={!congratsMessage.trim()}
                    className="flex-1 bg-rose-500 hover:bg-rose-600 disabled:bg-gray-300 text-white py-2 px-4 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Gönder
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Custom Lightbox Modal */}
        {showLightbox && (
          <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
            <div className="absolute inset-0 cursor-pointer" onClick={() => setShowLightbox(false)}></div>

            {/* Close Button */}
            <button
              onClick={() => setShowLightbox(false)}
              className="absolute top-4 right-4 z-60 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center cursor-pointer transition-colors"
            >
              <i className="ri-close-line text-xl"></i>
            </button>

            {/* Navigation */}
            {allPhotos.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImageIndex(prev => prev > 0 ? prev - 1 : allPhotos.length - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-60 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center cursor-pointer transition-colors"
                >
                  <i className="ri-arrow-left-line text-xl"></i>
                </button>

                <button
                  onClick={() => setCurrentImageIndex(prev => prev < allPhotos.length - 1 ? prev + 1 : 0)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-60 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center cursor-pointer transition-colors"
                >
                  <i className="ri-arrow-right-line text-xl"></i>
                </button>
              </>
            )}

            {/* Image */}
            <div className="relative z-50 max-w-full max-h-full p-8">
              <img
                src={allPhotos[currentImageIndex]?.url}
                alt={`${allPhotos[currentImageIndex]?.uploader} tarafından paylaşıldı`}
                className="max-w-full max-h-full object-contain rounded-lg"
                style={{ maxHeight: '85vh', maxWidth: '90vw' }}
              />

              {/* Image Info */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg text-center">
                <p className="font-medium">{allPhotos[currentImageIndex]?.uploader}</p>
                <p className="text-sm opacity-80">{allPhotos[currentImageIndex]?.timestamp}</p>
                {allPhotos.length > 1 && (
                  <p className="text-xs opacity-60 mt-1">{currentImageIndex + 1} / {allPhotos.length}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
