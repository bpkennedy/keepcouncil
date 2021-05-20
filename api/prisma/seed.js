const { PrismaClient } = require('@prisma/client')
const {
  users,
  teams,
  games,
  players,
  aspects,
  stats
} = require('./seedData')

const prisma = new PrismaClient()

async function main() {
  for (const data of users) {
    await prisma.user.create({data})
  }
  for (const data of teams) {
    await prisma.team.create({data})
  }
  for (const data of games) {
    await prisma.game.create({data})
  }
  for (const data of players) {
    await prisma.player.create({data})
  }
  for (const data of aspects) {
    await prisma.aspect.create({data})
  }
  for (const data of stats) {
    await prisma.stat.create({data})
  }
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
