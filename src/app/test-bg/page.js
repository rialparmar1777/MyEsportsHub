'use client';

import { useState } from 'react';

export default function TestBackgroundPage() {
  const [selectedGame, setSelectedGame] = useState('all');

  const gradients = {
    all: 'bg-gradient-to-br from-gaming-primary/20 to-gaming-secondary/20',
    valorant: 'bg-gradient-to-br from-red-500/30 via-purple-500/20 to-orange-500/30',
    cs2: 'bg-gradient-to-br from-yellow-500/30 via-orange-500/20 to-red-500/30',
    lol: 'bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-gold-500/30',
    dota: 'bg-gradient-to-br from-green-500/30 via-teal-500/20 to-blue-500/30',
    fortnite: 'bg-gradient-to-br from-pink-500/30 via-purple-500/20 to-blue-500/30',
    overwatch: 'bg-gradient-to-br from-orange-500/30 via-red-500/20 to-yellow-500/30'
  };

  const gameNames = {
    all: 'All Games',
    valorant: 'Valorant',
    cs2: 'CS2',
    lol: 'League of Legends',
    dota: 'Dota 2',
    fortnite: 'Fortnite',
    overwatch: 'Overwatch 2'
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Background Test Page</h1>
      
      {/* Game Selector */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-300 mb-2">Select Game:</label>
        <select
          value={selectedGame}
          onChange={(e) => setSelectedGame(e.target.value)}
          className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Object.entries(gameNames).map(([key, name]) => (
            <option key={key} value={key}>{name}</option>
          ))}
        </select>
      </div>

      {/* Test Hero Section */}
      <div className="relative h-96 rounded-lg overflow-hidden mb-8">
        <div className={`absolute inset-0 ${gradients[selectedGame]}`}>
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              {gameNames[selectedGame]} Background
            </h2>
            <p className="text-xl text-gray-300 mb-4">
              Current gradient: {gradients[selectedGame]}
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 inline-block">
              <p className="text-sm text-gray-300">
                If you can see this text, the background is working!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* All Gradients Preview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(gradients).map(([game, gradient]) => (
          <div key={game} className="relative h-32 rounded-lg overflow-hidden">
            <div className={`absolute inset-0 ${gradient}`}>
              <div className="absolute inset-0 bg-black/30"></div>
            </div>
            <div className="relative z-10 flex items-center justify-center h-full">
              <span className="text-sm font-semibold text-white text-center">
                {gameNames[game]}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* CSS Classes Debug */}
      <div className="mt-8 p-4 bg-gray-800 rounded-lg">
        <h3 className="text-lg font-bold mb-2">Current CSS Classes:</h3>
        <code className="text-green-400 text-sm break-all">
          {gradients[selectedGame]}
        </code>
      </div>
    </div>
  );
} 