'use client';

import Link from 'next/link';
import { FaDiscord, FaTwitter, FaTwitch, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="relative mt-12 text-white">
      {/* Top neon gradient rule */}
      <div className="h-[2px] w-full bg-gradient-to-r from-gaming-neon-green via-gaming-neon-blue to-gaming-neon-purple" />

      {/* Background layers */}
      <div className="absolute inset-0 bg-gaming-darker" />
      <div className="absolute inset-0 bg-cyber-grid opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/60" />

      {/* Content */}
      <div className="relative z-10 px-6 py-12">
        <div className="container">
          <div className="grid gap-10 md:grid-cols-3">
            {/* Brand */}
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight">
                <span className="text-white">My</span>
                <span className="text-gaming-primary">Esports</span>
              </h2>
              <p className="mt-3 text-sm text-gray-400">Compete. Dominate. Conquer.</p>
              {/* Socials */}
              <div className="mt-5 flex items-center gap-3 text-gray-300">
                <a href="https://twitch.tv" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <FaTwitch className="text-gaming-primary" /> <span className="text-sm">Twitch</span>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <FaYoutube className="text-gaming-neon-red" /> <span className="text-sm">YouTube</span>
                </a>
                <a href="https://discord.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <FaDiscord className="text-gaming-neon-purple" /> <span className="text-sm">Discord</span>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <FaTwitter className="text-gaming-neon-blue" /> <span className="text-sm">X</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="inline-flex items-center justify-between group px-3 py-2 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <span>Home</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-gaming-primary">→</span>
                  </Link>
                </li>
                <li>
                  <Link href="/teams" className="inline-flex items-center justify-between group px-3 py-2 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <span>Teams</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-gaming-primary">→</span>
                  </Link>
                </li>
                <li>
                  <Link href="/live" className="inline-flex items-center justify-between group px-3 py-2 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <span>Matches</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-gaming-primary">→</span>
                  </Link>
                </li>
                <li>
                  <Link href="/news" className="inline-flex items-center justify-between group px-3 py-2 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <span>News</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-gaming-primary">→</span>
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="inline-flex items-center justify-between group px-3 py-2 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <span>Contact</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-gaming-primary">→</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Stay in the loop</h3>
              <p className="text-sm text-gray-400">Subscribe for tournament alerts and live match highlights.</p>
              <form onSubmit={(e) => e.preventDefault()} className="mt-4 flex">
                <label htmlFor="footer-email" className="visually-hidden">Email address</label>
                <input id="footer-email" type="email" placeholder="Email address" className="flex-1 bg-black/40 border border-white/10 rounded-l-md px-3 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gaming-primary" />
                <button type="submit" className="px-4 py-2 rounded-r-md bg-gaming-primary/20 border border-gaming-primary text-gaming-primary hover:bg-gaming-primary/30 transition-colors">Join</button>
              </form>
              <div className="mt-3 text-xs text-gray-500">We respect your privacy. Unsubscribe anytime.</div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <span>© {new Date().getFullYear()} MyEsports.</span>
              <span>All rights reserved.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="opacity-80">Powered by</span>
              <span className="text-gaming-neon-green font-semibold">Rial</span>
            </div>
          </div>
        </div>
      </div>

            </footer>
  )
} 