'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FaGamepad,
  FaTrophy,
  FaUsers,
  FaVideo,
  FaBars,
  FaTimes,
  FaSearch,
  FaDiscord,
  FaChevronDown,
  FaUser
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const mainLinks = [
  { href: '/tournaments', icon: <FaTrophy />, label: 'Tournaments' },
  { href: '/live', icon: <FaVideo />, label: 'Live', className: 'animate-pulse text-gaming-neon-red' },
  { href: '/teams', icon: <FaUsers />, label: 'Teams' },
];
const moreLinks = [
  { href: '/players', label: 'Players' },
  { href: '/news', label: 'News' },
  { href: '/about', label: 'About' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const moreRef = useRef(null);

  useEffect(() => { setIsMounted(true); }, []);
  useEffect(() => {
    if (!isMounted) return;
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMounted]);

  // Close 'More' dropdown on outside click
  useEffect(() => {
    if (!isMoreOpen) return;
    function handleClick(e) {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setIsMoreOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isMoreOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search logic here
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  if (!isMounted) {
    return (
      <nav className="fixed w-full z-50 bg-gaming-dark/80 backdrop-blur-md">
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
      className={`fixed w-full z-50 transition-all duration-500 bg-gaming-dark/80 backdrop-blur-xl border-b border-gaming-primary/10`}
      style={{ WebkitBackdropFilter: 'blur(16px)', backdropFilter: 'blur(16px)' }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="relative"
            >
              <FaGamepad className="text-3xl text-gaming-primary group-hover:text-gaming-neon-green transition-all duration-300 animate-neon-pulse group-hover:scale-110 drop-shadow-[0_0_8px_#00ffea]" />
            </motion.div>
            <span className="text-2xl font-black text-white group-hover:text-gaming-primary transition-all duration-300 tracking-tight">
              My<span className="text-gaming-primary group-hover:text-gaming-neon-green transition-all duration-300">Esports</span>
            </span>
          </Link>

          {/* Center: Main Nav + More */}
          <div className="hidden lg:flex items-center space-x-2 mx-4">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center space-x-2 px-5 py-2 rounded-xl transition-all duration-300 font-semibold text-base ${
                  pathname === link.href
                    ? 'text-gaming-neon-green bg-gaming-primary/20 border border-gaming-primary/30 shadow-lg shadow-gaming-primary/20 drop-shadow-[0_0_8px_#00ffea]'
                    : 'text-white hover:text-gaming-primary hover:bg-gaming-primary/10 hover:border hover:border-gaming-primary/20'
                } ${link.className || ''}`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
            {/* More Dropdown */}
            <div className="relative" ref={moreRef}>
              <button
                onClick={() => setIsMoreOpen((v) => !v)}
                className={`flex items-center space-x-1 px-5 py-2 rounded-xl transition-all duration-300 font-semibold text-base text-white hover:text-gaming-primary hover:bg-gaming-primary/10 hover:border hover:border-gaming-primary/20 ${isMoreOpen ? 'bg-gaming-primary/10 border border-gaming-primary/20' : ''}`}
              >
                <span>More</span>
                <FaChevronDown className={`ml-1 transition-transform duration-200 ${isMoreOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {isMoreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-0 mt-2 w-40 bg-gaming-dark/95 rounded-xl shadow-xl border border-gaming-primary/20 z-50"
                  >
                    <div className="flex flex-col divide-y divide-gaming-primary/10">
                      {moreLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={`px-5 py-3 text-white hover:text-gaming-primary hover:bg-gaming-primary/10 transition-all duration-200 ${pathname === link.href ? 'text-gaming-neon-green' : ''}`}
                          onClick={() => setIsMoreOpen(false)}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Search, Discord, Sign In */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Search */}
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-white hover:text-gaming-primary transition-all duration-300 hover:scale-110 p-2"
                aria-label="Search"
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
                    className="absolute top-full right-0 mt-3 w-72 bg-gaming-light p-3 rounded-2xl shadow-2xl shadow-gaming-primary/30 border border-gaming-primary/30 backdrop-blur-sm z-50"
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
            {/* Discord Icon */}
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl text-gray-400 hover:text-gaming-neon-purple hover:scale-125 transition-all duration-300 hidden lg:inline-flex"
              title="Discord"
            >
              <FaDiscord />
            </a>
            {/* Sign In Button */}
            <Link
              href="/login"
              className="flex items-center space-x-2 px-5 py-2 bg-gradient-to-r from-gaming-primary to-gaming-neon-green text-gaming-dark rounded-xl font-bold hover:scale-105 transition-all duration-300 shadow-lg shadow-gaming-primary/30"
            >
              <FaUser />
              <span>Sign In</span>
            </Link>
            {/* Hamburger for mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white hover:text-gaming-primary transition-all duration-300 hover:scale-110 p-2"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden fixed top-0 left-0 w-full h-full bg-gaming-dark/95 backdrop-blur-xl z-50 flex flex-col"
            style={{ WebkitBackdropFilter: 'blur(16px)', backdropFilter: 'blur(16px)' }}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-gaming-primary/10">
              <Link href="/" className="flex items-center space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
                <FaGamepad className="text-2xl text-gaming-primary drop-shadow-[0_0_8px_#00ffea]" />
                <span className="text-xl font-black text-white tracking-tight">My<span className="text-gaming-primary">Esports</span></span>
              </Link>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-gaming-primary transition-all duration-300 p-2" aria-label="Close Menu">
                <FaTimes size={28} />
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-between py-8 px-8 overflow-y-auto">
              <div className="flex flex-col space-y-2">
                {[...mainLinks, ...moreLinks].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-4 rounded-xl text-lg font-semibold transition-all duration-200 ${
                      pathname === link.href
                        ? 'text-gaming-neon-green bg-gaming-primary/20 border border-gaming-primary/30 drop-shadow-[0_0_8px_#00ffea]'
                        : 'text-white hover:text-gaming-primary hover:bg-gaming-primary/10'
                    }`}
                  >
                    {link.icon || null}
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>
              <div className="mt-8 flex flex-col space-y-4">
                {/* Mobile Search */}
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
                {/* Mobile Social */}
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center text-xl text-gray-400 hover:text-gaming-neon-purple hover:scale-125 transition-all duration-300"
                  title="Discord"
                >
                  <FaDiscord />
                  <span className="ml-2 text-base">Join Discord</span>
                </a>
                {/* Mobile Sign In */}
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center space-x-2 px-4 py-4 bg-gradient-to-r from-gaming-primary to-gaming-neon-green text-gaming-dark rounded-xl font-bold hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  <FaUser />
                  <span>Sign In</span>
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