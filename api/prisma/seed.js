const { PrismaClient } = require('@prisma/client')
const {
  persons,
  hearingFromCitizens,
  proclamations,
  resolutions,
  communications,
  publicHearings,
  bills,
  boardAppointments,
  requests,
  announcements,
  // motions,
  meetings,
} = require('./seedData')

const prisma = new PrismaClient()

async function main() {
  for (const data of persons) {
    await prisma.person.create({data})
  }
  for (const data of meetings) {
    await prisma.meeting.create({data})
  }
  for (const data of hearingFromCitizens) {
    await prisma.hearingFromCitizen.create({data})
  }
  for (const data of proclamations) {
    await prisma.proclamation.create({data})
  }
  for (const data of resolutions) {
    await prisma.resolution.create({data})
  }
  for (const data of communications) {
    await prisma.communication.create({data})
  }
  for (const data of publicHearings) {
    await prisma.publicHearing.create({data})
  }
  for (const data of bills) {
    await prisma.bill.create({data})
  }
  for (const data of boardAppointments) {
    await prisma.boardAppointment.create({data})
  }
  for (const data of requests) {
    await prisma.request.create({data})
  }
  for (const data of announcements) {
    await prisma.announcement.create({data})
  }
  // for (const data of motions) {
  //   await prisma.motion.create({data})
  // }
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
