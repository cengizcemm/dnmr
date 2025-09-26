'use client';

import { useState } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showInfo?: boolean;
  totalItems?: number;
  itemsPerPage?: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showInfo = true,
  totalItems = 0,
  itemsPerPage = 10,
  size = 'md'
}: PaginationProps) {
  const [inputPage, setInputPage] = useState('');

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const handleGoToPage = () => {
    const page = parseInt(inputPage);
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
      setInputPage('');
    }
  };

  const sizeClasses = {
    sm: {
      button: 'px-2 py-1 text-xs min-h-[32px]',
      input: 'px-2 py-1 text-xs w-12 min-h-[32px]',
      info: 'text-xs'
    },
    md: {
      button: 'px-3 py-2 text-sm min-h-[40px]',
      input: 'px-2 py-1 text-sm w-16 min-h-[40px]',
      info: 'text-sm'
    },
    lg: {
      button: 'px-4 py-2 text-base min-h-[44px]',
      input: 'px-3 py-2 text-base w-20 min-h-[44px]',
      info: 'text-base'
    }
  };

  const classes = sizeClasses[size];

  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
      {/* Info */}
      {showInfo && totalItems > 0 && (
        <div className={`text-gray-700 ${classes.info}`}>
          <span className="font-medium">{startItem}</span>
          {' - '}
          <span className="font-medium">{endItem}</span>
          {' / '}
          <span className="font-medium">{totalItems}</span>
          {' sonuç gösteriliyor'}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex items-center space-x-2">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${classes.button} border border-gray-300 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center`}
        >
          <i className="ri-arrow-left-s-line mr-1"></i>
          <span className="hidden sm:inline">Önceki</span>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center space-x-1">
          {getVisiblePages().map((page, index) => (
            <div key={index}>
              {page === '...' ? (
                <span className={`${classes.button} text-gray-400`}>...</span>
              ) : (
                <button
                  onClick={() => onPageChange(page as number)}
                  className={`${classes.button} border rounded-lg transition-colors cursor-pointer ${
                    currentPage === page
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {page}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`${classes.button} border border-gray-300 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center`}
        >
          <span className="hidden sm:inline">Sonraki</span>
          <i className="ri-arrow-right-s-line ml-1"></i>
        </button>

        {/* Go to Page */}
        <div className="flex items-center space-x-2 ml-4">
          <span className={`text-gray-600 ${classes.info} hidden md:inline`}>Git:</span>
          <input
            type="number"
            min="1"
            max={totalPages}
            value={inputPage}
            onChange={(e) => setInputPage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleGoToPage()}
            placeholder={currentPage.toString()}
            className={`${classes.input} border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
          <button
            onClick={handleGoToPage}
            disabled={!inputPage || parseInt(inputPage) < 1 || parseInt(inputPage) > totalPages}
            className={`${classes.button} bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-lg transition-colors cursor-pointer flex items-center`}
          >
            <i className="ri-arrow-right-line"></i>
          </button>
        </div>
      </div>
    </div>
  );
}