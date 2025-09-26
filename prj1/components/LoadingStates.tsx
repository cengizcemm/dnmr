
'use client';

import { useState, useEffect } from 'react';

interface ProgressBarProps {
  progress: number;
  showPercentage?: boolean;
  color?: 'blue' | 'green' | 'rose' | 'purple';
  size?: 'sm' | 'md' | 'lg';
}

export function ProgressBar({ 
  progress, 
  showPercentage = true, 
  color = 'blue',
  size = 'md' 
}: ProgressBarProps) {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500', 
    rose: 'bg-rose-500',
    purple: 'bg-purple-500'
  };

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  return (
    <div className="w-full">
      <div className={`w-full bg-gray-200 rounded-full ${sizeClasses[size]}`}>
        <div
          className={`${colorClasses[color]} ${sizeClasses[size]} rounded-full transition-all duration-300 ease-out`}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        ></div>
      </div>
      {showPercentage && (
        <div className="flex justify-between text-sm text-gray-600 mt-1">
          <span>İlerleme</span>
          <span>{Math.round(progress)}%</span>
        </div>
      )}
    </div>
  );
}

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'blue' | 'green' | 'rose' | 'purple' | 'gray';
  text?: string;
}

export function LoadingSpinner({ 
  size = 'md', 
  color = 'blue',
  text 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    blue: 'text-blue-500',
    green: 'text-green-500',
    rose: 'text-rose-500', 
    purple: 'text-purple-500',
    gray: 'text-gray-500'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div className={`${sizeClasses[size]} ${colorClasses[color]} animate-spin`}>
        <i className="ri-loader-4-line text-current"></i>
      </div>
      {text && (
        <p className="text-sm text-gray-600 text-center">{text}</p>
      )}
    </div>
  );
}

interface UploadProgressProps {
  files: Array<{
    name: string;
    progress: number;
    status: 'uploading' | 'success' | 'error';
    error?: string;
  }>;
  onRetry?: (fileName: string) => void;
  onCancel?: (fileName: string) => void;
}

