'use client';

import { useEffect, useMemo, useState } from 'react';
import LiveNumber from '@/components/LiveNumber';
import { getGameName, getGameIcon } from '@/lib/tournamentData';

export default function LivePage() {
  const [selectedGame, setSelectedGame] = useState('all');
  const [search, setSearch] = useState('');
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        setLoading(true);
        setError('');
        const res = await fetch('/api/live', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch live matches');
        const data = await res.json();
        if (isMounted) setMatches(Array.isArray(data.matches) ? data.matches : []);
      } catch (e) {
        if (isMounted) setError('Could not load live matches.');
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    const id = setInterval(load, 30000);
    return () => { isMounted = false; clearInterval(id); };
  }, []);

  const games = useMemo(() => {
    const set = new Set(matches.map(m => m.game));
    return ['all', ...Array.from(set)];
  }, [matches]);

  const filtered = useMemo(() => {
    return matches.filter(m => {
      const byGame = selectedGame === 'all' || m.game === selectedGame;
      const q = search.trim().toLowerCase();
      const bySearch = !q ||
        m.tournamentTitle?.toLowerCase().includes(q) ||
        m.homeTeam?.name?.toLowerCase().includes(q) ||
        m.awayTeam?.name?.toLowerCase().includes(q) ||
        getGameName(m.game).toLowerCase().includes(q);
      return byGame && bySearch;
    });
  }, [matches, selectedGame, search]);

  const totalViewers = filtered.reduce((sum, m) => sum + (m.viewerCount || 0), 0);

  return (
    <main className="min-h-screen bg-gaming-dark text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, #39ff14 0, transparent 25%), radial-gradient(circle at 80% 30%, #00ccff 0, transparent 25%), radial-gradient(circle at 50% 80%, #bf00ff 0, transparent 25%)' }} />
      <div className="absolute inset-0 bg-cyber-grid" />
      <div className="absolute inset-0 bg-gradient-to-b from-gaming-darker/60 via-black/40 to-gaming-darker/80" />

      <section className="relative z-10 px-6 md:px-10 lg:px-16 py-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gaming-neon-green [text-shadow:0_0_6px_rgba(57,255,20,0.35)]">
              Live Esports Matches
            </h1>
            <p className="text-gray-300 mt-2">Catch the action across Valorant, CS2, LoL, Dota 2, Fortnite and more.</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-black/40 border border-white/10 rounded-lg p-4 text-center">
              <div className="text-xs uppercase tracking-widest text-gray-400">Live Matches</div>
              <LiveNumber value={filtered.length} className="text-2xl font-bold text-gaming-neon-green" />
            </div>
            <div className="bg-black/40 border border-white/10 rounded-lg p-4 text-center">
              <div className="text-xs uppercase tracking-widest text-gray-400">Viewers</div>
              <LiveNumber value={totalViewers} className="text-2xl font-bold text-gaming-neon-blue" />
            </div>
            <div className="bg-black/40 border border-white/10 rounded-lg p-4 text-center">
              <div className="text-xs uppercase tracking-widest text-gray-400">Games</div>
              <LiveNumber value={games.length - 1} className="text-2xl font-bold text-gaming-neon-purple" />
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col lg:flex-row gap-4 items-stretch">
          <div className="flex-1 flex gap-2 overflow-x-auto no-scrollbar">
            {games.map(g => (
              <button
                key={g}
                onClick={() => setSelectedGame(g)}
                className={`whitespace-nowrap px-4 py-2 rounded-md border transition-colors ${
                  selectedGame === g
                    ? 'bg-gaming-primary/20 border-gaming-primary text-gaming-primary'
                    : 'bg-black/40 border-white/10 text-gray-300 hover:bg-black/60'
                }`}
              >
                <span className="mr-2">{g === 'all' ? '🌐' : getGameIcon(g)}</span>
                {g === 'all' ? 'All Games' : getGameName(g)}
              </button>
            ))}
          </div>

          <div className="w-full lg:w-80">
            <div className="relative">
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search teams or tournaments"
                className="w-full bg-black/40 border border-white/10 rounded-md pl-10 pr-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gaming-primary"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {loading && (
            <div className="col-span-full flex items-center justify-center py-16 text-gray-400">Loading live matches...</div>
          )}
          {error && !loading && (
            <div className="col-span-full text-center text-gaming-neon-red">{error}</div>
          )}
          {!loading && !error && filtered.length === 0 && (
            <div className="col-span-full text-center text-gray-400">No live matches found.</div>
          )}

          {!loading && !error && filtered.map(match => (
            <article key={match.id} className="relative bg-black/40 border border-white/10 rounded-xl overflow-hidden shadow-[0_0_25px_rgba(0,255,0,0.08)]">
              <div className="absolute right-4 top-4 flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-gaming-neon-red">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-gaming-neon-red animate-pulse" /> LIVE
                </span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-xs text-gray-300">{getGameName(match.game)}</span>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-white/90 mb-1">{match.tournamentTitle}</h3>
                <div className="text-xs text-gray-400 mb-4">{match.round} • {new Date(match.startTime).toLocaleString()}</div>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="w-10 h-10 rounded-md object-cover" />
                    <div className="truncate">
                      <div className="text-white font-semibold truncate">{match.homeTeam.name}</div>
                      <div className="text-xs text-gray-400">Home</div>
                    </div>
                  </div>

                  <div className="text-center px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-2xl font-extrabold tracking-widest">
                      {match.homeScore} : {match.awayScore}
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-gray-400">Score</div>
                  </div>

                  <div className="flex items-center gap-3 min-w-0 justify-end">
                    <div className="text-right truncate">
                      <div className="text-white font-semibold truncate">{match.awayTeam.name}</div>
                      <div className="text-xs text-gray-400">Away</div>
                    </div>
                    <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="w-10 h-10 rounded-md object-cover" />
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between gap-3">
                  <a
                    href={match.streamUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-gaming-primary/20 border border-gaming-primary text-gaming-primary hover:bg-gaming-primary/30 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M4 3a2 2 0 00-2 2v7a2 2 0 002 2h3l3 3 3-3h1a2 2 0 002-2V9a7 7 0 10-12-6z" /></svg>
                    Watch Stream
                  </a>
                  <div className="px-3 py-2 rounded-md bg-white/5 border border-white/10 text-gray-300 text-sm">
                    {match.viewerCount?.toLocaleString() || '—'} watching
                  </div>
                </div>
              </div>

              <div className="h-1 w-full bg-gradient-to-r from-gaming-neon-green via-gaming-neon-blue to-gaming-neon-purple" />
            </article>
          ))}
        </div>
      </section>
    </main>
  );
} 