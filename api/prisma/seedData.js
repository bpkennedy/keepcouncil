module.exports.users = [
  { id: 1, email: 'joepalca@sample.com', name: 'Joe Palca' },
  { id: 2, email: 'plinytheyounger@sample.com', name: 'Pliny The Younger' },
]

module.exports.teams = [
  { id: 1, name: 'Blue Footed Boobies', description: 'good team', image: 'https://image-cdn.neatoshop.com/styleimg/83466/none/white/default/409214-20;1548178311x.jpg' },
  { id: 2, name: 'Yodeling Yokels', description: 'great team', image: 'https://t4.ftcdn.net/jpg/00/74/86/81/360_F_74868187_YxmLzPYXNmuzc3Zxc5ZnqhejhGAEceB0.jpg' },
]

module.exports.games = [
  { id: 1, homeTeamId: 1, awayTeamId: 2, season: 1, matchDate: new Date(), played: true, homeScore: 3, awayScore: 1 },
  { id: 2, homeTeamId: 2, awayTeamId: 1, season: 1, matchDate: new Date(), played: false },
]

module.exports.players = [
  { id: 1, userId: 1, teamId: 1, firstName: 'Bobby', lastName: 'Bouche', image: 'https://pbs.twimg.com/profile_images/1236608518347788295/IaKy3w-m_400x400.png' },
  { id: 2, userId: 2, teamId: 2, firstName: 'Sven', lastName: 'Carry', image: 'https://i.redd.it/kxous4ynx3a31.jpg' },
]

module.exports.aspects = [
  { id: 1, playerId: 1, name: 'shooting', value: 0, aspectType: 'SKILL' },
  { id: 2, playerId: 1, name: 'passing', value: 0, aspectType: 'SKILL' },
  { id: 3, playerId: 1, name: 'tackling', value: 0, aspectType: 'SKILL' },
  { id: 4, playerId: 1, name: 'blocking', value: 0, aspectType: 'SKILL' },
  { id: 5, playerId: 1, name: 'perception', value: 0, aspectType: 'SKILL' },
  { id: 6, playerId: 1, name: 'tactics', value: 0, aspectType: 'SKILL' },
  { id: 7, playerId: 1, name: 'execution', value: 0, aspectType: 'SKILL' },

  { id: 8, playerId: 1, name: 'strength', value: 0, aspectType: 'ATTRIBUTE' },
  { id: 9, playerId: 1, name: 'endurance', value: 0, aspectType: 'ATTRIBUTE' },
  { id: 10, playerId: 1, name: 'agility', value: 0, aspectType: 'ATTRIBUTE' },
  { id: 11, playerId: 1, name: 'speed', value: 0, aspectType: 'ATTRIBUTE' },
  { id: 12, playerId: 1, name: 'energy', value: 0, aspectType: 'ATTRIBUTE' },
  { id: 13, playerId: 1, name: 'perception', value: 0, aspectType: 'ATTRIBUTE' },
  { id: 14, playerId: 1, name: 'condition', value: 0, aspectType: 'ATTRIBUTE' },
  { id: 15, playerId: 1, name: 'morale', value: 0, aspectType: 'ATTRIBUTE' },

  { id: 16, playerId: 2, name: 'shooting', value: 0, aspectType: 'SKILL' },
  { id: 17, playerId: 2, name: 'passing', value: 0, aspectType: 'SKILL' },
  { id: 18, playerId: 2, name: 'tackling', value: 0, aspectType: 'SKILL' },
  { id: 19, playerId: 2, name: 'blocking', value: 0, aspectType: 'SKILL' },
  { id: 20, playerId: 2, name: 'perception', value: 0, aspectType: 'SKILL' },
  { id: 21, playerId: 2, name: 'tactics', value: 0, aspectType: 'SKILL' },
  { id: 22, playerId: 2, name: 'execution', value: 0, aspectType: 'SKILL' },

  { id: 23, playerId: 2, name: 'strength', value: 0, aspectType: 'ATTRIBUTE' },
  { id: 24, playerId: 2, name: 'endurance', value: 0, aspectType: 'ATTRIBUTE' },
  { id: 25, playerId: 2, name: 'agility', value: 0, aspectType: 'ATTRIBUTE' },
  { id: 26, playerId: 2, name: 'speed', value: 0, aspectType: 'ATTRIBUTE' },
  { id: 27, playerId: 2, name: 'energy', value: 0, aspectType: 'ATTRIBUTE' },
  { id: 28, playerId: 2, name: 'perception', value: 0, aspectType: 'ATTRIBUTE' },
  { id: 29, playerId: 2, name: 'condition', value: 0, aspectType: 'ATTRIBUTE' },
  { id: 30, playerId: 2, name: 'morale', value: 0, aspectType: 'ATTRIBUTE' },
]

module.exports.stats = [
  { id: 1, gameId: 1, playerId: 1, teamId: 1, name: 'goals', value: 3, season: 1 },
  { id: 2, gameId: 1, playerId: 1, teamId: 1, name: 'shotAttempts', value: 5, season: 1 },
  { id: 3, gameId: 1, playerId: 1, teamId: 1, name: 'shotsOnGoal', value: 3, season: 1 },
  { id: 4, gameId: 1, playerId: 1, teamId: 1, name: 'passAttempts', value: 6, season: 1 },
  { id: 5, gameId: 1, playerId: 1, teamId: 1, name: 'passSuccesses', value: 4, season: 1 },
  { id: 6, gameId: 1, playerId: 1, teamId: 1, name: 'hitsMade', value: 8, season: 1 },
  { id: 7, gameId: 1, playerId: 1, teamId: 1, name: 'hitsReceived', value: 1, season: 1 },
  { id: 8, gameId: 1, playerId: 1, teamId: 1, name: 'possession', value: 77, season: 1 },

  { id: 9, gameId: 1, playerId: 2, teamId: 2, name: 'goals', value: 1, season: 1 },
  { id: 10, gameId: 1, playerId: 2, teamId: 2, name: 'shotAttempts', value: 4, season: 1 },
  { id: 11, gameId: 1, playerId: 2, teamId: 2, name: 'shotsOnGoal', value: 2, season: 1 },
  { id: 12, gameId: 1, playerId: 2, teamId: 2, name: 'passAttempts', value: 8, season: 1 },
  { id: 13, gameId: 1, playerId: 2, teamId: 2, name: 'passSuccesses', value: 3, season: 1 },
  { id: 14, gameId: 1, playerId: 2, teamId: 2, name: 'hitsMade', value: 1, season: 1 },
  { id: 15, gameId: 1, playerId: 2, teamId: 2, name: 'hitsReceived', value: 8, season: 1 },
  { id: 16, gameId: 1, playerId: 2, teamId: 2, name: 'possession', value: 20, season: 1 },
]
