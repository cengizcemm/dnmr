'use client';

import { useState, useRef, useEffect } from 'react';

interface VoiceMessageProps {
  senderName: string;
  audioUrl: string;
  duration: number;
  timestamp: string;
}

export default function VoiceMessage({ senderName, audioUrl, duration, timestamp }: VoiceMessageProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const togglePlayback = () => {
    if (!audioRef.current) {
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      
      audio.onloadstart = () => setIsLoading(true);
      audio.oncanplay = () => setIsLoading(false);
      audio.onended = () => {
        setIsPlaying(false);
        setCurrentTime(0);
      };
      audio.ontimeupdate = () => {
        setCurrentTime(audio.currentTime);
      };
      audio.onerror = () => {
        setIsLoading(false);
        alert('Ses dosyası yüklenemedi');
      };
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="bg-gray-50 rounded-lg p-4 flex items-center space-x-4">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
          <i className="ri-user-voice-line text-purple-600"></i>
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium text-gray-900 truncate">{senderName}</h4>
          <span className="text-xs text-gray-500">{timestamp}</span>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={togglePlayback}
            disabled={isLoading}
            className="w-8 h-8 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
          >
            {isLoading ? (
              <i className="ri-loader-4-line animate-spin text-sm"></i>
            ) : isPlaying ? (
              <i className="ri-pause-fill text-sm"></i>
            ) : (
              <i className="ri-play-fill text-sm ml-0.5"></i>
            )}
          </button>
          
          <div className="flex-1 flex items-center space-x-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2 relative">
              <div 
                className="bg-purple-500 h-2 rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-500 font-mono min-w-[35px]">
              {formatTime(currentTime)}/{formatTime(duration)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}