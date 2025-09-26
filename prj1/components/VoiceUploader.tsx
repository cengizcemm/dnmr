'use client';

import { useState, useRef, useEffect } from 'react';

interface VoiceUploaderProps {
  onUpload: (audioBlob: Blob) => void;
  maxDuration?: number;
  disabled?: boolean;
}

export default function VoiceUploader({ onUpload, maxDuration = 120, disabled = false }: VoiceUploaderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const startRecording = async () => {
    try {
      setError(null);
      audioChunksRef.current = [];
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        } 
      });
      
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/mp4'
      });
      
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { 
          type: mediaRecorder.mimeType 
        });
        
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        setHasRecording(true);
        
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start(100);
      setIsRecording(true);
      setRecordingTime(0);
      
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= maxDuration) {
            stopRecording();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
      
    } catch (error) {
      console.error('Error starting recording:', error);
      setError('Mikrofon izni reddedildi');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      if (isPaused) {
        mediaRecorderRef.current.resume();
        timerRef.current = setInterval(() => {
          setRecordingTime(prev => {
            if (prev >= maxDuration) {
              stopRecording();
              return prev;
            }
            return prev + 1;
          });
        }, 1000);
      } else {
        mediaRecorderRef.current.pause();
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      }
      setIsPaused(!isPaused);
    }
  };

  const playRecording = () => {
    if (audioUrl && !isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      
      audio.onended = () => {
        setIsPlaying(false);
      };
      
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
    setError(null);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError('Dosya çok büyük (max 5MB)');
      return;
    }

    if (!file.type.startsWith('audio/')) {
      setError('Geçersiz dosya türü');
      return;
    }

    setError(null);
    const url = URL.createObjectURL(file);
    setAudioUrl(url);
    setHasRecording(true);
    
    const audio = new Audio(url);
    audio.onloadedmetadata = () => {
      setRecordingTime(Math.floor(audio.duration));
    };
  };

  const uploadVoiceMessage = async () => {
    if (!audioUrl) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const response = await fetch(audioUrl);
      const audioBlob = await response.blob();
      
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      await new Promise(resolve => setTimeout(resolve, 1000));
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      setTimeout(() => {
        onUpload(audioBlob);
        deleteRecording();
        setIsUploading(false);
        setUploadProgress(0);
      }, 500);
      
    } catch (error) {
      console.error('Error uploading voice message:', error);
      setError('Yükleme hatası');
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getRecordingButtonColor = () => {
    if (isRecording) {
      return isPaused ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-red-500 hover:bg-red-600';
    }
    return 'bg-blue-500 hover:bg-blue-600';
  };

  return (
    <div className="bg-white border rounded-lg p-4 space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <div className="flex items-center">
            <i className="ri-error-warning-line text-red-500 mr-2"></i>
            <span className="text-red-700 text-sm">{error}</span>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <h3 className="text-base font-medium text-gray-900">
          {hasRecording ? 'Sesli Mesaj Hazır' : 'Sesli Mesaj Kaydet'}
        </h3>
        {recordingTime > 0 && (
          <div className="text-sm text-gray-600 font-mono">
            {formatTime(recordingTime)} / {formatTime(maxDuration)}
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {!hasRecording && (
          <>
            <button
              onClick={isRecording ? stopRecording : startRecording}
              disabled={disabled}
              className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer min-h-[44px] text-white flex items-center ${getRecordingButtonColor()} disabled:bg-gray-300`}
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

            {isRecording && (
              <button
                onClick={pauseRecording}
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer min-h-[44px] flex items-center"
              >
                <i className={`${isPaused ? 'ri-play-circle-line' : 'ri-pause-circle-line'} mr-2`}></i>
                {isPaused ? 'Devam Et' : 'Duraklat'}
              </button>
            )}

            <div className="text-sm text-gray-500">veya</div>

            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer min-h-[44px] flex items-center"
            >
              <i className="ri-upload-line mr-2"></i>
              Dosyadan Yükle
            </button>
          </>
        )}

        {hasRecording && !isUploading && (
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
                className={`w-2 bg-red-500 rounded-full transition-all duration-300 ${
                  isPaused ? 'h-2' : 'h-4 animate-pulse'
                }`}
                style={{
                  animationDelay: `${i * 0.1}s`
                }}
              ></div>
            ))}
          </div>
          <span className="text-sm text-red-600 font-medium">
            {isPaused ? 'DURAKLADI' : 'KAYIT EDİLİYOR'}
          </span>
          <div className="flex-1 bg-gray-200 rounded-full h-2 ml-4">
            <div 
              className="bg-red-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${(recordingTime / maxDuration) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {hasRecording && !isRecording && !isUploading && (
        <div className="bg-gray-100 rounded-lg p-3">
          <div className="flex items-center space-x-1 h-8">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="bg-blue-400 rounded-full w-1"
                style={{
                  height: `${Math.random() * 100 + 20}%`,
                  opacity: isPlaying ? (Math.random() * 0.5 + 0.5) : 0.6
                }}
              ></div>
            ))}
          </div>
        </div>
      )}

      {isUploading && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">İşleniyor...</span>
            <span className="text-sm text-gray-500">{uploadProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      {hasRecording && !isUploading && (
        <button
          onClick={uploadVoiceMessage}
          disabled={disabled}
          className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-lg font-medium transition-colors cursor-pointer min-h-[44px] flex items-center justify-center"
        >
          <i className="ri-send-plane-line mr-2"></i>
          Mesajı Gönder
        </button>
      )}

      <div className="text-xs text-gray-500 bg-gray-50 rounded p-3">
        <div className="space-y-1">
          <p>• Maksimum {maxDuration / 60} dakika</p>
          <p>• Maksimum 5MB dosya boyutu</p>
          <p>• Temiz ses için sessiz bir ortamda kayıt yapın</p>
          <p>• Mesajınız onay bekleyecek, sonra profilde görünecek</p>
          <p>• Desteklenen formatlar: WAV, MP3, OGG, WEBM, MP4</p>
        </div>
      </div>
    </div>
  );
}