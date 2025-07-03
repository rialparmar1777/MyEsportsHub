'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const videoData = [
  {
    id: 1,
    title: 'Valorant Champions',
    game: 'valorant',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    description: 'Epic Valorant tournament moments'
  },
  {
    id: 2,
    title: 'CS2 Major',
    game: 'cs2',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
    description: 'Counter-Strike 2 championship highlights'
  },
  {
    id: 3,
    title: 'League of Legends Worlds',
    game: 'lol',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80',
    description: 'League of Legends World Championship'
  },
  {
    id: 4,
    title: 'Dota 2 International',
    game: 'dota',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80',
    description: 'The International Dota 2 Championship'
  },
  {
    id: 5,
    title: 'Fortnite World Cup',
    game: 'fortnite',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
    description: 'Fortnite Battle Royale Championship'
  },
  {
    id: 6,
    title: 'Overwatch League',
    game: 'overwatch',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1468581264429-2548ef9eb732?auto=format&fit=crop&w=1200&q=80',
    description: 'Overwatch League Finals'
  }
];

export default function VideoCarousel({ selectedGame = 'all', onVideoChange }) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoError, setVideoError] = useState(false);

  // Filter videos based on selected game
  const filteredVideos = selectedGame === 'all' 
    ? videoData 
    : videoData.filter(video => video.game === selectedGame);

  const currentVideo = filteredVideos[currentVideoIndex];

  // Auto-advance videos
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentVideoIndex(prev => (prev + 1) % filteredVideos.length);
    }, 8000); // Change video every 8 seconds

    return () => clearInterval(interval);
  }, [isPlaying, filteredVideos.length]);

  // Reset to first video when game changes
  useEffect(() => {
    setCurrentVideoIndex(0);
    setVideoError(false);
  }, [selectedGame]);

  const handleVideoError = () => {
    setVideoError(true);
    console.log('Video failed to load, using thumbnail fallback');
  };

  const handleVideoLoad = () => {
    setVideoError(false);
    console.log('Video loaded successfully');
  };

  const nextVideo = () => {
    setCurrentVideoIndex(prev => (prev + 1) % filteredVideos.length);
  };

  const prevVideo = () => {
    setCurrentVideoIndex(prev => (prev - 1 + filteredVideos.length) % filteredVideos.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Video Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${selectedGame}-${currentVideoIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {!videoError ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              onError={handleVideoError}
              onLoadedData={handleVideoLoad}
            >
              <source src={currentVideo.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={currentVideo.thumbnail}
              alt={currentVideo.title}
              className="w-full h-full object-cover"
            />
          )}
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"></div>
        </motion.div>
      </AnimatePresence>

      {/* Video Info Overlay */}
      <div className="absolute bottom-8 left-8 right-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-white/20"
        >
          <h3 className="text-xl font-bold text-white mb-2">{currentVideo.title}</h3>
          <p className="text-gray-300 text-sm">{currentVideo.description}</p>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="absolute top-8 right-8 z-10 flex gap-2">
        <button
          onClick={togglePlayPause}
          className="bg-black/30 backdrop-blur-sm rounded-full p-3 border border-white/20 hover:bg-black/50 transition-colors"
        >
          {isPlaying ? (
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex gap-2">
        {filteredVideos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentVideoIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentVideoIndex 
                ? 'bg-white' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      {filteredVideos.length > 1 && (
        <>
          <button
            onClick={prevVideo}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/30 backdrop-blur-sm rounded-full p-3 border border-white/20 hover:bg-black/50 transition-colors"
          >
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            onClick={nextVideo}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/30 backdrop-blur-sm rounded-full p-3 border border-white/20 hover:bg-black/50 transition-colors"
          >
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
} 