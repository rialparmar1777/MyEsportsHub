'use client';

import { FaGamepad, FaTrophy, FaUsers, FaNewspaper, FaVideo, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gaming-dark/80 z-10" />
        <div className="absolute inset-0 bg-cyber-grid opacity-20" />
        <div className="container mx-auto px-4 relative z-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-neon-pulse">
            Welcome to <span className="text-gaming-primary">MyEsports</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Your premier destination for competitive gaming tournaments, team management, and esports community.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/tournaments" 
              className="bg-gaming-primary text-gaming-dark px-8 py-3 rounded-md font-semibold hover:bg-gaming-neon-green transition-all duration-300 transform hover:scale-105"
            >
              Join Tournament
            </Link>
            <Link 
              href="/teams" 
              className="border-2 border-gaming-primary text-gaming-primary px-8 py-3 rounded-md font-semibold hover:bg-gaming-primary hover:text-gaming-dark transition-all duration-300 transform hover:scale-105"
            >
              Create Team
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Tournaments */}
      <section className="py-16 bg-gaming-darker">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gaming-primary flex items-center gap-2">
              <FaTrophy className="animate-neon-pulse" />
              Featured Tournaments
            </h2>
            <Link 
              href="/tournaments" 
              className="text-gaming-primary hover:text-gaming-neon-green transition-colors flex items-center gap-2"
            >
              View All <FaArrowRight />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((tournament) => (
              <div 
                key={tournament}
                className="bg-gaming-light rounded-lg overflow-hidden border border-gaming-primary/20 hover:border-gaming-primary transition-all duration-300 transform hover:scale-105"
              >
                <div className="h-48 bg-gaming-dark relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-gaming-dark to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Tournament Name</h3>
                  <p className="text-gray-400 mb-4">Prize Pool: $10,000</p>
                  <div className="flex justify-between items-center">
                    <span className="text-gaming-primary">Starting Soon</span>
                    <Link 
                      href={`/tournaments/${tournament}`}
                      className="text-gaming-primary hover:text-gaming-neon-green transition-colors"
                    >
                      Learn More →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Streams */}
      <section className="py-16 bg-gaming-dark">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gaming-neon-red flex items-center gap-2">
              <FaVideo className="animate-neon-pulse" />
              Live Streams
            </h2>
            <Link 
              href="/live" 
              className="text-gaming-neon-red hover:text-red-400 transition-colors flex items-center gap-2"
            >
              View All <FaArrowRight />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((stream) => (
              <div 
                key={stream}
                className="bg-gaming-light rounded-lg overflow-hidden border border-gaming-neon-red/20 hover:border-gaming-neon-red transition-all duration-300"
              >
                <div className="relative">
                  <div className="h-40 bg-gaming-dark" />
                  <div className="absolute top-2 left-2 bg-gaming-neon-red text-gaming-dark px-2 py-1 rounded text-sm font-semibold">
                    LIVE
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Stream Title</h3>
                  <p className="text-gray-400 text-sm">Viewer Count: 1.2K</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-16 bg-gaming-darker">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gaming-neon-blue flex items-center gap-2">
              <FaNewspaper className="animate-neon-pulse" />
              Latest News
            </h2>
            <Link 
              href="/news" 
              className="text-gaming-neon-blue hover:text-blue-400 transition-colors flex items-center gap-2"
            >
              View All <FaArrowRight />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((news) => (
              <div 
                key={news}
                className="bg-gaming-light rounded-lg overflow-hidden border border-gaming-neon-blue/20 hover:border-gaming-neon-blue transition-all duration-300"
              >
                <div className="h-64 bg-gaming-dark" />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-3">News Title</h3>
                  <p className="text-gray-400 mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                  <Link 
                    href={`/news/${news}`}
                    className="text-gaming-neon-blue hover:text-blue-400 transition-colors inline-flex items-center gap-2"
                  >
                    Read More <FaArrowRight />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gaming-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-cyber-grid opacity-10" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl font-bold mb-6 text-gaming-primary">Ready to Compete?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of players and teams competing in tournaments across multiple games.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/register" 
              className="bg-gaming-primary text-gaming-dark px-8 py-3 rounded-md font-semibold hover:bg-gaming-neon-green transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </Link>
            <Link 
              href="/about" 
              className="border-2 border-gaming-primary text-gaming-primary px-8 py-3 rounded-md font-semibold hover:bg-gaming-primary hover:text-gaming-dark transition-all duration-300 transform hover:scale-105"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
