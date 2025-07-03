'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getGameImage, fallbackImages } from "@/lib/getGameImage";
import VideoCarousel from '@/components/VideoCarousel';

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

import { tournamentData } from '@/lib/tournamentData';

// Convert tournament data to the format expected by the component
const mockTournaments = Object.values(tournamentData).map(tournament => ({
  id: tournament.id,
  title: tournament.title,
  game: tournament.game,
  prizePool: tournament.prizePool,
  startDate: tournament.startDate,
  endDate: tournament.endDate,
  status: tournament.status,
  region: tournament.region,
  participants: tournament.participants,
  maxTeams: tournament.maxTeams,
  description: tournament.description
}));

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
  const [heroBackground, setHeroBackground] = useState(null);
  const [heroContent, setHeroContent] = useState({
    title: 'Tournaments',
    subtitle: 'Discover the hottest esports tournaments from around the world. Filter by game, region, and prize pool to find your next competition.',
    gradientClass: 'bg-gradient-to-br from-gaming-primary/20 to-gaming-secondary/20',
    stats: {
      totalTournaments: 6,
      totalPrizePool: '$12,300,000',
      activeRegions: 6
    }
  });

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

  // Update hero content when game filter changes
  useEffect(() => {
    console.log('Game filter changed to:', filters.game);
    
    if (filters.game === 'all') {
      console.log('Setting default hero content');
      setHeroContent({
        title: 'Tournaments',
        subtitle: 'Discover the hottest esports tournaments from around the world. Filter by game, region, and prize pool to find your next competition.',
        gradientClass: 'bg-gradient-to-br from-gaming-primary/20 to-gaming-secondary/20',
        stats: {
          totalTournaments: tournaments.length,
          totalPrizePool: '$12,300,000',
          activeRegions: 6
        }
      });
      setHeroBackground(null);
    } else {
      const gameContent = getGameSpecificContent(filters.game);
      console.log('Setting game-specific content for:', filters.game, gameContent);
      setHeroContent({
        title: gameContent.title,
        subtitle: gameContent.subtitle,
        gradientClass: gameContent.gradientClass,
        stats: gameContent.stats
      });
      setHeroBackground(gameContent.background);
    }
  }, [filters.game, tournaments.length]);

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

  const getGameSpecificContent = (gameId) => {
    const gameData = games.find(g => g.id === gameId);
    if (!gameData) {
      return {
        title: 'Tournaments',
        subtitle: 'Discover the hottest esports tournaments from around the world. Filter by game, region, and prize pool to find your next competition.',
        background: null,
        gradientClass: 'bg-gradient-to-br from-gaming-primary/20 to-gaming-secondary/20',
        stats: {
          totalTournaments: tournaments.length,
          totalPrizePool: '$12,300,000',
          activeRegions: 6
        }
      };
    }

    const contentMap = {
      valorant: {
        title: 'Valorant Tournaments',
        subtitle: 'Experience the tactical precision and strategic gameplay of Valorant tournaments. Watch the world\'s best teams compete in intense 5v5 tactical shooter battles.',
        background: fallbackImages.valorant,
        gradientClass: 'bg-gradient-to-br from-red-500/30 via-purple-500/20 to-orange-500/30',
        stats: {
          totalTournaments: 1,
          totalPrizePool: '$2,000,000',
          activeRegions: 4
        }
      },
      cs2: {
        title: 'CS2 Championships',
        subtitle: 'Witness the evolution of competitive Counter-Strike. From tactical precision to explosive action, CS2 tournaments deliver the ultimate FPS experience.',
        background: fallbackImages.cs2,
        gradientClass: 'bg-gradient-to-br from-yellow-500/30 via-orange-500/20 to-red-500/30',
        stats: {
          totalTournaments: 1,
          totalPrizePool: '$1,500,000',
          activeRegions: 5
        }
      },
      lol: {
        title: 'League of Legends',
        subtitle: 'Join the epic battles of League of Legends tournaments. Strategic team fights, precise mechanics, and legendary plays define the world\'s most popular MOBA.',
        background: fallbackImages.lol,
        gradientClass: 'bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-gold-500/30',
        stats: {
          totalTournaments: 1,
          totalPrizePool: '$3,000,000',
          activeRegions: 6
        }
      },
      dota: {
        title: 'Dota 2 International',
        subtitle: 'Experience the complexity and depth of Dota 2 tournaments. The most prestigious MOBA competition with the largest prize pools in esports history.',
        background: fallbackImages.dota,
        gradientClass: 'bg-gradient-to-br from-green-500/30 via-teal-500/20 to-blue-500/30',
        stats: {
          totalTournaments: 1,
          totalPrizePool: '$5,000,000',
          activeRegions: 4
        }
      },
      fortnite: {
        title: 'Fortnite Battle Royale',
        subtitle: 'Survive and dominate in Fortnite tournaments. Building, shooting, and strategic gameplay combine in the ultimate battle royale competition.',
        background: fallbackImages.fortnite,
        gradientClass: 'bg-gradient-to-br from-pink-500/30 via-purple-500/20 to-blue-500/30',
        stats: {
          totalTournaments: 1,
          totalPrizePool: '$1,000,000',
          activeRegions: 3
        }
      },
      overwatch: {
        title: 'Overwatch 2 League',
        subtitle: 'Team up and compete in Overwatch 2 tournaments. Hero-based combat, strategic team compositions, and fast-paced action await.',
        background: fallbackImages.overwatch,
        gradientClass: 'bg-gradient-to-br from-orange-500/30 via-red-500/20 to-yellow-500/30',
        stats: {
          totalTournaments: 1,
          totalPrizePool: '$800,000',
          activeRegions: 2
        }
      }
    };

    return contentMap[gameId] || contentMap.valorant;
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
      <div className="relative py-20 overflow-hidden">
        {/* Video Carousel Background */}
        <div className="absolute inset-0">
          <VideoCarousel selectedGame={filters.game} />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-20 left-10 text-4xl opacity-20"
          >
            🏆
          </motion.div>
          <motion.div
            animate={{ 
              y: [0, 20, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute top-32 right-20 text-3xl opacity-20"
          >
            ⚔️
          </motion.div>
          <motion.div
            animate={{ 
              y: [0, -15, 0],
              x: [0, 10, 0]
            }}
            transition={{ 
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute bottom-20 left-1/4 text-2xl opacity-20"
          >
            🎮
          </motion.div>
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          {/* Game Icon Badge */}
          {filters.game !== 'all' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="inline-block mb-4"
            >
              <span className="text-4xl bg-white/10 backdrop-blur-sm rounded-full p-4 inline-block">
                {getGameIcon(filters.game)}
              </span>
            </motion.div>
          )}
          
          <motion.h1 
            key={heroContent.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-6xl font-extrabold text-white mb-4"
          >
            {heroContent.title}
          </motion.h1>
          <motion.p 
            key={heroContent.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto mb-8"
          >
            {heroContent.subtitle}
          </motion.p>

          {/* Stats Section */}
          <motion.div
            key={`stats-${filters.game}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-3xl font-bold text-gaming-primary mb-2">
                {heroContent.stats.totalTournaments}
              </div>
              <div className="text-gray-300 text-sm">
                Active Tournaments
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-3xl font-bold text-gaming-primary mb-2">
                {heroContent.stats.totalPrizePool}
              </div>
              <div className="text-gray-300 text-sm">
                Total Prize Pool
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-3xl font-bold text-gaming-primary mb-2">
                {heroContent.stats.activeRegions}
              </div>
              <div className="text-gray-300 text-sm">
                Active Regions
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-8"
          >
            <button className="bg-gaming-primary hover:bg-gaming-primary/80 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 transform hover:scale-105">
              Explore All Tournaments
            </button>
          </motion.div>
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
              <div className="relative">
                <select
                  value={filters.game}
                  onChange={(e) => setFilters({ ...filters, game: e.target.value })}
                  className="w-full bg-gaming-dark border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-gaming-primary appearance-none"
                >
                  <option value="all">🎮 All Games</option>
                  {games.map(game => (
                    <option key={game.id} value={game.id}>
                      {game.icon} {game.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
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
          <div className="flex items-center gap-4">
            <p className="text-gray-400">
              Showing {filteredTournaments.length} of {tournaments.length} tournaments
            </p>
            {filters.game !== 'all' && (
              <div className="flex items-center gap-2 bg-gaming-primary/20 px-3 py-1 rounded-full">
                <span className="text-lg">{getGameIcon(filters.game)}</span>
                <span className="text-gaming-primary text-sm font-medium">
                  {games.find(g => g.id === filters.game)?.name}
                </span>
              </div>
            )}
          </div>
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