export function UploadProgress({ files, onRetry, onCancel }: UploadProgressProps) {
  return (
    <div className="space-y-3">
      {files.map((file, index) => (
        <div key={index} className="bg-white border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                file.status === 'success' ? 'bg-green-100' :
                file.status === 'error' ? 'bg-red-100' : 'bg-blue-100'
              }`}>
                {file.status === 'success' && <i className="ri-check-line text-green-600"></i>}
                {file.status === 'error' && <i className="ri-error-warning-line text-red-600"></i>}
                {file.status === 'uploading' && <i className="ri-upload-line text-blue-600"></i>}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 truncate max-w-48">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {file.status === 'success' && 'Yükleme tamamlandı'}
                  {file.status === 'error' && (file.error || 'Yükleme başarısız')}
                  {file.status === 'uploading' && `Yükleniyor... ${Math.round(file.progress)}%`}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {file.status === 'error' && onRetry && (
                <button
                  onClick={() => onRetry(file.name)}
                  className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded cursor-pointer whitespace-nowrap min-h-[32px]"
                >
                  Tekrar Dene
                </button>
              )}
              {file.status === 'uploading' && onCancel && (
                <button
                  onClick={() => onCancel(file.name)}
                  className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded cursor-pointer whitespace-nowrap min-h-[32px]"
                >
                  İptal
                </button>
              )}
            </div>
          </div>
          
          {file.status === 'uploading' && (
            <ProgressBar progress={file.progress} showPercentage={false} size="sm" />
          )}
        </div>
      ))}
    </div>
  );
}

interface SuccessMessageProps {
  title: string;
  message: string;
  action?: {
    text: string;
    onClick: () => void;
  };
  autoHide?: boolean;
  duration?: number;
}

export function SuccessMessage({ 
  title, 
  message, 
  action, 
  autoHide = false,
  duration = 5000 
}: SuccessMessageProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoHide) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [autoHide, duration]);

  if (!isVisible) return null;

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
      <div className="flex items-start">
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
          <i className="ri-check-line text-green-600 text-lg"></i>
        </div>
        <div className="flex-1">
          <h3 className="text-base font-medium text-green-900 mb-1">{title}</h3>
          <p className="text-sm text-green-700 mb-3">{message}</p>
          {action && (
            <button
              onClick={action.onClick}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap min-h-[36px]"
            >
              {action.text}
            </button>
          )}
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-green-400 hover:text-green-600 transition-colors cursor-pointer"
        >
          <i className="ri-close-line"></i>
        </button>
      </div>
    </div>
  );
}

interface ErrorMessageProps {
  title: string;
  message: string;
  details?: string;
  action?: {
    text: string;
    onClick: () => void;
  };
  onClose?: () => void;
}

export function ErrorMessage({ 
  title, 
  message, 
  details, 
  action, 
  onClose 
}: ErrorMessageProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <div className="flex items-start">
        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
          <i className="ri-error-warning-line text-red-600 text-lg"></i>
        </div>
        <div className="flex-1">
          <h3 className="text-base font-medium text-red-900 mb-1">{title}</h3>
          <p className="text-sm text-red-700 mb-3">{message}</p>
          
          {details && (
            <div>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-sm text-red-600 hover:text-red-800 mb-2 cursor-pointer"
              >
                {showDetails ? 'Detayları Gizle' : 'Detayları Göster'}
                <i className={`ri-arrow-${showDetails ? 'up' : 'down'}-s-line ml-1`}></i>
              </button>
              {showDetails && (
                <div className="bg-red-100 rounded p-3 text-xs text-red-800 font-mono">
                  {details}
                </div>
              )}
            </div>
          )}
          
          {action && (
            <button
              onClick={action.onClick}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap min-h-[36px]"
            >
              {action.text}
            </button>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-red-400 hover:text-red-600 transition-colors cursor-pointer"
          >
            <i className="ri-close-line"></i>
          </button>
        )}
      </div>
    </div>
  );
}

interface SkeletonLoaderProps {
  variant?: 'text' | 'card' | 'image' | 'list';
  count?: number;
  className?: string;
}

export function SkeletonLoader({ 
  variant = 'text', 
  count = 1,
  className = '' 
}: SkeletonLoaderProps) {
  const renderSkeleton = () => {
    switch (variant) {
      case 'text':
        return (
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
          </div>
        );
      
      case 'card':
        return (
          <div className="bg-white border rounded-lg p-4 space-y-3">
            <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
            </div>
            <div className="flex space-x-2">
              <div className="h-8 bg-gray-200 rounded animate-pulse w-20"></div>
              <div className="h-8 bg-gray-200 rounded animate-pulse w-24"></div>
            </div>
          </div>
        );
      
      case 'image':
        return (
          <div className="bg-gray-200 rounded-lg animate-pulse aspect-video"></div>
        );
      
      case 'list':
        return (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        );
      
      default:
        return <div className="h-4 bg-gray-200 rounded animate-pulse"></div>;
    }
  };

  return (
    <div className={className}>
      {[...Array(count)].map((_, index) => (
        <div key={index} className="mb-4 last:mb-0">
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
}

// Pagination Component
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  maxVisiblePages?: number;
}

export function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange,
  showFirstLast = true,
  maxVisiblePages = 5 
}: PaginationProps) {
  const getVisiblePages = () => {
    const delta = Math.floor(maxVisiblePages / 2);
    let start = Math.max(currentPage - delta, 1);
    let end = Math.min(start + maxVisiblePages - 1, totalPages);
    
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(end - maxVisiblePages + 1, 1);
    }
    
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center space-x-2">
      {showFirstLast && currentPage > 1 && (
        <button
          onClick={() => onPageChange(1)}
          className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer whitespace-nowrap min-h-[40px]"
        >
          İlk
        </button>
      )}
      
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer min-h-[40px] w-10 h-10 flex items-center justify-center"
        >
          <i className="ri-arrow-left-line"></i>
        </button>
      )}
      
      {visiblePages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 text-sm rounded-lg cursor-pointer whitespace-nowrap min-h-[40px] ${
            page === currentPage
              ? 'bg-blue-500 text-white'
              : 'border border-gray-300 hover:bg-gray-50'
          }`}
        >
          {page}
        </button>
      ))}
      
      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer min-h-[40px] w-10 h-10 flex items-center justify-center"
        >
          <i className="ri-arrow-right-line"></i>
        </button>
      )}
      
      {showFirstLast && currentPage < totalPages && (
        <button
          onClick={() => onPageChange(totalPages)}
          className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer whitespace-nowrap min-h-[40px]"
        >
          Son
        </button>
      )}
    </div>
  );
}
