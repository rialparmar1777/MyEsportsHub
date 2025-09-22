import { NextResponse } from 'next/server';
import { tournamentData, getGameName } from '@/lib/tournamentData';

function aggregateTeams() {
  const map = new Map();

  for (const t of Object.values(tournamentData)) {
    const game = t.game;
    for (const team of t.teams || []) {
      const key = `${team.name}|${game}`; // per game to avoid cross-game collisions
      if (!map.has(key)) {
        map.set(key, {
          id: `${game}-${team.id}`,
          name: team.name,
          logo: team.logo,
          region: team.region || 'Global',
          game,
          wins: team.wins || 0,
          losses: team.losses || 0,
          tournaments: new Set([t.id]),
          socials: {
            twitter: `https://twitter.com/${team.name.replace(/\s+/g, '')}`,
            twitch: `https://twitch.tv/${team.name.replace(/\s+/g, '').toLowerCase()}`,
            website: `https://example.com/${team.name.replace(/\s+/g, '-').toLowerCase()}`,
          },
          players: [],
        });
      } else {
        const agg = map.get(key);
        agg.wins += team.wins || 0;
        agg.losses += team.losses || 0;
        agg.tournaments.add(t.id);
        // Prefer first non-empty logo
        if (!agg.logo && team.logo) agg.logo = team.logo;
      }
    }
  }

  const teams = Array.from(map.values()).map(team => ({
    ...team,
    tournamentCount: team.tournaments.size,
    gameName: getGameName(team.game),
    rating: Math.max(0, Math.round(((team.wins + 1) / (team.wins + team.losses + 2)) * 100)),
  }));

  teams.sort((a, b) => b.rating - a.rating || b.wins - a.wins);
  return teams;
}

export async function GET() {
  try {
    const teams = aggregateTeams();
    return NextResponse.json({ teams }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to load teams' }, { status: 500 });
  }
} 