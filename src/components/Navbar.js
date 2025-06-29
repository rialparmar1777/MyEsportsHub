'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FaGamepad, 
  FaTrophy, 
  FaUsers, 
  FaUser, 
  FaNewspaper, 
  FaVideo, 
  FaInfoCircle,
  FaBars,
  FaTimes,
  FaSearch,
  FaDiscord,
  FaTwitch,
  FaYoutube,
  FaSignInAlt,
  FaUserPlus,
  FaCrown,
  FaFire,
  FaBell,
  FaEnvelope
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState(3);
  const [messages, setMessages] = useState(2);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMounted]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Handle search functionality
      console.log('Searching for:', searchQuery);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const navLinks = [
    { 
      href: '/tournaments', 
      icon: <FaTrophy />, 
      label: 'Tournaments',
      badge: 'HOT'
    },
    { 
      href: '/teams', 
      icon: <FaUsers />, 
      label: 'Teams'
    },
    { 
      href: '/players', 
      icon: <FaUser />, 
      label: 'Players'
    },
    { 
      href: '/news', 
      icon: <FaNewspaper />, 
      label: 'News'
    },
    { 
      href: '/live', 
      icon: <FaVideo />, 
      label: 'Live',
      className: 'animate-pulse',
      badge: 'LIVE'
    },
    { 
      href: '/about', 
      icon: <FaInfoCircle />, 
      label: 'About'
    },
  ];

  const socialLinks = [
    { 
      href: 'https://discord.com', 
      icon: <FaDiscord />, 
      label: 'Discord', 
      className: 'hover:text-gaming-neon-purple hover:scale-110'
    },
    { 
      href: 'https://twitch.tv', 
      icon: <FaTwitch />, 
      label: 'Twitch', 
      className: 'hover:text-gaming-neon-purple hover:scale-110'
    },
    { 
      href: 'https://youtube.com', 
      icon: <FaYoutube />, 
      label: 'YouTube', 
      className: 'hover:text-gaming-neon-red hover:scale-110'
    },
  ];

  // Prevent hydration mismatch by not rendering until mounted
  if (!isMounted) {
    return (
      <nav className="fixed w-full z-50 bg-gaming-dark/95 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gaming-primary/20 rounded animate-pulse"></div>
              <div className="w-32 h-6 bg-gaming-primary/20 rounded animate-pulse"></div>
            </div>
            <div className="w-8 h-8 bg-gaming-primary/20 rounded animate-pulse"></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-gaming-dark/95 shadow-2xl shadow-gaming-primary/30 backdrop-blur-md border-b border-gaming-primary/20' 
          : 'bg-gaming-dark/90 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <FaGamepad className="text-3xl text-gaming-primary group-hover:text-gaming-neon-green transition-all duration-300 animate-neon-pulse group-hover:scale-110" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gaming-neon-red rounded-full animate-ping" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-white group-hover:text-gaming-primary transition-all duration-300">
                My<span className="text-gaming-primary group-hover:text-gaming-neon-green transition-all duration-300">Esports</span>
              </span>
              <span className="text-xs text-gray-400 -mt-1">Gaming Champions</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 group ${
                  pathname === link.href 
                    ? 'text-gaming-primary bg-gaming-primary/20 border border-gaming-primary/30 shadow-lg shadow-gaming-primary/20' 
                    : 'text-white hover:text-gaming-primary hover:bg-gaming-primary/10 hover:border hover:border-gaming-primary/20'
                } ${link.className || ''}`}
              >
                <span className="relative flex items-center space-x-2">
                  {link.icon}
                  <span className="font-semibold">{link.label}</span>
                </span>
                {link.badge && (
                  <span className={`absolute -top-2 -right-2 px-2 py-1 text-xs font-bold rounded-full ${
                    link.badge === 'LIVE' 
                      ? 'bg-gaming-neon-red text-white animate-pulse' 
                      : 'bg-gaming-neon-green text-gaming-dark'
                  }`}>
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Right Section - Search, Social, and Auth */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 transition-all duration-300 ${link.className}`}
                  title={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>

            {/* Notifications */}
            <div className="relative">
              <button className="text-white hover:text-gaming-primary transition-all duration-300 hover:scale-110 relative">
                <FaBell className="text-xl" />
                {notifications > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gaming-neon-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                    {notifications}
                  </span>
                )}
              </button>
            </div>

            {/* Messages */}
            <div className="relative">
              <button className="text-white hover:text-gaming-primary transition-all duration-300 hover:scale-110 relative">
                <FaEnvelope className="text-xl" />
                {messages > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gaming-neon-green text-gaming-dark text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {messages}
                  </span>
                )}
              </button>
            </div>

            {/* Search Section */}
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-white hover:text-gaming-primary transition-all duration-300 hover:scale-110"
              >
                <FaSearch className="text-xl" />
              </button>
              
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.form
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleSearch}
                    className="absolute top-full right-0 mt-3 w-80 bg-gaming-light p-3 rounded-2xl shadow-2xl shadow-gaming-primary/30 border border-gaming-primary/30 backdrop-blur-sm"
                  >
                    <div className="flex">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search tournaments, players, teams..."
                        className="flex-1 bg-gaming-darker text-white px-4 py-2 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-gaming-primary border border-gaming-primary/20 placeholder-gray-400"
                      />
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-gaming-primary to-gaming-neon-green px-4 py-2 rounded-r-xl hover:scale-105 transition-all duration-300 text-gaming-dark font-bold shadow-lg"
                      >
                        <FaSearch />
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              <Link
                href="/login"
                className="flex items-center space-x-2 px-4 py-2 text-gaming-primary hover:text-gaming-neon-green transition-all duration-300 hover:scale-105 font-semibold"
              >
                <FaSignInAlt />
                <span>Login</span>
              </Link>
              <Link
                href="/register"
                className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-gaming-primary to-gaming-neon-green text-gaming-dark rounded-xl font-bold hover:scale-105 transition-all duration-300 shadow-lg shadow-gaming-primary/30"
              >
                <FaUserPlus />
                <span>Sign Up</span>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white hover:text-gaming-primary transition-all duration-300 hover:scale-110"
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-gaming-dark/95 backdrop-blur-md border-t border-gaming-primary/20"
          >
            <div className="container mx-auto px-4 py-6">
              {/* Mobile Navigation Links */}
              <div className="space-y-4 mb-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      pathname === link.href 
                        ? 'text-gaming-primary bg-gaming-primary/20 border border-gaming-primary/30' 
                        : 'text-white hover:text-gaming-primary hover:bg-gaming-primary/10'
                    } ${link.className || ''}`}
                  >
                    {link.icon}
                    <span className="font-semibold">{link.label}</span>
                    {link.badge && (
                      <span className={`ml-auto px-2 py-1 text-xs font-bold rounded-full ${
                        link.badge === 'LIVE' 
                          ? 'bg-gaming-neon-red text-white animate-pulse' 
                          : 'bg-gaming-neon-green text-gaming-dark'
                      }`}>
                        {link.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>

              {/* Mobile Search */}
              <div className="mb-6">
                <form onSubmit={handleSearch} className="flex">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search tournaments, players..."
                    className="flex-1 bg-gaming-darker text-white px-4 py-3 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-gaming-primary border border-gaming-primary/20"
                  />
                  <button
                    type="submit"
                    className="bg-gaming-primary px-4 py-3 rounded-r-xl hover:bg-gaming-neon-green transition-all duration-300 text-gaming-dark font-bold"
                  >
                    <FaSearch />
                  </button>
                </form>
              </div>

              {/* Mobile Social Links */}
              <div className="flex justify-center space-x-6 mb-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-400 transition-all duration-300 text-2xl ${link.className}`}
                    title={link.label}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>

              {/* Mobile Auth Buttons */}
              <div className="flex flex-col space-y-3">
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center space-x-2 px-4 py-3 text-gaming-primary hover:text-gaming-neon-green transition-all duration-300 font-semibold border border-gaming-primary/30 rounded-xl"
                >
                  <FaSignInAlt />
                  <span>Login</span>
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-gaming-primary to-gaming-neon-green text-gaming-dark rounded-xl font-bold hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  <FaUserPlus />
                  <span>Sign Up</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar; 