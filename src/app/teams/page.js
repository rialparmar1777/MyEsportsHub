'use client';

import { useEffect, useMemo, useState } from 'react';
import LiveNumber from '@/components/LiveNumber';
import { getGameName, getGameIcon } from '@/lib/tournamentData';

export default function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedGame, setSelectedGame] = useState('all');
  const [region, setRegion] = useState('all');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        setError('');
        const res = await fetch('/api/teams', { cache: 'force-cache' });
        if (!res.ok) throw new Error('Failed to load teams');
        const data = await res.json();
        if (mounted) setTeams(Array.isArray(data.teams) ? data.teams : []);
      } catch (e) {
        if (mounted) setError('Could not load teams');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  const games = useMemo(() => {
    const set = new Set(teams.map(t => t.game));
    return ['all', ...Array.from(set)];
  }, [teams]);

  const regions = useMemo(() => {
    const set = new Set(teams.map(t => t.region || 'Global'));
    return ['all', ...Array.from(set)];
  }, [teams]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = teams.filter(t => {
      const byGame = selectedGame === 'all' || t.game === selectedGame;
      const byRegion = region === 'all' || (t.region || 'Global') === region;
      const bySearch = !q || t.name.toLowerCase().includes(q) || (t.gameName || '').toLowerCase().includes(q);
      return byGame && byRegion && bySearch;
    });

    list = list.sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'wins') return b.wins - a.wins;
      if (sortBy === 'tournaments') return (b.tournamentCount || 0) - (a.tournamentCount || 0);
      return 0;
    });

    return list;
  }, [teams, selectedGame, region, search, sortBy]);

  return (
    <main className="min-h-screen bg-gaming-dark text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, #39ff14 0, transparent 25%), radial-gradient(circle at 80% 30%, #00ccff 0, transparent 25%), radial-gradient(circle at 50% 80%, #bf00ff 0, transparent 25%)' }} />
      <div className="absolute inset-0 bg-cyber-grid" />
      <div className="absolute inset-0 bg-gradient-to-b from-gaming-darker/60 via-black/40 to-gaming-darker/80" />

      <section className="relative z-10 px-6 md:px-10 lg:px-16 py-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gaming-neon-blue [text-shadow:0_0_6px_rgba(0,255,255,0.35)]">Esports Teams</h1>
            <p className="text-gray-300 mt-2">Discover top teams across major titles. Filter by game, region, and performance.</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-black/40 border border-white/10 rounded-lg p-4 text-center">
              <div className="text-xs uppercase tracking-widest text-gray-400">Teams</div>
              <LiveNumber value={filtered.length} className="text-2xl font-bold text-gaming-neon-blue" />
            </div>
            <div className="bg-black/40 border border-white/10 rounded-lg p-4 text-center">
              <div className="text-xs uppercase tracking-widest text-gray-400">Avg Rating</div>
              <span className="text-2xl font-bold text-gaming-neon-green">{filtered.length ? Math.round(filtered.reduce((s, t) => s + (t.rating || 0), 0) / filtered.length) : 0}</span>
            </div>
            <div className="bg-black/40 border border-white/10 rounded-lg p-4 text-center">
              <div className="text-xs uppercase tracking-widest text-gray-400">Tournaments</div>
              <span className="text-2xl font-bold text-gaming-neon-purple">{filtered.reduce((s, t) => s + (t.tournamentCount || 0), 0)}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-4 items-stretch">
          <div className="lg:col-span-3 flex flex-wrap gap-2">
            {games.map(g => (
              <button
                key={g}
                onClick={() => setSelectedGame(g)}
                className={`px-4 py-2 rounded-md border transition-colors ${selectedGame === g ? 'bg-gaming-primary/20 border-gaming-primary text-gaming-primary' : 'bg-black/40 border-white/10 text-gray-300 hover:bg-black/60'}`}
              >
                <span className="mr-2">{g === 'all' ? '🌐' : getGameIcon(g)}</span>
                {g === 'all' ? 'All Games' : getGameName(g)}
              </button>
            ))}
          </div>

          <div className="lg:col-span-1 flex gap-2">
            <select value={region} onChange={e => setRegion(e.target.value)} className="flex-1 bg-black/40 border border-white/10 rounded-md px-3 py-2">
              {regions.map(r => <option key={r} value={r}>{r === 'all' ? 'All Regions' : r}</option>)}
            </select>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="w-40 bg-black/40 border border-white/10 rounded-md px-3 py-2">
              <option value="rating">Top Rated</option>
              <option value="wins">Most Wins</option>
              <option value="tournaments">Most Tournaments</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <div className="relative max-w-xl">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search teams or games"
              className="w-full bg-black/40 border border-white/10 rounded-md pl-10 pr-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gaming-primary"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {loading && (
            <div className="col-span-full flex items-center justify-center py-16 text-gray-400">Loading teams...</div>
          )}
          {error && !loading && (
            <div className="col-span-full text-center text-gaming-neon-red">{error}</div>
          )}
          {!loading && !error && filtered.length === 0 && (
            <div className="col-span-full text-center text-gray-400">No teams found.</div>
          )}

          {!loading && !error && filtered.map(team => (
            <article key={team.id} className="relative bg-black/40 border border-white/10 rounded-xl overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-gaming-neon-blue via-gaming-neon-green to-gaming-neon-purple" />
              <div className="p-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={team.logo} alt={team.name} className="w-12 h-12 rounded-md object-cover" />
                    <div className="truncate">
                      <div className="text-white font-semibold truncate">{team.name}</div>
                      <div className="text-xs text-gray-400">{team.region} • {team.gameName}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-extrabold text-gaming-neon-green">{team.rating}%</div>
                    <div className="text-[10px] uppercase tracking-wider text-gray-400">Rating</div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="bg-white/5 border border-white/10 rounded-md p-3 text-center">
                    <div className="text-xl font-bold">{team.wins}</div>
                    <div className="text-[10px] uppercase tracking-wider text-gray-400">Wins</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-md p-3 text-center">
                    <div className="text-xl font-bold">{team.losses}</div>
                    <div className="text-[10px] uppercase tracking-wider text-gray-400">Losses</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-md p-3 text-center">
                    <div className="text-xl font-bold">{team.tournamentCount}</div>
                    <div className="text-[10px] uppercase tracking-wider text-gray-400">Tournaments</div>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-gray-300">
                    <a href={team.socials?.twitter} target="_blank" rel="noreferrer" className="hover:text-gaming-neon-blue">Twitter</a>
                    <span className="opacity-30">•</span>
                    <a href={team.socials?.twitch} target="_blank" rel="noreferrer" className="hover:text-gaming-neon-purple">Twitch</a>
                    <span className="opacity-30">•</span>
                    <a href={team.socials?.website} target="_blank" rel="noreferrer" className="hover:text-gaming-primary">Website</a>
                  </div>
                  <button className="px-4 py-2 rounded-md bg-gaming-primary/20 border border-gaming-primary text-gaming-primary hover:bg-gaming-primary/30 transition-colors">View Profile</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
} 