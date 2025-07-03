'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getGameImage, fallbackImages } from "@/lib/getGameImage";

const games = [
  { id: 'valorant', name: 'Valorant', icon: '🎯' },
  { id: 'cs2', name: 'CS2', icon: '🔫' },
  { id: 'lol', name: 'League of Legends', icon: '⚔️' },
  { id: 'dota', name: 'Dota 2', icon: '🗡️' },
  { id: 'fortnite', name: 'Fortnite', icon: '🏗️' },
  { id: 'overwatch', name: 'Overwatch 2', icon: '🛡️' }
];

const regions = [
  { id: 'global', name: 'Global' },
  { id: 'na', name: 'North America' },
  { id: 'eu', name: 'Europe' },
  { id: 'asia', name: 'Asia' },
  { id: 'oce', name: 'Oceania' },
  { id: 'sa', name: 'South America' }
];

const prizePoolRanges = [
  { id: 'all', name: 'All Prize Pools' },
  { id: '0-10000', name: 'Under $10K' },
  { id: '10000-50000', name: '$10K - $50K' },
  { id: '50000-100000', name: '$50K - $100K' },
  { id: '100000-500000', name: '$100K - $500K' },
  { id: '500000+', name: '$500K+' }
];

// Mock tournament data - replace with actual API calls
const mockTournaments = [
  {
    id: '1',
    title: 'Valorant Champions 2024',
    game: 'valorant',
    prizePool: '$2,000,000',
    startDate: '2024-12-15T10:00:00Z',
    endDate: '2024-12-22T18:00:00Z',
    status: 'upcoming',
    region: 'Global',
    participants: 16,
    maxTeams: 16,
    description: 'The biggest Valorant tournament of the year featuring the world\'s best teams.'
  },
  {
    id: '2',
    title: 'CS2 Major Championship',
    game: 'cs2',
    prizePool: '$1,500,000',
    startDate: '2024-11-20T14:00:00Z',
    endDate: '2024-11-25T20:00:00Z',
    status: 'ongoing',
    region: 'Global',
    participants: 24,
    maxTeams: 24,
    description: 'The most prestigious CS2 tournament with top teams from around the world.'
  },
  {
    id: '3',
    title: 'LoL World Championship',
    game: 'lol',
    prizePool: '$3,000,000',
    startDate: '2024-10-15T12:00:00Z',
    endDate: '2024-11-05T16:00:00Z',
    status: 'completed',
    region: 'Global',
    participants: 24,
    maxTeams: 24,
    description: 'The ultimate League of Legends tournament featuring the best teams globally.'
  },
  {
    id: '4',
    title: 'Dota 2 International',
    game: 'dota',
    prizePool: '$5,000,000',
    startDate: '2024-12-01T09:00:00Z',
    endDate: '2024-12-10T22:00:00Z',
    status: 'upcoming',
    region: 'Global',
    participants: 18,
    maxTeams: 18,
    description: 'The most prestigious Dota 2 tournament with the largest prize pool in esports.'
  },
  {
    id: '5',
    title: 'Fortnite World Cup',
    game: 'fortnite',
    prizePool: '$1,000,000',
    startDate: '2024-11-10T15:00:00Z',
    endDate: '2024-11-12T18:00:00Z',
    status: 'ongoing',
    region: 'Global',
    participants: 100,
    maxTeams: 100,
    description: 'The biggest Fortnite tournament featuring solo and duo competitions.'
  },
  {
    id: '6',
    title: 'Overwatch League Finals',
    game: 'overwatch',
    prizePool: '$800,000',
    startDate: '2024-12-05T11:00:00Z',
    endDate: '2024-12-08T19:00:00Z',
    status: 'upcoming',
    region: 'Global',
    participants: 8,
    maxTeams: 8,
    description: 'The grand finale of the Overwatch League season featuring the top teams.'
  }
];

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState(mockTournaments);
  const [filteredTournaments, setFilteredTournaments] = useState(mockTournaments);
  const [filters, setFilters] = useState({
    game: 'all',
    region: 'all',
    prizePool: 'all',
    status: 'all'
  });
  const [loadingImages, setLoadingImages] = useState(true);
  const [imageLoadingStates, setImageLoadingStates] = useState({});

  useEffect(() => {
    async function fetchImages() {
      setLoadingImages(true);
      console.log('Starting to fetch images...');
      
      try {
        const updated = await Promise.all(
          mockTournaments.map(async (t) => {
            try {
              console.log(`Fetching image for ${t.game}...`);
              const img = await getGameImage(t.game);
              console.log(`Image result for ${t.game}:`, img);
              
              // Use API image if available, otherwise use fallback
              const finalImage = img || fallbackImages[t.game];
              console.log(`Final image for ${t.game}:`, finalImage);
              
              return { 
                ...t, 
                image: finalImage
              };
            } catch (error) {
              console.error(`Error fetching image for ${t.game}:`, error);
              return { 
                ...t, 
                image: fallbackImages[t.game]
              };
            }
          })
        );
        
        console.log('All images processed:', updated);
        setTournaments(updated);
        setFilteredTournaments(updated);
      } catch (error) {
        console.error('Error fetching tournament images:', error);
        // Use fallback images if API fails completely
        const updatedWithFallbacks = mockTournaments.map(t => ({
          ...t,
          image: fallbackImages[t.game]
        }));
        setTournaments(updatedWithFallbacks);
        setFilteredTournaments(updatedWithFallbacks);
      } finally {
        setLoadingImages(false);
        console.log('Image fetching completed');
      }
    }
    fetchImages();
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = tournaments;
    
    if (filters.game !== 'all') {
      filtered = filtered.filter(t => t.game === filters.game);
    }
    
    if (filters.region !== 'all') {
      filtered = filtered.filter(t => t.region.toLowerCase().includes(filters.region));
    }
    
    if (filters.status !== 'all') {
      filtered = filtered.filter(t => t.status === filters.status);
    }
    
    setFilteredTournaments(filtered);
  }, [filters, tournaments]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'live':
      case 'ongoing':
        return 'bg-red-500';
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
      case 'ongoing':
        return 'LIVE';
      case 'upcoming':
        return 'UPCOMING';
      case 'completed':
        return 'COMPLETED';
      default:
        return status.toUpperCase();
    }
  };

  const getGameIcon = (game) => {
    const gameData = games.find(g => g.id === game);
    return gameData ? gameData.icon : '🎮';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loadingImages) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gaming-dark text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gaming-primary mx-auto mb-4"></div>
          <p className="text-gaming-primary text-xl">Loading tournaments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gaming-dark">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gaming-primary/20 to-gaming-secondary/20 py-20">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-extrabold text-white mb-4"
          >
            Tournaments
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Discover the hottest esports tournaments from around the world. 
            Filter by game, region, and prize pool to find your next competition.
          </motion.p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gaming-darker rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Filters</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Game Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Game</label>
              <select
                value={filters.game}
                onChange={(e) => setFilters({ ...filters, game: e.target.value })}
                className="w-full bg-gaming-dark border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-gaming-primary"
              >
                <option value="all">All Games</option>
                {games.map(game => (
                  <option key={game.id} value={game.id}>
                    {game.icon} {game.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Region Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Region</label>
              <select
                value={filters.region}
                onChange={(e) => setFilters({ ...filters, region: e.target.value })}
                className="w-full bg-gaming-dark border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-gaming-primary"
              >
                <option value="all">All Regions</option>
                {regions.map(region => (
                  <option key={region.id} value={region.id}>
                    {region.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="w-full bg-gaming-dark border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-gaming-primary"
              >
                <option value="all">All Status</option>
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Live</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Prize Pool Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Prize Pool</label>
              <select
                value={filters.prizePool}
                onChange={(e) => setFilters({ ...filters, prizePool: e.target.value })}
                className="w-full bg-gaming-dark border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-gaming-primary"
              >
                {prizePoolRanges.map(range => (
                  <option key={range.id} value={range.id}>
                    {range.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-400">
            Showing {filteredTournaments.length} of {tournaments.length} tournaments
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-gaming-primary text-white rounded-lg hover:bg-gaming-primary/80 transition-colors">
              Sort by Date
            </button>
            <button className="px-4 py-2 bg-gaming-dark border border-gray-600 text-white rounded-lg hover:bg-gray-600 transition-colors">
              Sort by Prize Pool
            </button>
          </div>
        </div>

        {/* Tournament Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTournaments.map((tournament, index) => (
            <motion.div
              key={tournament.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/tournaments/${tournament.id}`}>
                <div className="bg-gaming-darker rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 border border-gray-700 hover:border-gaming-primary">
                  {/* Tournament Image */}
                  <div className="relative h-48 bg-gradient-to-br from-gaming-primary/20 to-gaming-secondary/20">
                    {tournament.image ? (
                      <img 
                        src={tournament.image} 
                        alt={tournament.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => {
                          console.log('Image failed to load:', tournament.image);
                          e.target.style.display = 'none';
                          // Show fallback gradient
                          const fallback = e.target.parentElement.querySelector('.fallback-gradient');
                          if (fallback) fallback.style.display = 'block';
                        }}
                        onLoad={() => {
                          console.log('Image loaded successfully:', tournament.image);
                        }}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gaming-primary"></div>
                      </div>
                    )}
                    <div className="fallback-gradient absolute inset-0 bg-gradient-to-br from-gaming-primary/20 to-gaming-secondary/20" style={{display: 'none'}}></div>
                    <div className="absolute inset-0 bg-black/30"></div>
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${getStatusColor(tournament.status)}`}>
                        {getStatusText(tournament.status)}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="text-2xl">{getGameIcon(tournament.game)}</span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white mb-1">{tournament.title}</h3>
                      <p className="text-sm text-gray-300">{tournament.region}</p>
                    </div>
                  </div>

                  {/* Tournament Details */}
                  <div className="p-6">
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {tournament.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Prize Pool</span>
                        <span className="text-gaming-primary font-bold">{tournament.prizePool}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Teams</span>
                        <span className="text-white">{tournament.participants}/{tournament.maxTeams}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Date</span>
                        <span className="text-white text-sm">
                          {formatDate(tournament.startDate)} - {formatDate(tournament.endDate)}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">View Details</span>
                        <span className="text-gaming-primary group-hover:translate-x-1 transition-transform">
                          →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTournaments.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎮</div>
            <h3 className="text-2xl font-bold text-white mb-2">No tournaments found</h3>
            <p className="text-gray-400">Try adjusting your filters to find more tournaments.</p>
          </div>
        )}
      </div>
    </div>
  );
} 