'use client';

import { useState } from 'react';

export default function PlaceholderImage({ 
  src, 
  alt, 
  className = "", 
  fallbackSrc = null,
  children = null 
}) {
  const [imageError, setImageError] = useState(false);
  
  const defaultFallback = (
    <div className={`bg-gradient-to-br from-gaming-primary/20 to-gaming-secondary/20 flex items-center justify-center ${className}`}>
      <div className="text-center">
        <div className="text-2xl mb-2">🎮</div>
        <div className="text-xs text-gray-400">{alt}</div>
      </div>
    </div>
  );

  if (imageError) {
    if (fallbackSrc) {
      return <img src={fallbackSrc} alt={alt} className={className} />;
    }
    return defaultFallback;
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      className={className}
      onError={() => setImageError(true)}
    />
  );
} 