'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const VideoBackground = ({ 
  currentIndex, 
  videos, 
  isPlaying, 
  onVideoLoad, 
  onVideoError 
}) => {
  const videoRef = useRef(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(e => {
          console.log('Video play failed:', e);
          setHasError(true);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, currentIndex]);

  const handleLoadStart = () => {
    setIsLoading(true);
    setHasError(false);
  };

  const handleCanPlay = () => {
    setIsLoading(false);
    onVideoLoad?.(currentIndex);
  };

  const handleError = (e) => {
    console.log('Video error:', e);
    setHasError(true);
    setIsLoading(false);
    onVideoError?.(currentIndex, e);
  };

  const currentVideo = videos[currentIndex];

  return (
    <div className="absolute inset-0">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* Loading State */}
          {isLoading && (
            <div className="absolute inset-0 bg-gaming-dark flex items-center justify-center z-10">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gaming-primary mx-auto mb-4"></div>
                <p className="text-gaming-primary">Loading video...</p>
              </div>
            </div>
          )}

          {/* Video Element */}
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster={currentVideo.thumbnail}
            onLoadStart={handleLoadStart}
            onCanPlay={handleCanPlay}
            onError={handleError}
          >
            <source src={currentVideo.videoUrl} type="video/mp4" />
            <source src={currentVideo.fallbackUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Error Fallback */}
          {hasError && (
            <div className="absolute inset-0 bg-gaming-dark flex items-center justify-center">
              <div className="text-center">
                <div className="w-full h-full bg-cover bg-center bg-no-repeat" 
                     style={{ backgroundImage: `url(${currentVideo.thumbnail})` }}>
                  <div className="absolute inset-0 bg-gradient-to-b from-gaming-dark/70 via-gaming-dark/50 to-gaming-dark/80" />
                </div>
              </div>
            </div>
          )}

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-gaming-dark/70 via-gaming-dark/50 to-gaming-dark/80" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default VideoBackground; 