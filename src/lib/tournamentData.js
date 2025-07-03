// Comprehensive tournament data for all games
export const tournamentData = {
  '1': {
    id: '1',
    title: 'Valorant Champions 2024',
    game: 'valorant',
    prizePool: '$2,000,000',
    startDate: '2024-12-15T10:00:00Z',
    endDate: '2024-12-22T18:00:00Z',
    status: 'ongoing',
    region: 'Global',
    participants: 16,
    maxTeams: 16,
    description: 'The biggest Valorant tournament of the year featuring the world\'s best teams competing for the ultimate championship title.',
    streamUrl: 'https://www.twitch.tv/valorant',
    teams: [
      { id: '1', name: 'Team Liquid', logo: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=60&h=60&fit=crop', region: 'NA', wins: 3, losses: 1 },
      { id: '2', name: 'Fnatic', logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=60&h=60&fit=crop', region: 'EU', wins: 4, losses: 0 },
      { id: '3', name: 'Sentinels', logo: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=60&h=60&fit=crop', region: 'NA', wins: 2, losses: 2 },
      { id: '4', name: 'G2 Esports', logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=60&h=60&fit=crop', region: 'EU', wins: 3, losses: 1 }
    ],
    matches: [
      {
        id: '1',
        homeTeam: { id: '1', name: 'Team Liquid', logo: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=40&h=40&fit=crop' },
        awayTeam: { id: '2', name: 'Fnatic', logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=40&h=40&fit=crop' },
        homeScore: 13,
        awayScore: 16,
        status: 'completed',
        startTime: '2024-12-15T10:00:00Z',
        round: 'Group Stage',
        streamUrl: 'https://www.twitch.tv/valorant'
      },
      {
        id: '2',
        homeTeam: { id: '3', name: 'Sentinels', logo: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=40&h=40&fit=crop' },
        awayTeam: { id: '4', name: 'G2 Esports', logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=40&h=40&fit=crop' },
        homeScore: 14,
        awayScore: 12,
        status: 'completed',
        startTime: '2024-12-15T14:00:00Z',
        round: 'Group Stage',
        streamUrl: 'https://www.twitch.tv/valorant'
      }
    ]
  },
  '2': {
    id: '2',
    title: 'CS2 Major Championship',
    game: 'cs2',
    prizePool: '$1,500,000',
    startDate: '2024-11-20T14:00:00Z',
    endDate: '2024-11-25T20:00:00Z',
    status: 'ongoing',
    region: 'Global',
    participants: 24,
    maxTeams: 24,
    description: 'The most prestigious CS2 tournament with top teams from around the world competing for the Major title.',
    streamUrl: 'https://www.twitch.tv/cs2',
    teams: [
      { id: '1', name: 'NAVI', logo: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=60&h=60&fit=crop', region: 'CIS', wins: 4, losses: 0 },
      { id: '2', name: 'FaZe Clan', logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=60&h=60&fit=crop', region: 'EU', wins: 3, losses: 1 },
      { id: '3', name: 'Vitality', logo: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=60&h=60&fit=crop', region: 'EU', wins: 2, losses: 2 },
      { id: '4', name: 'Cloud9', logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=60&h=60&fit=crop', region: 'NA', wins: 1, losses: 3 }
    ],
    matches: [
      {
        id: '1',
        homeTeam: { id: '1', name: 'NAVI', logo: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=40&h=40&fit=crop' },
        awayTeam: { id: '2', name: 'FaZe Clan', logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=40&h=40&fit=crop' },
        homeScore: 16,
        awayScore: 14,
        status: 'completed',
        startTime: '2024-11-20T14:00:00Z',
        round: 'Group Stage',
        streamUrl: 'https://www.twitch.tv/cs2'
      }
    ]
  },
  '3': {
    id: '3',
    title: 'LoL World Championship',
    game: 'lol',
    prizePool: '$3,000,000',
    startDate: '2024-10-15T12:00:00Z',
    endDate: '2024-11-05T16:00:00Z',
    status: 'completed',
    region: 'Global',
    participants: 24,
    maxTeams: 24,
    description: 'The ultimate League of Legends tournament featuring the best teams globally competing for the Summoner\'s Cup.',
    streamUrl: 'https://www.twitch.tv/leagueoflegends',
    teams: [
      { id: '1', name: 'T1', logo: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=60&h=60&fit=crop', region: 'KR', wins: 5, losses: 0 },
      { id: '2', name: 'JDG', logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=60&h=60&fit=crop', region: 'CN', wins: 4, losses: 1 },
      { id: '3', name: 'G2 Esports', logo: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=60&h=60&fit=crop', region: 'EU', wins: 3, losses: 2 },
      { id: '4', name: 'Cloud9', logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=60&h=60&fit=crop', region: 'NA', wins: 2, losses: 3 }
    ],
    matches: [
      {
        id: '1',
        homeTeam: { id: '1', name: 'T1', logo: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=40&h=40&fit=crop' },
        awayTeam: { id: '2', name: 'JDG', logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=40&h=40&fit=crop' },
        homeScore: 3,
        awayScore: 2,
        status: 'completed',
        startTime: '2024-11-05T12:00:00Z',
        round: 'Finals',
        streamUrl: 'https://www.twitch.tv/leagueoflegends'
      }
    ]
  },
  '4': {
    id: '4',
    title: 'Dota 2 International',
    game: 'dota',
    prizePool: '$5,000,000',
    startDate: '2024-12-01T09:00:00Z',
    endDate: '2024-12-10T22:00:00Z',
    status: 'upcoming',
    region: 'Global',
    participants: 18,
    maxTeams: 18,
    description: 'The most prestigious Dota 2 tournament with the largest prize pool in esports history.',
    streamUrl: 'https://www.twitch.tv/dota2',
    teams: [
      { id: '1', name: 'Team Spirit', logo: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=60&h=60&fit=crop', region: 'CIS', wins: 0, losses: 0 },
      { id: '2', name: 'PSG.LGD', logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=60&h=60&fit=crop', region: 'CN', wins: 0, losses: 0 },
      { id: '3', name: 'OG', logo: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=60&h=60&fit=crop', region: 'EU', wins: 0, losses: 0 },
      { id: '4', name: 'Evil Geniuses', logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=60&h=60&fit=crop', region: 'NA', wins: 0, losses: 0 }
    ],
    matches: [
      {
        id: '1',
        homeTeam: { id: '1', name: 'Team Spirit', logo: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=40&h=40&fit=crop' },
        awayTeam: { id: '2', name: 'PSG.LGD', logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=40&h=40&fit=crop' },
        homeScore: 0,
        awayScore: 0,
        status: 'scheduled',
        startTime: '2024-12-01T09:00:00Z',
        round: 'Group Stage',
        streamUrl: 'https://www.twitch.tv/dota2'
      }
    ]
  },
  '5': {
    id: '5',
    title: 'Fortnite World Cup',
    game: 'fortnite',
    prizePool: '$1,000,000',
    startDate: '2024-11-10T15:00:00Z',
    endDate: '2024-11-12T18:00:00Z',
    status: 'ongoing',
    region: 'Global',
    participants: 100,
    maxTeams: 100,
    description: 'The biggest Fortnite tournament featuring solo and duo competitions with the world\'s best players.',
    streamUrl: 'https://www.twitch.tv/fortnite',
    teams: [
      { id: '1', name: 'Bugha', logo: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=60&h=60&fit=crop', region: 'NA', wins: 3, losses: 0 },
      { id: '2', name: 'Mongraal', logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=60&h=60&fit=crop', region: 'EU', wins: 2, losses: 1 },
      { id: '3', name: 'Tfue', logo: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=60&h=60&fit=crop', region: 'NA', wins: 1, losses: 2 },
      { id: '4', name: 'BenjyFishy', logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=60&h=60&fit=crop', region: 'EU', wins: 0, losses: 3 }
    ],
    matches: [
      {
        id: '1',
        homeTeam: { id: '1', name: 'Bugha', logo: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=40&h=40&fit=crop' },
        awayTeam: { id: '2', name: 'Mongraal', logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=40&h=40&fit=crop' },
        homeScore: 15,
        awayScore: 12,
        status: 'completed',
        startTime: '2024-11-10T15:00:00Z',
        round: 'Solo Finals',
        streamUrl: 'https://www.twitch.tv/fortnite'
      }
    ]
  },
  '6': {
    id: '6',
    title: 'Overwatch League Finals',
    game: 'overwatch',
    prizePool: '$800,000',
    startDate: '2024-12-05T11:00:00Z',
    endDate: '2024-12-08T19:00:00Z',
    status: 'upcoming',
    region: 'Global',
    participants: 8,
    maxTeams: 8,
    description: 'The grand finale of the Overwatch League season featuring the top teams competing for the championship.',
    streamUrl: 'https://www.twitch.tv/overwatchleague',
    teams: [
      { id: '1', name: 'Shanghai Dragons', logo: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=60&h=60&fit=crop', region: 'APAC', wins: 0, losses: 0 },
      { id: '2', name: 'San Francisco Shock', logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=60&h=60&fit=crop', region: 'NA', wins: 0, losses: 0 },
      { id: '3', name: 'Dallas Fuel', logo: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=60&h=60&fit=crop', region: 'NA', wins: 0, losses: 0 },
      { id: '4', name: 'Seoul Dynasty', logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=60&h=60&fit=crop', region: 'APAC', wins: 0, losses: 0 }
    ],
    matches: [
      {
        id: '1',
        homeTeam: { id: '1', name: 'Shanghai Dragons', logo: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=40&h=40&fit=crop' },
        awayTeam: { id: '2', name: 'San Francisco Shock', logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=40&h=40&fit=crop' },
        homeScore: 0,
        awayScore: 0,
        status: 'scheduled',
        startTime: '2024-12-05T11:00:00Z',
        round: 'Finals',
        streamUrl: 'https://www.twitch.tv/overwatchleague'
      }
    ]
  }
};

export const getGameIcon = (game) => {
  const gameIcons = {
    valorant: '🎯',
    cs2: '🔫',
    lol: '⚔️',
    dota: '🗡️',
    fortnite: '🏗️',
    overwatch: '🛡️'
  };
  return gameIcons[game] || '🎮';
};

export const getGameName = (game) => {
  const gameNames = {
    valorant: 'Valorant',
    cs2: 'CS2',
    lol: 'League of Legends',
    dota: 'Dota 2',
    fortnite: 'Fortnite',
    overwatch: 'Overwatch 2'
  };
  return gameNames[game] || 'Unknown Game';
}; 