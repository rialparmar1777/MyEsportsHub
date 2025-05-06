'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
  FaSearch
} from 'react-icons/fa';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const navLinks = [
    { href: '/tournaments', icon: <FaTrophy />, label: 'Tournaments' },
    { href: '/teams', icon: <FaUsers />, label: 'Teams' },
    { href: '/players', icon: <FaUser />, label: 'Players' },
    { href: '/news', icon: <FaNewspaper />, label: 'News' },
    { href: '/live', icon: <FaVideo />, label: 'Live', className: 'text-gaming-neon-red hover:text-red-400' },
    { href: '/about', icon: <FaInfoCircle />, label: 'About' },
  ];

  return (
    <header 
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
            <FaGamepad className="text-2xl text-gaming-primary group-hover:text-gaming-neon-green transition-colors animate-neon-pulse" />
            <span className="text-xl font-bold text-white group-hover:text-gaming-primary transition-colors">
              My<span className="text-gaming-primary">Esports</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center space-x-1 transition-all duration-300 ${
                  pathname === link.href
                    ? 'text-gaming-primary border-b-2 border-gaming-primary'
                    : 'text-white hover:text-gaming-primary'
                } ${link.className || ''} hover:scale-105`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* Search Section */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-white hover:text-gaming-primary transition-colors"
              >
                <FaSearch className="text-xl" />
              </button>
              
              {isSearchOpen && (
                <form
                  onSubmit={handleSearch}
                  className="absolute top-full right-0 mt-2 w-64 bg-gaming-light p-2 rounded-md shadow-lg shadow-gaming-primary/20 animate-fadeIn border border-gaming-primary/20"
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
                      className="bg-gaming-primary px-3 py-1 rounded-r-md hover:bg-gaming-neon-green transition-colors text-gaming-dark font-semibold"
                    >
                      <FaSearch />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:text-gaming-primary focus:outline-none transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gaming-light rounded-lg p-4 mt-2 animate-slideDown border border-gaming-primary/20">
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
                  className="bg-gaming-primary px-3 py-2 rounded-r-md hover:bg-gaming-neon-green transition-colors text-gaming-dark font-semibold"
                >
                  <FaSearch />
                </button>
              </div>
            </form>

            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-2 transition-all duration-300 ${
                    pathname === link.href
                      ? 'text-gaming-primary'
                      : 'text-white hover:text-gaming-primary'
                  } ${link.className || ''} hover:scale-105`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 