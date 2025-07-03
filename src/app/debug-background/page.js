'use client';

import { useState, useEffect } from 'react';
import { fallbackImages } from '@/lib/getGameImage';

export default function DebugBackgroundPage() {
  const [testResults, setTestResults] = useState([]);

  useEffect(() => {
    const games = Object.keys(fallbackImages);
    const results = [];

    games.forEach(game => {
      const img = new Image();
      img.onload = () => {
        results.push({ game, status: 'success', url: fallbackImages[game] });
        setTestResults([...results]);
      };
      img.onerror = () => {
        results.push({ game, status: 'failed', url: fallbackImages[game] });
        setTestResults([...results]);
      };
      img.src = fallbackImages[game];
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Background Image Debug</h1>
      
      <div className="space-y-4">
        {testResults.map((result, index) => (
          <div key={index} className="border border-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-bold mb-2">{result.game.toUpperCase()}</h3>
            <p className="mb-2">
              <strong>Status:</strong> 
              <span className={result.status === 'success' ? 'text-green-400' : 'text-red-400'}>
                {result.status === 'success' ? ' ✅ Success' : ' ❌ Failed'}
              </span>
            </p>
            <p className="mb-4 text-gray-400 text-sm break-all">{result.url}</p>
            
            {result.status === 'success' && (
              <div className="w-64 h-32 border border-gray-600 rounded overflow-hidden">
                <img 
                  src={result.url} 
                  alt={result.game}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Test Hero Section</h2>
        <div className="relative h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg overflow-hidden">
          <img 
            src={fallbackImages.valorant} 
            alt="Test background"
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              console.log('Test background failed to load');
              e.target.style.display = 'none';
            }}
            onLoad={() => {
              console.log('Test background loaded successfully');
            }}
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">Test Hero Section</h3>
              <p className="text-gray-300">If you can see this text, the background is working!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 