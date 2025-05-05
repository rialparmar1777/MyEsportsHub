'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
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
  FaCaretDown,
  FaSignInAlt,
  FaUserPlus
} from 'react-icons/fa';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

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
    { href: '/live', icon: <FaVideo />, label: 'Live', className: 'text-red-500 hover:text-red-400' },
    { href: '/about', icon: <FaInfoCircle />, label: 'About' },
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900 shadow-lg' : 'bg-gray-900/90 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <FaGamepad className="text-2xl text-blue-500 group-hover:text-blue-400 transition-colors" />
            <span className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
              MyEsports
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center space-x-1 transition-colors ${
                  pathname === link.href
                    ? 'text-blue-400 border-b-2 border-blue-400'
                    : 'text-white hover:text-blue-400'
                } ${link.className || ''}`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* Search and User Section */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-white hover:text-blue-400 transition-colors"
              >
                <FaSearch className="text-xl" />
              </button>
              
              {isSearchOpen && (
                <form
                  onSubmit={handleSearch}
                  className="absolute top-full right-0 mt-2 w-64 bg-gray-800 p-2 rounded-md shadow-lg animate-fadeIn"
                >
                  <div className="flex">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search tournaments, players..."
                      className="flex-1 bg-gray-700 text-white px-3 py-1 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      className="bg-blue-600 px-3 py-1 rounded-r-md hover:bg-blue-700 transition-colors"
                    >
                      <FaSearch />
                    </button>
                  </div>
                </form>
              )}
            </div>
            
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.username} className="w-full h-full rounded-full" />
                    ) : (
                      <FaUser />
                    )}
                  </div>
                  <span>{user.username}</span>
                  <FaCaretDown />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 animate-fadeIn">
                    <Link href="/dashboard" className="block px-4 py-2 text-white hover:bg-gray-700">
                      Dashboard
                    </Link>
                    <Link href="/profile" className="block px-4 py-2 text-white hover:bg-gray-700">
                      Profile
                    </Link>
                    <Link href="/settings" className="block px-4 py-2 text-white hover:bg-gray-700">
                      Settings
                    </Link>
                    <div className="border-t border-gray-700 my-1"></div>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="flex items-center space-x-1 text-white hover:text-blue-400 transition-colors"
                >
                  <FaSignInAlt />
                  <span>Login</span>
                </Link>
                <Link
                  href="/register"
                  className="flex items-center space-x-1 px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                >
                  <FaUserPlus />
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-800 rounded-lg p-4 mt-2 animate-slideDown">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="flex">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tournaments, players..."
                  className="flex-1 bg-gray-700 text-white px-3 py-2 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-600 px-3 py-2 rounded-r-md hover:bg-blue-700 transition-colors"
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
                  className={`flex items-center space-x-2 ${
                    pathname === link.href
                      ? 'text-blue-400'
                      : 'text-white hover:text-blue-400'
                  } ${link.className || ''}`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              ))}
            </nav>

            <div className="mt-4 pt-4 border-t border-gray-700">
              {user ? (
                <div className="flex flex-col space-y-3">
                  <Link href="/dashboard" className="block px-4 py-2 rounded-md bg-gray-700 text-white">
                    Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="block px-4 py-2 rounded-md bg-red-600 text-white"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-3">
                  <Link
                    href="/login"
                    className="flex items-center justify-center space-x-2 px-4 py-2 rounded-md bg-gray-700 text-white"
                  >
                    <FaSignInAlt />
                    <span>Login</span>
                  </Link>
                  <Link
                    href="/register"
                    className="flex items-center justify-center space-x-2 px-4 py-2 rounded-md bg-blue-600 text-white"
                  >
                    <FaUserPlus />
                    <span>Register</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 