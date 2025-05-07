'use client';

import { FaGamepad, FaTrophy, FaUsers, FaNewspaper, FaVideo, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import VideoCarousel from '@/components/VideoCarousel';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-gaming-dark">
      {/* Hero Section - Full Screen */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <VideoCarousel />
        <div className="container mx-auto px-4 relative z-20 text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 text-white">
            Welcome to <span className="text-gaming-primary">MyEsports</span>
          </h1>
          <p className="text-2xl md:text-3xl text-white mb-12 max-w-4xl mx-auto">
            Your premier destination for competitive gaming tournaments, team management, and esports community.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link 
              href="/tournaments" 
              className="bg-gaming-primary text-gaming-dark px-10 py-4 rounded-lg font-bold text-xl hover:bg-gaming-neon-green transition-all duration-300 transform hover:scale-105"
            >
              Join Tournament
            </Link>
            <Link 
              href="/teams" 
              className="border-3 border-gaming-primary text-gaming-primary px-10 py-4 rounded-lg font-bold text-xl hover:bg-gaming-primary hover:text-gaming-dark transition-all duration-300 transform hover:scale-105"
            >
              Create Team
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Tournaments */}
      <section className="py-24 bg-gaming-darker">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold text-gaming-primary flex items-center gap-3">
              <FaTrophy className="animate-neon-pulse text-5xl" />
              Featured Tournaments
            </h2>
            <Link 
              href="/tournaments" 
              className="text-gaming-primary hover:text-gaming-neon-green transition-colors flex items-center gap-2 text-xl"
            >
              View All <FaArrowRight />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Dota 2 Championship",
                image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&q=80",
                prize: "$50,000"
              },
              {
                title: "CS:GO Masters",
                image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1920&q=80",
                prize: "$30,000"
              },
              {
                title: "Valorant Pro League",
                image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&q=80",
                prize: "$25,000"
              }
            ].map((tournament, index) => (
              <div 
                key={index}
                className="bg-gaming-light rounded-xl overflow-hidden border-2 border-gaming-primary/20 hover:border-gaming-primary transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <div className="h-64 bg-gaming-dark relative">
                  <Image
                    src={tournament.image}
                    alt={tournament.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gaming-dark to-transparent" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3 text-white">{tournament.title}</h3>
                  <p className="text-gray-300 text-lg mb-4">Prize Pool: {tournament.prize}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-gaming-primary font-semibold">Starting Soon</span>
                    <Link 
                      href={`/tournaments/${index + 1}`}
                      className="text-gaming-primary hover:text-gaming-neon-green transition-colors text-lg"
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
      <section className="py-24 bg-gaming-dark">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold text-gaming-neon-red flex items-center gap-3">
              <FaVideo className="animate-neon-pulse text-5xl" />
              Live Streams
            </h2>
            <Link 
              href="/live" 
              className="text-gaming-neon-red hover:text-red-400 transition-colors flex items-center gap-2 text-xl"
            >
              View All <FaArrowRight />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Pro Gamer Stream",
                image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&q=80",
                viewers: "2.5K"
              },
              {
                title: "Tournament Finals",
                image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1920&q=80",
                viewers: "1.8K"
              },
              {
                title: "Team Practice",
                image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&q=80",
                viewers: "950"
              },
              {
                title: "Community Night",
                image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1920&q=80",
                viewers: "1.2K"
              }
            ].map((stream, index) => (
              <div 
                key={index}
                className="bg-gaming-light rounded-xl overflow-hidden border-2 border-gaming-neon-red/20 hover:border-gaming-neon-red transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <div className="relative">
                  <div className="h-48 bg-gaming-dark relative">
                    <Image
                      src={stream.image}
                      alt={stream.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute top-3 left-3 bg-gaming-neon-red text-gaming-dark px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    LIVE
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2 text-white">{stream.title}</h3>
                  <p className="text-gray-300">Viewer Count: {stream.viewers}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-24 bg-gaming-darker">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold text-gaming-neon-blue flex items-center gap-3">
              <FaNewspaper className="animate-neon-pulse text-5xl" />
              Latest News
            </h2>
            <Link 
              href="/news" 
              className="text-gaming-neon-blue hover:text-blue-400 transition-colors flex items-center gap-2 text-xl"
            >
              View All <FaArrowRight />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              {
                title: "Major Tournament Announcement",
                image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&q=80",
                excerpt: "The biggest esports tournament of the year is coming to your city. Get ready for intense competition and amazing prizes."
              },
              {
                title: "New Game Integration",
                image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1920&q=80",
                excerpt: "We're excited to announce the addition of a new game to our platform. Join us for exclusive tournaments and events."
              }
            ].map((news, index) => (
              <div 
                key={index}
                className="bg-gaming-light rounded-xl overflow-hidden border-2 border-gaming-neon-blue/20 hover:border-gaming-neon-blue transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <div className="h-80 bg-gaming-dark relative">
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-3xl font-bold mb-4 text-white">{news.title}</h3>
                  <p className="text-gray-300 text-lg mb-6">
                    {news.excerpt}
                  </p>
                  <Link 
                    href={`/news/${index + 1}`}
                    className="text-gaming-neon-blue hover:text-blue-400 transition-colors inline-flex items-center gap-2 text-xl font-semibold"
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
      <section className="py-24 bg-gaming-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-cyber-grid opacity-10" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-5xl font-bold mb-8 text-gaming-primary">Ready to Compete?</h2>
          <p className="text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Join thousands of players and teams competing in tournaments across multiple games.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link 
              href="/register" 
              className="bg-gaming-primary text-gaming-dark px-12 py-5 rounded-lg font-bold text-xl hover:bg-gaming-neon-green transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </Link>
            <Link 
              href="/about" 
              className="border-3 border-gaming-primary text-gaming-primary px-12 py-5 rounded-lg font-bold text-xl hover:bg-gaming-primary hover:text-gaming-dark transition-all duration-300 transform hover:scale-105"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
