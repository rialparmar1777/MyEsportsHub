'use client';

import Link from 'next/link';
import { 
  FaGamepad, 
  FaTwitter, 
  FaDiscord, 
  FaTwitch, 
  FaYoutube,
  FaInstagram
} from 'react-icons/fa';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gaming-dark py-6 border-t border-gaming-primary/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2 group">
              <FaGamepad className="text-xl text-gaming-primary group-hover:text-gaming-neon-green transition-colors animate-neon-pulse" />
              <span className="text-lg font-bold text-white group-hover:text-gaming-primary transition-colors">
                My<span className="text-gaming-primary">Esports</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm">
              Your premier destination for competitive gaming tournaments, team management, and esports community.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gaming-neon-blue transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gaming-neon-purple transition-colors">
                <FaDiscord size={20} />
              </a>
              <a href="https://twitch.tv" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gaming-neon-purple transition-colors">
                <FaTwitch size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gaming-neon-red transition-colors">
                <FaYoutube size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gaming-neon-pink transition-colors">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gaming-primary font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/tournaments" className="text-gray-400 hover:text-gaming-primary transition-colors">
                  Tournaments
                </Link>
              </li>
              <li>
                <Link href="/teams" className="text-gray-400 hover:text-gaming-primary transition-colors">
                  Teams
                </Link>
              </li>
              <li>
                <Link href="/players" className="text-gray-400 hover:text-gaming-primary transition-colors">
                  Players
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-400 hover:text-gaming-primary transition-colors">
                  News
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-gaming-primary font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-400 hover:text-gaming-primary transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-gaming-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-gaming-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="text-gray-400 hover:text-gaming-primary transition-colors">
                  Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-gaming-primary font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-gaming-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-gaming-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-gray-400 hover:text-gaming-primary transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-gray-400 hover:text-gaming-primary transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gaming-primary/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} MyEsports. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-4">
              <Link href="/sitemap" className="text-gray-400 hover:text-gaming-primary text-sm transition-colors">
                Sitemap
              </Link>
              <Link href="/accessibility" className="text-gray-400 hover:text-gaming-primary text-sm transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gaming-primary/60 font-medium">
              Powered by <span className="text-gaming-primary">Rial</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 