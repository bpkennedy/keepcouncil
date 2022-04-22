import * as express from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import prisma from '../prisma'

export const announcementValidation = celebrate({
    [Segments.BODY]: {
        announcerId: Joi.number().required(),
        meetingId: Joi.number().required(),
        content: Joi.string().default(''),
    },
})

export const announcementCreate = async (req: express.Request, res: express.Response) => {
    const { announcerId, content, meetingId } = req.body
    const response = await prisma.announcement.create({
        data: {
            // @ts-ignore
            announcerId,
            meetingId,
            content,
        },
    })
    return res.send(response).status(201)
}

export const getMeetingAnnouncements = async (req: express.Request, res: express.Response) => {
    const resources = (await prisma.announcement.findMany({
        where: {
            meetingId: Number(req.params.meetingId)
        },
        include: {
            announcer: true,
            meeting: true,
            fromMotion: true,
        },
    }))
    return res.send(resources).status(200)
}
