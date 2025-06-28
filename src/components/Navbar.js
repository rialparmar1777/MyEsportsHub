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
  FaUserPlus
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      label: 'Tournaments'
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
      className: 'animate-pulse'
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

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gaming-dark/95 shadow-lg shadow-gaming-primary/20 backdrop-blur-sm' 
          : 'bg-gaming-dark/80 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <FaGamepad className="text-2xl text-gaming-primary group-hover:text-gaming-neon-green transition-all duration-300 animate-neon-pulse group-hover:scale-110" />
            <span className="text-xl font-bold text-white group-hover:text-gaming-primary transition-all duration-300">
              My<span className="text-gaming-primary group-hover:text-gaming-neon-green transition-all duration-300">Esports</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative flex items-center space-x-1 px-3 py-1.5 rounded-md transition-all duration-300 ${
                  pathname === link.href 
                    ? 'text-gaming-primary bg-gaming-primary/10' 
                    : 'text-white hover:text-gaming-primary hover:bg-gaming-primary/5'
                } ${link.className || ''}`}
              >
                <span className="relative flex items-center space-x-1">
                  {link.icon}
                  <span>{link.label}</span>
                </span>
              </Link>
            ))}
          </div>

          {/* Right Section - Search, Social, and Auth */}
          <div className="hidden md:flex items-center space-x-6">
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
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleSearch}
                    className="absolute top-full right-0 mt-2 w-64 bg-gaming-light p-2 rounded-md shadow-lg shadow-gaming-primary/20 border border-gaming-primary/20"
                  >
                    <div className="flex">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search tournaments, players..."
                        className="flex-1 bg-gaming-darker text-white px-3 py-1 rounded-l-md focus:outline-none focus:ring-1 focus:ring-gaming-primary border border-gaming-primary/20"
                      />
                      <button
                        type="submit"
                        className="bg-gaming-primary px-3 py-1 rounded-r-md hover:bg-gaming-neon-green transition-all duration-300 text-gaming-dark font-semibold hover:scale-105"
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
                className="flex items-center space-x-1 px-3 py-1.5 text-gaming-primary hover:text-gaming-neon-green transition-all duration-300"
              >
                <FaSignInAlt />
                <span>Login</span>
              </Link>
              <Link
                href="/register"
                className="bg-gaming-primary text-gaming-dark px-4 py-1.5 rounded-md hover:bg-gaming-neon-green transition-all duration-300 font-semibold"
              >
                <span className="flex items-center space-x-1">
                  <FaUserPlus />
                  <span>Sign Up</span>
                </span>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:text-gaming-primary focus:outline-none transition-all duration-300 hover:scale-110"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-gaming-light rounded-lg p-4 mt-2 border border-gaming-primary/20"
            >
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mb-4">
                <div className="flex">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search tournaments, players..."
                    className="flex-1 bg-gaming-darker text-white px-3 py-2 rounded-l-md focus:outline-none focus:ring-1 focus:ring-gaming-primary border border-gaming-primary/20"
                  />
                  <button
                    type="submit"
                    className="bg-gaming-primary px-3 py-2 rounded-r-md hover:bg-gaming-neon-green transition-all duration-300 text-gaming-dark font-semibold hover:scale-105"
                  >
                    <FaSearch />
                  </button>
                </div>
              </form>

              {/* Mobile Navigation */}
              <div className="flex flex-col space-y-3 mb-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative flex items-center space-x-2 px-3 py-2 rounded-md transition-all duration-300 ${
                      pathname === link.href 
                        ? 'text-gaming-primary bg-gaming-primary/10' 
                        : 'text-white hover:text-gaming-primary hover:bg-gaming-primary/5'
                    } ${link.className || ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="relative flex items-center space-x-2">
                      {link.icon}
                      <span>{link.label}</span>
                    </span>
                  </Link>
                ))}
              </div>

              {/* Mobile Social Links */}
              <div className="flex items-center space-x-4 mb-4">
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

              {/* Mobile Auth Buttons */}
              <div className="flex flex-col space-y-2">
                <Link
                  href="/login"
                  className="flex items-center justify-center space-x-2 px-4 py-2 text-gaming-primary hover:text-gaming-neon-green transition-all duration-300 border border-gaming-primary rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaSignInAlt />
                  <span>Login</span>
                </Link>
                <Link
                  href="/register"
                  className="bg-gaming-primary text-gaming-dark px-4 py-2 rounded-md hover:bg-gaming-neon-green transition-all duration-300 font-semibold text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="flex items-center justify-center space-x-2">
                    <FaUserPlus />
                    <span>Sign Up</span>
                  </span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar; 