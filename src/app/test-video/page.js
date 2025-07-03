'use client';

import { useState } from 'react';
import VideoCarousel from '@/components/VideoCarousel';

export default function TestVideoPage() {
  const [selectedGame, setSelectedGame] = useState('all');

  const games = [
    { id: 'all', name: 'All Games' },
    { id: 'valorant', name: 'Valorant' },
    { id: 'cs2', name: 'CS2' },
    { id: 'lol', name: 'League of Legends' },
    { id: 'dota', name: 'Dota 2' },
    { id: 'fortnite', name: 'Fortnite' },
    { id: 'overwatch', name: 'Overwatch 2' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Game Selector */}
      <div className="absolute top-8 left-8 z-20 bg-black/50 backdrop-blur-sm rounded-lg p-4 border border-white/20">
        <label className="block text-sm font-medium text-gray-300 mb-2">Select Game:</label>
        <select
          value={selectedGame}
          onChange={(e) => setSelectedGame(e.target.value)}
          className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {games.map(game => (
            <option key={game.id} value={game.id}>{game.name}</option>
          ))}
        </select>
      </div>

      {/* Video Carousel */}
      <div className="h-screen">
        <VideoCarousel selectedGame={selectedGame} />
      </div>

      {/* Info Panel */}
      <div className="absolute bottom-8 left-8 right-8 z-20">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 border border-white/20">
          <h2 className="text-xl font-bold text-white mb-2">Video Carousel Test</h2>
          <p className="text-gray-300 text-sm mb-2">
            Current Game: <span className="text-blue-400">{games.find(g => g.id === selectedGame)?.name}</span>
          </p>
          <p className="text-gray-300 text-sm">
            Features: Auto-play, Auto-advance, Play/Pause controls, Navigation dots, Arrow navigation
          </p>
        </div>
      </div>
    </div>
  );
} 