'use client';

import { useState, useEffect, useRef } from 'react';
import { FaGamepad, FaTrophy, FaUsers, FaNewspaper, FaVideo, FaArrowRight, FaPlay, FaPause, FaDiscord, FaTwitch, FaYoutube, FaStar, FaCrown, FaFire } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import VideoBackground from '@/components/VideoBackground';

export default function Home() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  const videoCarousel = [
    {
      id: 1,
      title: "Epic Gaming Battles",
      description: "Witness the most intense competitive gaming moments",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      fallbackUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&q=80"
    },
    {
      id: 2,
      title: "Championship Finals",
      description: "The ultimate showdown of gaming legends",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      fallbackUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1920&q=80"
    },
    {
      id: 3,
      title: "Team Strategies",
      description: "Master the art of team coordination and tactics",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      fallbackUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&q=80"
    }
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isPlaying && isMounted) {
      const interval = setInterval(() => {
        setCurrentVideoIndex((prev) => (prev + 1) % videoCarousel.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, videoCarousel.length, isMounted]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const goToVideo = (index) => {
    setCurrentVideoIndex(index);
    setIsPlaying(true);
  };

  const handleVideoLoad = (index) => {
    console.log(`Video ${index} loaded successfully`);
  };

  const handleVideoError = (index, error) => {
    console.log(`Video ${index} failed to load:`, error);
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!isMounted) {
    return (
      <main className="min-h-screen bg-gaming-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gaming-primary mx-auto mb-4"></div>
          <p className="text-gaming-primary text-xl">Loading MyEsports...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gaming-dark">
      {/* Hero Section with Video Carousel */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background Carousel */}
        <VideoBackground
          currentIndex={currentVideoIndex}
          videos={videoCarousel}
          isPlaying={isPlaying}
          onVideoLoad={handleVideoLoad}
          onVideoError={handleVideoError}
        />

        {/* Video Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
          <div className="flex items-center space-x-4 bg-gaming-dark/80 backdrop-blur-sm rounded-full px-6 py-3 border border-gaming-primary/30">
            <button
              onClick={togglePlayPause}
              className="text-gaming-primary hover:text-gaming-neon-green transition-all duration-300 hover:scale-110"
            >
              {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
            </button>
            <div className="flex space-x-2">
              {videoCarousel.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToVideo(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentVideoIndex 
                      ? 'bg-gaming-primary scale-125' 
                      : 'bg-gray-500 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Video Title Overlay */}
        <div className="absolute top-8 left-8 z-20">
          <motion.div
            key={currentVideoIndex}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-gaming-dark/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-gaming-primary/30"
          >
            <h3 className="text-gaming-primary font-bold text-lg">
              {videoCarousel[currentVideoIndex].title}
            </h3>
            <p className="text-gray-300 text-sm">
              {videoCarousel[currentVideoIndex].description}
            </p>
          </motion.div>
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="flex items-center justify-center space-x-4 mb-6">
              <FaCrown className="text-6xl text-gaming-primary animate-bounce" />
              <FaFire className="text-6xl text-gaming-neon-red animate-pulse" />
              <FaCrown className="text-6xl text-gaming-primary animate-bounce" style={{ animationDelay: '0.5s' }} />
            </div>
            <h1 className="text-7xl md:text-9xl font-black mb-8 text-white leading-tight">
              <span className="bg-gradient-to-r from-gaming-primary via-gaming-neon-green to-gaming-neon-purple bg-clip-text text-transparent animate-pulse">
                MyEsports
              </span>
            </h1>
            <p className="text-3xl md:text-4xl text-white mb-8 max-w-5xl mx-auto font-light">
              Where <span className="text-gaming-primary font-bold">Legends</span> Are Born and <span className="text-gaming-neon-red font-bold">Champions</span> Rise
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Join the ultimate competitive gaming platform. Compete in tournaments, build your team, and dominate the leaderboards.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            <Link 
              href="/tournaments" 
              className="group relative bg-gradient-to-r from-gaming-primary to-gaming-neon-green text-gaming-dark px-12 py-5 rounded-full font-bold text-2xl hover:scale-105 transition-all duration-300 shadow-2xl shadow-gaming-primary/50 hover:shadow-gaming-neon-green/50"
            >
              <span className="relative z-10">Join Tournament</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gaming-neon-green to-gaming-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            <Link 
              href="/teams" 
              className="group relative border-4 border-gaming-primary text-gaming-primary px-12 py-5 rounded-full font-bold text-2xl hover:scale-105 transition-all duration-300 hover:bg-gaming-primary hover:text-gaming-dark shadow-2xl shadow-gaming-primary/30"
            >
              <span className="relative z-10">Create Team</span>
            </Link>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center space-x-8"
          >
            <a href="https://discord.com" className="text-gray-400 hover:text-gaming-neon-purple transition-all duration-300 hover:scale-125">
              <FaDiscord size={32} />
            </a>
            <a href="https://twitch.tv" className="text-gray-400 hover:text-gaming-neon-purple transition-all duration-300 hover:scale-125">
              <FaTwitch size={32} />
            </a>
            <a href="https://youtube.com" className="text-gray-400 hover:text-gaming-neon-red transition-all duration-300 hover:scale-125">
              <FaYoutube size={32} />
            </a>
          </motion.div>
        </div>

        {/* Floating Gaming Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-20 left-10 text-gaming-primary/30"
          >
            <FaGamepad size={40} />
          </motion.div>
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            className="absolute top-40 right-20 text-gaming-neon-green/30"
          >
            <FaTrophy size={30} />
          </motion.div>
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, delay: 2 }}
            className="absolute bottom-40 left-20 text-gaming-neon-red/30"
          >
            <FaUsers size={35} />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gaming-darker relative overflow-hidden">
        <div className="absolute inset-0 bg-cyber-grid opacity-5" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { number: "50K+", label: "Active Players", icon: <FaUsers />, color: "text-gaming-primary" },
              { number: "500+", label: "Tournaments", icon: <FaTrophy />, color: "text-gaming-neon-green" },
              { number: "2M+", label: "Prize Pool", icon: <FaCrown />, color: "text-gaming-neon-red" },
              { number: "24/7", label: "Live Streams", icon: <FaVideo />, color: "text-gaming-neon-purple" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className={`text-5xl md:text-6xl font-black mb-4 ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                  {stat.icon}
                </div>
                <div className="text-4xl md:text-5xl font-black text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-lg font-semibold">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Tournaments */}
      <section className="py-24 bg-gaming-dark">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4"
            >
              <div className="relative">
                <FaTrophy className="text-6xl text-gaming-primary animate-bounce" />
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-gaming-neon-red rounded-full animate-pulse" />
              </div>
              <div>
                <h2 className="text-5xl font-black text-gaming-primary mb-2">Featured Tournaments</h2>
                <p className="text-gray-400 text-xl">Join the most prestigious competitions</p>
              </div>
            </motion.div>
            <Link 
              href="/tournaments" 
              className="text-gaming-primary hover:text-gaming-neon-green transition-colors flex items-center gap-2 text-xl group"
            >
              View All <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Dota 2 World Championship",
                image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&q=80",
                prize: "$100,000",
                game: "Dota 2",
                players: "256",
                status: "Registration Open",
                difficulty: "Professional"
              },
              {
                title: "CS:GO Masters League",
                image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1920&q=80",
                prize: "$75,000",
                game: "Counter-Strike 2",
                players: "128",
                status: "Live Now",
                difficulty: "Advanced"
              },
              {
                title: "Valorant Pro Circuit",
                image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&q=80",
                prize: "$50,000",
                game: "Valorant",
                players: "64",
                status: "Starting Soon",
                difficulty: "Intermediate"
              }
            ].map((tournament, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-gaming-light rounded-2xl overflow-hidden border-2 border-gaming-primary/20 hover:border-gaming-primary transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-gaming-primary/10 hover:shadow-gaming-primary/30"
              >
                <div className="h-64 bg-gaming-dark relative overflow-hidden">
                  <Image
                    src={tournament.image}
                    alt={tournament.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gaming-dark via-gaming-dark/50 to-transparent" />
                  <div className="absolute top-4 left-4 bg-gaming-primary text-gaming-dark px-3 py-1 rounded-full text-sm font-bold">
                    {tournament.status}
                  </div>
                  <div className="absolute top-4 right-4 bg-gaming-neon-red text-white px-3 py-1 rounded-full text-sm font-bold">
                    {tournament.difficulty}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-gaming-primary transition-colors duration-300">
                    {tournament.title}
                  </h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Prize Pool:</span>
                      <span className="text-gaming-neon-green font-bold text-xl">{tournament.prize}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Players:</span>
                      <span className="text-white font-semibold">{tournament.players}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Game:</span>
                      <span className="text-gaming-primary font-semibold">{tournament.game}</span>
                    </div>
                  </div>
                  <Link 
                    href={`/tournaments/${index + 1}`}
                    className="block w-full bg-gradient-to-r from-gaming-primary to-gaming-neon-green text-gaming-dark text-center py-3 rounded-lg font-bold hover:scale-105 transition-all duration-300 shadow-lg shadow-gaming-primary/30"
                  >
                    Join Tournament
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Streams Section */}
      <section className="py-24 bg-gaming-darker">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4"
            >
              <div className="relative">
                <FaVideo className="text-6xl text-gaming-neon-red animate-pulse" />
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-gaming-neon-red rounded-full animate-ping" />
              </div>
              <div>
                <h2 className="text-5xl font-black text-gaming-neon-red mb-2">Live Streams</h2>
                <p className="text-gray-400 text-xl">Watch the best players in action</p>
              </div>
            </motion.div>
            <Link 
              href="/live" 
              className="text-gaming-neon-red hover:text-red-400 transition-colors flex items-center gap-2 text-xl group"
            >
              View All <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Pro Gamer Stream",
                image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&q=80",
                viewers: "2.5K",
                game: "Dota 2",
                streamer: "ProGamer123"
              },
              {
                title: "Tournament Finals",
                image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1920&q=80",
                viewers: "1.8K",
                game: "CS:GO",
                streamer: "TournamentTV"
              },
              {
                title: "Team Practice",
                image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&q=80",
                viewers: "950",
                game: "Valorant",
                streamer: "TeamAlpha"
              },
              {
                title: "Community Night",
                image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1920&q=80",
                viewers: "1.2K",
                game: "League of Legends",
                streamer: "CommunityGaming"
              }
            ].map((stream, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-gaming-light rounded-2xl overflow-hidden border-2 border-gaming-neon-red/20 hover:border-gaming-neon-red transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-gaming-neon-red/10 hover:shadow-gaming-neon-red/30"
              >
                <div className="relative">
                  <div className="h-48 bg-gaming-dark relative overflow-hidden">
                    <Image
                      src={stream.image}
                      alt={stream.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gaming-dark/50 to-transparent" />
                  </div>
                  <div className="absolute top-3 left-3 bg-gaming-neon-red text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse">
                    LIVE
                  </div>
                  <div className="absolute top-3 right-3 bg-gaming-dark/80 text-white px-2 py-1 rounded text-xs font-semibold">
                    {stream.viewers} viewers
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2 text-white group-hover:text-gaming-neon-red transition-colors duration-300 line-clamp-2">
                    {stream.title}
                  </h3>
                  <div className="space-y-2 mb-4">
                    <p className="text-gray-400 text-sm">Streamer: <span className="text-gaming-primary">{stream.streamer}</span></p>
                    <p className="text-gray-400 text-sm">Game: <span className="text-gaming-neon-green">{stream.game}</span></p>
                  </div>
                  <button className="w-full bg-gaming-neon-red text-white py-2 rounded-lg font-bold hover:bg-red-600 transition-all duration-300 hover:scale-105 shadow-lg">
                    Watch Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-r from-gaming-primary via-gaming-neon-green to-gaming-neon-purple relative overflow-hidden">
        <div className="absolute inset-0 bg-cyber-grid opacity-10" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-black text-gaming-dark mb-8">
              Ready to Dominate?
            </h2>
            <p className="text-2xl text-gaming-dark/90 mb-12 max-w-3xl mx-auto">
              Join thousands of players competing for glory, fame, and massive prize pools. Your journey to becoming a gaming legend starts here.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link 
                href="/register" 
                className="bg-gaming-dark text-gaming-primary px-12 py-5 rounded-full font-bold text-2xl hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-gaming-dark/50"
              >
                Get Started Now
              </Link>
              <Link 
                href="/tournaments" 
                className="border-4 border-gaming-dark text-gaming-dark px-12 py-5 rounded-full font-bold text-2xl hover:bg-gaming-dark hover:text-gaming-primary transition-all duration-300"
              >
                Browse Tournaments
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
