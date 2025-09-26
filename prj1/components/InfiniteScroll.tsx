'use client';

import { useEffect, useRef, useState } from 'react';

interface InfiniteScrollProps<T> {
  items: T[];
  loadMore: () => Promise<void>;
  hasMore: boolean;
  loading: boolean;
  children: (items: T[]) => React.ReactNode;
  threshold?: number;
  loadingComponent?: React.ReactNode;
  endComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
  onError?: (error: Error) => void;
}

export default function InfiniteScroll<T>({
  items,
  loadMore,
  hasMore,
  loading,
  children,
  threshold = 100,
  loadingComponent,
  endComponent,
  errorComponent,
  onError
}: InfiniteScrollProps<T>) {
  const [error, setError] = useState<Error | null>(null);
  const observerRef = useRef<HTMLDivElement>(null);
  const isLoadingRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        const target = entries[0];
        
        if (target.isIntersecting && hasMore && !loading && !isLoadingRef.current) {
          isLoadingRef.current = true;
          
          try {
            await loadMore();
            setError(null);
          } catch (err) {
            const error = err instanceof Error ? err : new Error('Failed to load more items');
            setError(error);
            if (onError) {
              onError(error);
            }
          } finally {
            isLoadingRef.current = false;
          }
        }
      },
      {
        rootMargin: `${threshold}px`,
        threshold: 0.1
      }
    );

    const currentObserver = observerRef.current;
    if (currentObserver) {
      observer.observe(currentObserver);
    }

    return () => {
      if (currentObserver) {
        observer.unobserve(currentObserver);
      }
    };
  }, [hasMore, loading, loadMore, threshold, onError]);

  const defaultLoadingComponent = (
    <div className="flex items-center justify-center py-8">
      <div className="flex items-center space-x-3">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
        <span className="text-gray-600">Yükleniyor...</span>
      </div>
    </div>
  );

  const defaultEndComponent = (
    <div className="text-center py-8">
      <div className="text-gray-500">
        <i className="ri-check-line text-2xl mb-2"></i>
        <p className="text-sm">Tüm içerik yüklendi</p>
      </div>
    </div>
  );

  const defaultErrorComponent = (
    <div className="text-center py-8">
      <div className="text-red-500">
        <i className="ri-error-warning-line text-2xl mb-2"></i>
        <p className="text-sm mb-4">Yükleme hatası oluştu</p>
        <button
          onClick={() => {
            setError(null);
            loadMore();
          }}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors cursor-pointer min-h-[40px]"
        >
          Tekrar Dene
        </button>
      </div>
    </div>
  );

  return (
    <div>
      {/* Render items */}
      {children(items)}

      {/* Loading/End/Error States */}
      <div ref={observerRef}>
        {error && (errorComponent || defaultErrorComponent)}
        {!error && loading && (loadingComponent || defaultLoadingComponent)}
        {!error && !loading && !hasMore && items.length > 0 && (endComponent || defaultEndComponent)}
      </div>
    </div>
  );
}