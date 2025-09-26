
'use client';

import { useEffect, useRef, useState } from 'react';

interface QRScannerProps {
  onResult: (result: string) => void;
  onError?: (error: string) => void;
}

export default function QRScanner({ onResult, onError }: QRScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string>('');
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startScanning = async () => {
    try {
      setIsScanning(true);
      setError('');

      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera not supported in this browser');
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 640 },
          height: { ideal: 480 }
        } 
      });
      
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }

      // Simulate QR detection for demo
      setTimeout(() => {
        onResult('WEDDING-2024-SARAH-MICHAEL-DEMO');
        stopScanning();
      }, 3000);

    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Camera access denied or not available';
      setError(errorMsg);
      onError?.(errorMsg);
      setIsScanning(false);
    }
  };

  const stopScanning = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setIsScanning(false);
  };

  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  return (
    <div className="relative">
      <video
        ref={videoRef}
        className={`w-full aspect-square rounded-lg bg-gray-100 object-cover ${isScanning ? 'block' : 'hidden'}`}
        playsInline
        muted
        autoPlay
      />
      
      <canvas
        ref={canvasRef}
        className="hidden"
      />
      
      {!isScanning && !error && (
        <div className="w-full aspect-square rounded-lg bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <i className="ri-camera-line text-4xl text-gray-400 mb-4"></i>
            <p className="text-sm text-gray-600 mb-4">Kamerayı başlatmak için tıklayın</p>
            <button
              onClick={startScanning}
              className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              Kamerayı Başlat
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="w-full aspect-square rounded-lg bg-gray-100 flex items-center justify-center">
          <div className="text-center text-red-500 p-4">
            <i className="ri-error-warning-line text-4xl mb-4"></i>
            <p className="text-sm mb-4">{error}</p>
            <button
              onClick={startScanning}
              className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              Tekrar Dene
            </button>
          </div>
        </div>
      )}

      {isScanning && (
        <>
          <div className="absolute top-4 right-4">
            <button
              onClick={stopScanning}
              className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors cursor-pointer"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>

          <div className="absolute inset-0 border-2 border-rose-500 rounded-lg pointer-events-none">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-white rounded-lg shadow-lg animate-pulse"></div>
          </div>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg text-sm">
            QR kodu arıyor... (Demo: 3 saniye)
          </div>
        </>
      )}
    </div>
  );
}
