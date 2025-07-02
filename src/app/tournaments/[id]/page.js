'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';

// Mock data - replace with actual API calls
const mockTournament = {
  id: '1',
  title: 'Valorant Champions 2024',
  game: 'valorant',
  prizePool: '$2,000,000',
  startDate: '2024-12-15T10:00:00Z',
  endDate: '2024-12-22T18:00:00Z',
  status: 'ongoing',
  region: 'Global',
  image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=400&fit=crop',
  participants: 16,
  maxTeams: 16,
  description: 'The biggest Valorant tournament of the year featuring the world\'s best teams competing for the ultimate championship title.',
  streamUrl: 'https://www.twitch.tv/valorant',
  teams: [
    { id: '1', name: 'Team Liquid', logo: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=60&h=60&fit=crop', region: 'NA', wins: 3, losses: 1 },
    { id: '2', name: 'Fnatic', logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=60&h=60&fit=crop', region: 'EU', wins: 4, losses: 0 },
    { id: '3', name: 'Sentinels', logo: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=60&h=60&fit=crop', region: 'NA', wins: 2, losses: 2 },
    { id: '4', name: 'G2 Esports', logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=60&h=60&fit=crop', region: 'EU', wins: 3, losses: 1 },
    { id: '5', name: 'Cloud9', logo: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=60&h=60&fit=crop', region: 'NA', wins: 1, losses: 3 },
    { id: '6', name: 'Team Heretics', logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=60&h=60&fit=crop', region: 'EU', wins: 2, losses: 2 },
    { id: '7', name: 'NRG Esports', logo: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=60&h=60&fit=crop', region: 'NA', wins: 0, losses: 4 },
    { id: '8', name: 'Vitality', logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=60&h=60&fit=crop', region: 'EU', wins: 1, losses: 3 }
  ],
  matches: [
    {
      id: '1',
      homeTeam: { id: '1', name: 'Team Liquid', logo: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=40&h=40&fit=crop' },
      awayTeam: { id: '2', name: 'Fnatic', logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=40&h=40&fit=crop' },
      homeScore: 13,
      awayScore: 16,
      status: 'completed',
      startTime: '2024-12-15T10:00:00Z',
      round: 'Group Stage',
      streamUrl: 'https://www.twitch.tv/valorant'
    },
    {
      id: '2',
      homeTeam: { id: '3', name: 'Sentinels', logo: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=40&h=40&fit=crop' },
      awayTeam: { id: '4', name: 'G2 Esports', logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=40&h=40&fit=crop' },
      homeScore: 14,
      awayScore: 12,
      status: 'completed',
      startTime: '2024-12-15T14:00:00Z',
      round: 'Group Stage',
      streamUrl: 'https://www.twitch.tv/valorant'
    },
    {
      id: '3',
      homeTeam: { id: '1', name: 'Team Liquid', logo: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=40&h=40&fit=crop' },
      awayTeam: { id: '3', name: 'Sentinels', logo: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=40&h=40&fit=crop' },
      homeScore: 8,
      awayScore: 6,
      status: 'live',
      startTime: '2024-12-16T10:00:00Z',
      round: 'Quarter Finals',
      streamUrl: 'https://www.twitch.tv/valorant'
    },
    {
      id: '4',
      homeTeam: { id: '2', name: 'Fnatic', logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=40&h=40&fit=crop' },
      awayTeam: { id: '4', name: 'G2 Esports', logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=40&h=40&fit=crop' },
      homeScore: 0,
      awayScore: 0,
      status: 'scheduled',
      startTime: '2024-12-16T14:00:00Z',
      round: 'Quarter Finals',
      streamUrl: 'https://www.twitch.tv/valorant'
    }
  ],
  brackets: [
    {
      id: '1',
      name: 'Upper Bracket',
      type: 'single_elimination',
      matches: [
        { id: '1', homeTeam: 'Team Liquid', awayTeam: 'Fnatic', winner: 'Fnatic' },
        { id: '2', homeTeam: 'Sentinels', awayTeam: 'G2 Esports', winner: 'Sentinels' },
        { id: '3', homeTeam: 'Cloud9', awayTeam: 'Team Heretics', winner: 'Team Heretics' },
        { id: '4', homeTeam: 'NRG Esports', awayTeam: 'Vitality', winner: 'Vitality' }
      ]
    }
  ]
};

export default function TournamentDetailsPage() {
  const params = useParams();
  const [tournament, setTournament] = useState(mockTournament);
  const [activeTab, setActiveTab] = useState('overview');
  const [liveScore, setLiveScore] = useState({ home: 8, away: 6 });

  // Simulate live score updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveScore(prev => ({
        home: prev.home + Math.floor(Math.random() * 2),
        away: prev.away + Math.floor(Math.random() * 2)
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'live':
        return 'bg-red-500 animate-pulse';
      case 'upcoming':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'live':
        return 'LIVE';
      case 'upcoming':
        return 'UPCOMING';
      case 'completed':
        return 'COMPLETED';
      default:
        return status.toUpperCase();
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'matches', name: 'Matches', icon: '⚔️' },
    { id: 'brackets', name: 'Brackets', icon: '🏆' },
    { id: 'standings', name: 'Standings', icon: '📈' },
    { id: 'teams', name: 'Teams', icon: '👥' },
    { id: 'stream', name: 'Live Stream', icon: '📺' }
  ];

  return (
    <div className="min-h-screen bg-gaming-dark">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-br from-gaming-primary/20 to-gaming-secondary/20">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gaming-dark via-transparent to-transparent"></div>
        
        <div className="relative h-full flex items-end">
          <div className="container mx-auto px-4 pb-8">
            <div className="flex items-end justify-between">
              <div>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl font-extrabold text-white mb-2"
                >
                  {tournament.title}
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-xl text-gray-300 mb-4 max-w-2xl"
                >
                  {tournament.description}
                </motion.p>
                
                <div className="flex items-center gap-6 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🎯</span>
                    <span>Valorant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🌍</span>
                    <span>{tournament.region}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">💰</span>
                    <span>{tournament.prizePool}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <span className={`px-4 py-2 rounded-full text-sm font-bold text-white ${getStatusColor(tournament.status)}`}>
                  {getStatusText(tournament.status)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-700 bg-gaming-darker">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-gaming-primary text-gaming-primary'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Tournament Info */}
            <div className="lg:col-span-2">
              <div className="bg-gaming-darker rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-bold text-white mb-4">Tournament Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Schedule</h3>
                    <div className="space-y-2 text-gray-300">
                      <div className="flex justify-between">
                        <span>Start Date:</span>
                        <span>{formatDate(tournament.startDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>End Date:</span>
                        <span>{formatDate(tournament.endDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span>8 days</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Details</h3>
                    <div className="space-y-2 text-gray-300">
                      <div className="flex justify-between">
                        <span>Prize Pool:</span>
                        <span className="text-gaming-primary font-bold">{tournament.prizePool}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Teams:</span>
                        <span>{tournament.participants}/{tournament.maxTeams}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Format:</span>
                        <span>Single Elimination</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Match */}
              {tournament.matches.find(m => m.status === 'live') && (
                <div className="bg-gaming-darker rounded-lg p-6 mb-6 border border-red-500/20">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <h2 className="text-2xl font-bold text-white">Live Match</h2>
                  </div>
                  
                  <div className="bg-gaming-dark rounded-lg p-6">
                                          <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <img 
                            src={tournament.teams.find(t => t.id === '1')?.logo || 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=60&h=60&fit=crop'} 
                            alt="Team Liquid" 
                            className="w-12 h-12 rounded object-cover"
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=60&h=60&fit=crop';
                            }}
                          />
                          <div>
                            <h3 className="text-lg font-semibold text-white">Team Liquid</h3>
                            <p className="text-gray-400 text-sm">North America</p>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-white">{liveScore.home}</div>
                          <div className="text-sm text-gray-400">Score</div>
                        </div>
                      </div>
                      
                      <div className="text-center text-gray-400 mb-4">VS</div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-white">{liveScore.away}</div>
                          <div className="text-sm text-gray-400">Score</div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <h3 className="text-lg font-semibold text-white">Sentinels</h3>
                            <p className="text-gray-400 text-sm">North America</p>
                          </div>
                          <img 
                            src={tournament.teams.find(t => t.id === '3')?.logo || 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=60&h=60&fit=crop'} 
                            alt="Sentinels" 
                            className="w-12 h-12 rounded object-cover"
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=60&h=60&fit=crop';
                            }}
                          />
                        </div>
                      </div>
                    
                    <div className="mt-6 text-center">
                      <a 
                        href={tournament.streamUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <span className="w-3 h-3 bg-white rounded-full animate-pulse"></span>
                        Watch Live
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div>
              <div className="bg-gaming-darker rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-bold text-white mb-4">Quick Stats</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total Matches</span>
                    <span className="text-white font-semibold">{tournament.matches.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Completed</span>
                    <span className="text-green-400 font-semibold">
                      {tournament.matches.filter(m => m.status === 'completed').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Live</span>
                    <span className="text-red-400 font-semibold">
                      {tournament.matches.filter(m => m.status === 'live').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Upcoming</span>
                    <span className="text-blue-400 font-semibold">
                      {tournament.matches.filter(m => m.status === 'scheduled').length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Recent Results */}
              <div className="bg-gaming-darker rounded-lg p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Recent Results</h2>
                <div className="space-y-3">
                  {tournament.matches
                    .filter(m => m.status === 'completed')
                    .slice(0, 3)
                    .map((match) => (
                      <div key={match.id} className="flex items-center justify-between p-3 bg-gaming-dark rounded">
                        <div className="flex items-center gap-2">
                          <img 
                            src={match.homeTeam.logo} 
                            alt={match.homeTeam.name} 
                            className="w-6 h-6 rounded object-cover"
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=24&h=24&fit=crop';
                            }}
                          />
                          <span className="text-sm text-white">{match.homeTeam.name}</span>
                        </div>
                        <div className="text-sm text-gray-400">
                          {match.homeScore} - {match.awayScore}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-white">{match.awayTeam.name}</span>
                          <img 
                            src={match.awayTeam.logo} 
                            alt={match.awayTeam.name} 
                            className="w-6 h-6 rounded object-cover"
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=24&h=24&fit=crop';
                            }}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'matches' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-gaming-darker rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Match Schedule</h2>
              <div className="space-y-4">
                {tournament.matches.map((match) => (
                  <div key={match.id} className="bg-gaming-dark rounded-lg p-4 border border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${getStatusColor(match.status)}`}>
                        {getStatusText(match.status)}
                      </span>
                      <span className="text-sm text-gray-400">{formatDate(match.startTime)}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img 
                          src={match.homeTeam.logo} 
                          alt={match.homeTeam.name} 
                          className="w-10 h-10 rounded object-cover"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=40&h=40&fit=crop';
                          }}
                        />
                        <div>
                          <h3 className="text-white font-semibold">{match.homeTeam.name}</h3>
                          <p className="text-gray-400 text-sm">{match.round}</p>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">
                          {match.status === 'live' ? `${liveScore.home} - ${liveScore.away}` : `${match.homeScore} - ${match.awayScore}`}
                        </div>
                        <div className="text-sm text-gray-400">{formatTime(match.startTime)}</div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <h3 className="text-white font-semibold">{match.awayTeam.name}</h3>
                          <p className="text-gray-400 text-sm">{match.round}</p>
                        </div>
                        <img 
                          src={match.awayTeam.logo} 
                          alt={match.awayTeam.name} 
                          className="w-10 h-10 rounded object-cover"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=40&h=40&fit=crop';
                          }}
                        />
                      </div>
                    </div>
                    
                    {match.status === 'live' && (
                      <div className="mt-3 text-center">
                        <a 
                          href={match.streamUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                        >
                          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                          Watch Live
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'standings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-gaming-darker rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Tournament Standings</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Rank</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Team</th>
                      <th className="text-center py-3 px-4 text-gray-400 font-medium">W</th>
                      <th className="text-center py-3 px-4 text-gray-400 font-medium">L</th>
                      <th className="text-center py-3 px-4 text-gray-400 font-medium">Win %</th>
                      <th className="text-center py-3 px-4 text-gray-400 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tournament.teams
                      .sort((a, b) => b.wins - a.wins)
                      .map((team, index) => (
                        <tr key={team.id} className="border-b border-gray-800 hover:bg-gaming-dark/50">
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                              index === 0 ? 'bg-yellow-500 text-black' :
                              index === 1 ? 'bg-gray-400 text-black' :
                              index === 2 ? 'bg-amber-600 text-white' :
                              'bg-gray-600 text-white'
                            }`}>
                              {index + 1}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <img 
                                src={team.logo} 
                                alt={team.name} 
                                className="w-8 h-8 rounded object-cover"
                                onError={(e) => {
                                  e.target.src = 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=32&h=32&fit=crop';
                                }}
                              />
                              <div>
                                <div className="text-white font-semibold">{team.name}</div>
                                <div className="text-gray-400 text-sm">{team.region}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-center text-white font-semibold">{team.wins}</td>
                          <td className="py-3 px-4 text-center text-white font-semibold">{team.losses}</td>
                          <td className="py-3 px-4 text-center text-white font-semibold">
                            {Math.round((team.wins / (team.wins + team.losses)) * 100)}%
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${
                              team.wins >= 3 ? 'bg-green-500 text-white' :
                              team.losses >= 3 ? 'bg-red-500 text-white' :
                              'bg-blue-500 text-white'
                            }`}>
                              {team.wins >= 3 ? 'Qualified' :
                               team.losses >= 3 ? 'Eliminated' : 'Active'}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'teams' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tournament.teams.map((team) => (
                <div key={team.id} className="bg-gaming-darker rounded-lg p-6 border border-gray-700 hover:border-gaming-primary transition-colors">
                  <div className="text-center mb-4">
                    <img 
                      src={team.logo} 
                      alt={team.name} 
                      className="w-20 h-20 rounded-lg mx-auto mb-3 object-cover"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=80&h=80&fit=crop';
                      }}
                    />
                    <h3 className="text-xl font-bold text-white mb-1">{team.name}</h3>
                    <p className="text-gray-400">{team.region}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Wins</span>
                      <span className="text-green-400 font-semibold">{team.wins}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Losses</span>
                      <span className="text-red-400 font-semibold">{team.losses}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Win Rate</span>
                      <span className="text-white font-semibold">
                        {Math.round((team.wins / (team.wins + team.losses)) * 100)}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <button className="w-full px-4 py-2 bg-gaming-primary text-white rounded hover:bg-gaming-primary/80 transition-colors">
                      View Team Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'stream' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-gaming-darker rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Live Stream</h2>
              <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">📺</div>
                  <h3 className="text-xl font-semibold text-white mb-2">Live Stream</h3>
                  <p className="text-gray-400 mb-4">Watch the tournament live on Twitch</p>
                  <a 
                    href={tournament.streamUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <span className="w-3 h-3 bg-white rounded-full animate-pulse"></span>
                    Watch on Twitch
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'brackets' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-gaming-darker rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Tournament Brackets</h2>
              <div className="text-center text-gray-400">
                <div className="text-6xl mb-4">🏆</div>
                <h3 className="text-xl font-semibold text-white mb-2">Bracket View</h3>
                <p className="text-gray-400">Interactive tournament brackets coming soon!</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
} 