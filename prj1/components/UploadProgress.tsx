'use client';

import { useState, useEffect } from 'react';

interface UploadItem {
  id: string;
  name: string;
  size: number;
  progress: number;
  status: 'uploading' | 'success' | 'error';
  error?: string;
}

interface UploadProgressProps {
  files: File[];
  onComplete: (results: Array<{file: File, success: boolean, error?: string}>) => void;
  onCancel?: () => void;
  maxFileSize?: number;
  allowedTypes?: string[];
}

export default function UploadProgress({ 
  files, 
  onComplete, 
  onCancel, 
  maxFileSize = 10 * 1024 * 1024, // 10MB
  allowedTypes = ['image/*', 'video/*', 'audio/*']
}: UploadProgressProps) {
  const [uploadItems, setUploadItems] = useState<UploadItem[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Initialize upload items
    const items: UploadItem[] = files.map(file => ({
      id: `${file.name}-${file.size}-${Date.now()}`,
      name: file.name,
      size: file.size,
      progress: 0,
      status: 'uploading' as const
    }));

    setUploadItems(items);

    // Start uploads
    startUploads(items);
  }, [files]);

  const startUploads = async (items: UploadItem[]) => {
    const results: Array<{file: File, success: boolean, error?: string}> = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const file = files[i];

      try {
        // Validate file
        const validation = validateFile(file);
        if (!validation.valid) {
          throw new Error(validation.error);
        }

        // Simulate upload with progress
        await simulateUpload(item.id);
        
        setUploadItems(prev => 
          prev.map(upload => 
            upload.id === item.id 
              ? { ...upload, status: 'success', progress: 100 }
              : upload
          )
        );

        results.push({ file, success: true });

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Upload failed';
        
        setUploadItems(prev => 
          prev.map(upload => 
            upload.id === item.id 
              ? { ...upload, status: 'error', error: errorMessage }
              : upload
          )
        );

        results.push({ file, success: false, error: errorMessage });
      }
    }

    setIsComplete(true);
    
    // Auto-close after 2 seconds if all successful
    const allSuccessful = results.every(r => r.success);
    if (allSuccessful) {
      setTimeout(() => {
        onComplete(results);
      }, 2000);
    } else {
      // Wait for user action if there are errors
      setTimeout(() => {
        onComplete(results);
      }, 5000);
    }
  };

  const validateFile = (file: File): { valid: boolean; error?: string } => {
    // Check file size
    if (file.size > maxFileSize) {
      return {
        valid: false,
        error: `Dosya çok büyük (Maks: ${formatFileSize(maxFileSize)})`
      };
    }

    // Check file type
    const isAllowed = allowedTypes.some(type => {
      if (type.endsWith('/*')) {
        const category = type.split('/')[0];
        return file.type.startsWith(category + '/');
      }
      return file.type === type;
    });

    if (!isAllowed) {
      return {
        valid: false,
        error: 'Desteklenmeyen dosya türü'
      };
    }

    return { valid: true };
  };

  const simulateUpload = (itemId: string): Promise<void> => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 20;
        
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          resolve();
        }

        setUploadItems(prev => 
          prev.map(item => 
            item.id === itemId 
              ? { ...item, progress: Math.min(progress, 100) }
              : item
          )
        );
      }, 200);
    });
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'uploading':
        return <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>;
      case 'success':
        return <i className="ri-check-line text-green-500 text-lg"></i>;
      case 'error':
        return <i className="ri-close-line text-red-500 text-lg"></i>;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'uploading':
        return 'bg-blue-500';
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gray-300';
    }
  };

  const totalProgress = uploadItems.length > 0 
    ? Math.round(uploadItems.reduce((sum, item) => sum + item.progress, 0) / uploadItems.length)
    : 0;

  const successCount = uploadItems.filter(item => item.status === 'success').length;
  const errorCount = uploadItems.filter(item => item.status === 'error').length;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">
              Dosya Yükleme
            </h3>
            {isComplete && (
              <button
                onClick={() => onComplete([])}
                className="text-gray-400 hover:text-gray-600 cursor-pointer p-2"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            )}
          </div>
          
          {/* Overall Progress */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Toplam İlerleme</span>
              <span>{totalProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${totalProgress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* File List */}
        <div className="p-6 max-h-96 overflow-y-auto">
          <div className="space-y-4">
            {uploadItems.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <div className="flex-shrink-0">
                      {getStatusIcon(item.status)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(item.size)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {item.progress}%
                    </p>
                    {item.status === 'error' && item.error && (
                      <p className="text-xs text-red-600 max-w-32 truncate">
                        {item.error}
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full transition-all duration-300 ${getStatusColor(item.status)}`}
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          {isComplete ? (
            <div>
              <div className="flex items-center justify-center space-x-6 mb-4">
                {successCount > 0 && (
                  <div className="flex items-center text-green-600">
                    <i className="ri-check-circle-fill mr-2 text-lg"></i>
                    <span className="font-medium">{successCount} başarılı</span>
                  </div>
                )}
                {errorCount > 0 && (
                  <div className="flex items-center text-red-600">
                    <i className="ri-error-warning-fill mr-2 text-lg"></i>
                    <span className="font-medium">{errorCount} hatalı</span>
                  </div>
                )}
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => onComplete(uploadItems.map((item, index) => ({
                    file: files[index],
                    success: item.status === 'success',
                    error: item.error
                  })))}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-colors cursor-pointer min-h-[44px]"
                >
                  Tamamla
                </button>
                {errorCount > 0 && (
                  <button
                    onClick={() => {
                      // Retry failed uploads
                      const failedItems = uploadItems.filter(item => item.status === 'error');
                      const failedFiles = failedItems.map(item => {
                        const index = uploadItems.findIndex(ui => ui.id === item.id);
                        return files[index];
                      }).filter(Boolean);
                      
                      if (failedFiles.length > 0) {
                        setIsComplete(false);
                        startUploads(failedItems.map(item => ({ ...item, status: 'uploading', progress: 0, error: undefined })));
                      }
                    }}
                    className="px-4 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors cursor-pointer min-h-[44px]"
                  >
                    Tekrar Dene
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <button
                onClick={onCancel}
                className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors cursor-pointer min-h-[44px]"
              >
                İptal
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}