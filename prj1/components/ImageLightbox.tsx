
'use client';

import { useState, useEffect, useRef } from 'react';

interface Comment {
  id: number;
  user: string;
  text: string;
  timestamp: string;
  avatar?: string;
}

interface ImageLightboxProps {
  images: Array<{
    id: number;
    url: string;
    title: string;
    uploadedBy: string;
    uploadDate: string;
    likes: number;
    comments: Comment[];
    liked?: boolean;
  }>;
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onLike?: (imageId: number) => void;
  onComment?: (imageId: number, comment: string) => void;
}

export default function ImageLightbox({ 
  images, 
  currentIndex, 
  isOpen, 
  onClose, 
  onLike, 
  onComment 
}: ImageLightboxProps) {
  const [activeIndex, setActiveIndex] = useState(currentIndex);
  const [newComment, setNewComment] = useState('');
  const [isLiking, setIsLiking] = useState(false);
  const [localState, setLocalState] = useState<{[key: number]: {likes: number, liked: boolean, comments: Comment[]}}>({});
  const [commentsPage, setCommentsPage] = useState(1);
  const [loadingComments, setLoadingComments] = useState(false);
  const [touchStart, setTouchStart] = useState<{x: number, y: number} | null>(null);
  const [touchEnd, setTouchEnd] = useState<{x: number, y: number} | null>(null);
  const commentsEndRef = useRef<HTMLDivElement>(null);

  const COMMENTS_PER_PAGE = 5;
  const minSwipeDistance = 50;

  useEffect(() => {
    if (isOpen) {
      setActiveIndex(currentIndex);
      document.body.style.overflow = 'hidden';
      
      // Initialize local state for all images
      const initialState: {[key: number]: {likes: number, liked: boolean, comments: Comment[]}} = {};
      images.forEach(image => {
        initialState[image.id] = {
          likes: image.likes,
          liked: image.liked || false,
          comments: [...image.comments]
        };
      });
      setLocalState(initialState);
      setCommentsPage(1);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, currentIndex, images]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          handlePrevious();
          break;
        case 'ArrowRight':
          handleNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, activeIndex]);

  if (!isOpen || !images.length) return null;

  const currentImage = images[activeIndex];
  const currentLocalState = localState[currentImage.id] || {
    likes: currentImage.likes,
    liked: currentImage.liked || false,
    comments: currentImage.comments
  };

  const visibleComments = currentLocalState.comments.slice(0, commentsPage * COMMENTS_PER_PAGE);
  const hasMoreComments = currentLocalState.comments.length > visibleComments.length;

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    setCommentsPage(1);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    setCommentsPage(1);
  };

  const handleLike = async () => {
    if (isLiking) return;
    
    setIsLiking(true);
    
    // Optimistic UI update
    const newLiked = !currentLocalState.liked;
    const newCount = newLiked ? currentLocalState.likes + 1 : currentLocalState.likes - 1;
    
    setLocalState(prev => ({
      ...prev,
      [currentImage.id]: {
        ...prev[currentImage.id],
        liked: newLiked,
        likes: newCount
      }
    }));

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      if (onLike) {
        onLike(currentImage.id);
      }
    } catch (error) {
      // Revert on error
      setLocalState(prev => ({
        ...prev,
        [currentImage.id]: {
          ...prev[currentImage.id],
          liked: currentLocalState.liked,
          likes: currentLocalState.likes
        }
      }));
      console.error('Error liking image:', error);
    } finally {
      setIsLiking(false);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const optimisticComment: Comment = {
      id: Date.now(),
      user: 'Sen',
      text: newComment.trim(),
      timestamp: 'Az önce',
      avatar: undefined
    };

    // Optimistic UI update
    setLocalState(prev => ({
      ...prev,
      [currentImage.id]: {
        ...prev[currentImage.id],
        comments: [optimisticComment, ...prev[currentImage.id].comments]
      }
    }));

    const commentText = newComment.trim();
    setNewComment('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      if (onComment) {
        onComment(currentImage.id, commentText);
      }
    } catch (error) {
      // Revert on error
      setLocalState(prev => ({
        ...prev,
        [currentImage.id]: {
          ...prev[currentImage.id],
          comments: prev[currentImage.id].comments.filter(c => c.id !== optimisticComment.id)
        }
      }));
      setNewComment(commentText);
      console.error('Error adding comment:', error);
    }
  };

  const loadMoreComments = async () => {
    setLoadingComments(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setCommentsPage(prev => prev + 1);
    setLoadingComments(false);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isLeftSwipe = distanceX > minSwipeDistance;
    const isRightSwipe = distanceX < -minSwipeDistance;
    const isVerticalSwipe = Math.abs(distanceY) > Math.abs(distanceX);
    
    if (!isVerticalSwipe) {
      if (isLeftSwipe) {
        handleNext();
      }
      if (isRightSwipe) {
        handlePrevious();
      }
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 cursor-pointer"
        onClick={handleBackdropClick}
      />
      
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-60 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center cursor-pointer transition-colors min-h-[44px]"
        aria-label="Kapat"
      >
        <i className="ri-close-line text-xl"></i>
      </button>

      {/* Navigation */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-60 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center cursor-pointer transition-colors min-h-[44px]"
            aria-label="Önceki"
          >
            <i className="ri-arrow-left-line text-xl"></i>
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-60 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center cursor-pointer transition-colors min-h-[44px]"
            aria-label="Sonraki"
          >
            <i className="ri-arrow-right-line text-xl"></i>
          </button>
        </>
      )}

      {/* Main Content */}
      <div className="relative z-50 w-full h-full flex flex-col lg:flex-row">
        {/* Image Section */}
        <div 
          className="flex-1 flex items-center justify-center p-4 lg:p-8"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative max-w-full max-h-full">
            <img
              src={currentImage.url}
              alt={currentImage.title}
              className="max-w-full max-h-full object-contain rounded-lg"
              style={{ maxHeight: '85vh', maxWidth: '90vw' }}
            />
            
            {/* Image Counter */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                {activeIndex + 1} / {images.length}
              </div>
            )}

            {/* Mobile swipe indicator */}
            <div className="lg:hidden absolute bottom-12 left-1/2 -translate-x-1/2 text-white/70 text-xs text-center">
              ← Kaydırarak geçiş yapın →
            </div>
          </div>
        </div>

        {/* Instagram-style Side Panel */}
        <div className="w-full lg:w-96 bg-white flex flex-col max-h-[50vh] lg:max-h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex-shrink-0">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center mr-3 text-white font-medium">
                {getInitials(currentImage.uploadedBy)}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{currentImage.uploadedBy}</h3>
                <p className="text-xs text-gray-500">{currentImage.uploadDate}</p>
              </div>
            </div>
          </div>

          {/* Image Title */}
          <div className="p-4 border-b border-gray-200 flex-shrink-0">
            <h2 className="font-semibold text-gray-900">{currentImage.title}</h2>
          </div>

          {/* Comments Section */}
          <div className="flex-1 overflow-y-auto min-h-0">
            {visibleComments.length > 0 ? (
              <div className="p-4 space-y-4">
                {visibleComments.map((comment) => (
                  <div key={comment.id} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-medium text-gray-600">
                      {comment.avatar ? (
                        <img src={comment.avatar} alt={comment.user} className="w-8 h-8 rounded-full object-cover" />
                      ) : (
                        getInitials(comment.user)
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-gray-900 text-sm">{comment.user}</span>
                        <span className="text-xs text-gray-500">{comment.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.text}</p>
                    </div>
                  </div>
                ))}

                {/* Load More Comments */}
                {hasMoreComments && (
                  <div className="text-center">
                    <button
                      onClick={loadMoreComments}
                      disabled={loadingComments}
                      className="text-rose-600 hover:text-rose-700 font-medium text-sm cursor-pointer disabled:opacity-50 min-h-[44px] px-4 py-2"
                    >
                      {loadingComments ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-rose-600 mr-2"></div>
                          Yükleniyor...
                        </div>
                      ) : (
                        `${currentLocalState.comments.length - visibleComments.length} yorum daha göster`
                      )}
                    </button>
                  </div>
                )}
                <div ref={commentsEndRef} />
              </div>
            ) : (
              <div className="p-4 text-center text-gray-500">
                <i className="ri-chat-3-line text-2xl mb-2"></i>
                <p className="text-sm">Henüz yorum yok</p>
                <p className="text-xs text-gray-400 mt-1">İlk yorumu sen yap!</p>
              </div>
            )}
          </div>

          {/* Actions & Comment Input */}
          <div className="border-t border-gray-200 flex-shrink-0">
            {/* Like Button */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <button
                  onClick={handleLike}
                  disabled={isLiking}
                  className={`flex items-center space-x-2 cursor-pointer transition-all min-h-[44px] px-3 py-2 rounded-lg ${
                    currentLocalState.liked ? 'text-rose-500 bg-rose-50' : 'text-gray-600 hover:text-rose-500 hover:bg-rose-50'
                  } ${isLiking ? 'animate-pulse' : ''}`}
                >
                  <i className={`${currentLocalState.liked ? 'ri-heart-fill' : 'ri-heart-line'} text-xl ${isLiking ? 'animate-bounce' : ''}`}></i>
                  <span className="font-medium">{currentLocalState.likes}</span>
                </button>
                
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 cursor-pointer min-h-[44px] px-3 py-2 rounded-lg hover:bg-gray-50">
                  <i className="ri-chat-3-line text-xl"></i>
                  <span className="font-medium">{currentLocalState.comments.length}</span>
                </button>

                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 cursor-pointer min-h-[44px] px-3 py-2 rounded-lg hover:bg-gray-50">
                  <i className="ri-share-line text-xl"></i>
                </button>

                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 cursor-pointer min-h-[44px] px-3 py-2 rounded-lg hover:bg-gray-50">
                  <i className="ri-download-line text-xl"></i>
                </button>
              </div>
            </div>

            {/* Comment Input */}
            <form onSubmit={handleAddComment} className="p-4">
              <div className="flex space-x-3">
                <div className="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-medium">
                  SN
                </div>
                <div className="flex-1 flex space-x-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Yorum ekle..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm min-h-[44px]"
                    maxLength={500}
                  />
                  <button
                    type="submit"
                    disabled={!newComment.trim()}
                    className="px-4 py-2 bg-rose-500 hover:bg-rose-600 disabled:bg-gray-300 text-white rounded-lg text-sm font-medium transition-colors cursor-pointer min-h-[44px] flex items-center"
                  >
                    <i className="ri-send-plane-line"></i>
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1 ml-11">
                {newComment.length}/500 karakter
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Mobile keyboard navigation hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-lg text-sm hidden lg:block">
        ← → ok tuşları veya mobilde kaydırma ile geçiş
      </div>
    </div>
  );
}
