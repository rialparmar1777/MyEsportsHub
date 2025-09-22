import { NextResponse } from 'next/server';
import { tournamentData } from '@/lib/tournamentData';

function computeLiveMatches() {
  const now = new Date();
  const matches = [];
  for (const t of Object.values(tournamentData)) {
    // Include ongoing tournaments primarily
    if (t.status === 'ongoing') {
      const nonCompleted = (t.matches || []).filter(m => m.status !== 'completed');
      for (const m of nonCompleted) {
        const start = new Date(m.startTime);
        const soonWindowMs = 12 * 60 * 60 * 1000; // 12 hours
        const isLiveOrSoon = start <= now || (start.getTime() - now.getTime() <= soonWindowMs);
        if (!isLiveOrSoon) continue;
        matches.push({
          id: `${t.id}-${m.id}`,
          tournamentId: t.id,
          tournamentTitle: t.title,
          game: t.game,
          streamUrl: m.streamUrl || t.streamUrl,
          round: m.round,
          startTime: m.startTime,
          homeTeam: m.homeTeam,
          awayTeam: m.awayTeam,
          homeScore: m.homeScore,
          awayScore: m.awayScore,
          viewerCount: 5000 + Math.floor(Math.random() * 45000),
        });
      }
      if (nonCompleted.length === 0) {
        matches.push({
          id: `${t.id}-tbd`,
          tournamentId: t.id,
          tournamentTitle: t.title,
          game: t.game,
          streamUrl: t.streamUrl,
          round: 'Live',
          startTime: t.startDate,
          homeTeam: { id: 'tbd1', name: 'TBD', logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=40&h=40&fit=crop' },
          awayTeam: { id: 'tbd2', name: 'TBD', logo: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=40&h=40&fit=crop' },
          homeScore: 0,
          awayScore: 0,
          viewerCount: 5000 + Math.floor(Math.random() * 45000),
        });
      }
      continue;
    }

    // Also show tournaments starting soon (even if not yet ongoing)
    if (t.status === 'upcoming') {
      const start = new Date(t.startDate);
      const soonWindowMs = 12 * 60 * 60 * 1000; // 12 hours
      if (start.getTime() - now.getTime() <= soonWindowMs) {
        matches.push({
          id: `${t.id}-upcoming`,
          tournamentId: t.id,
          tournamentTitle: t.title,
          game: t.game,
          streamUrl: t.streamUrl,
          round: 'Starting Soon',
          startTime: t.startDate,
          homeTeam: { id: 'tbd1', name: 'TBD', logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=40&h=40&fit=crop' },
          awayTeam: { id: 'tbd2', name: 'TBD', logo: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=40&h=40&fit=crop' },
          homeScore: 0,
          awayScore: 0,
          viewerCount: 5000 + Math.floor(Math.random() * 45000),
        });
      }
    }
  }
  return matches;
}

export async function GET() {
  try {
    const matches = computeLiveMatches();
    return NextResponse.json({ matches }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to load live matches' }, { status: 500 });
  }
} 