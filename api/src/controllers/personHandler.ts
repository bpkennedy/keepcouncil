import * as express from 'express'
import prisma from '../prisma'

export const allPersonsHandler = async (req: express.Request, res: express.Response) => {
    // @ts-ignore
    const resources = (await prisma.person.findMany({
        // include: {
        //     meetingsAttended: true,
        //     initiatedMotions: true,
        //     secondedMotions: true,
        //     introducedResolutions: true,
        //     resolutionAyeVotes: true,
        //     resolutionNayVotes: true,
        //     introducedBills: true,
        //     billAyeVotes: true,
        //     billNayVotes: true,
        //     referredBoardAppointments: true,
        //     acceptedRequests: true,
        //     secondedRequests: true,
        //     announcedAnnouncements: true,
        // },
    }))
    return res.send(resources).status(200)
}
