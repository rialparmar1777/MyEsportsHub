'use client';

import { useState, useEffect, useRef } from 'react';

const VideoCarousel = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoSrc = 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4';

  useEffect(() => {
    // Debug video loading
    console.log('Video source:', videoSrc);
    if (videoRef.current) {
      console.log('Video element found');
      videoRef.current.load();
    }
  }, []);

  const handleVideoLoad = () => {
    console.log('Video loaded successfully');
    setIsLoading(false);
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error('Error playing video:', error);
        setError(true);
      });
    }
  };

  const handleVideoError = (e: any) => {
    console.error('Error loading video:', e);
    setError(true);
    setIsLoading(false);
  };

  const FallbackBackground = () => (
    <div className="absolute inset-0 bg-gaming-dark">
      <div className="absolute inset-0 bg-cyber-grid opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-gaming-dark/60 via-gaming-dark/40 to-gaming-dark/60" />
    </div>
  );

  if (error) {
    return <FallbackBackground />;
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gaming-dark">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gaming-primary"></div>
        </div>
      )}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="absolute min-w-full min-h-full object-cover brightness-110"
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
          style={{
            transform: 'scale(1.1)',
          }}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-gaming-dark/40 via-gaming-dark/30 to-gaming-dark/40" />
      </div>
    </div>
  );
};

export default VideoCarousel; 