import * as express from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import prisma from '../prisma'

export const requestValidation = celebrate({
    [Segments.BODY]: {
        petitioner: Joi.string().required(),
        meetingId: Joi.number().required(),
        title: Joi.string().required(),
        accepted: Joi.bool().required().default(false),
        content: Joi.string().default(''),
        acceptorId: Joi.number().optional(),
        secondedById: Joi.number().optional(),
    },
})

export const requestCreate = async (req: express.Request, res: express.Response) => {
    const { petitioner, title, meetingId, content, accepted, acceptorId, secondedById } = req.body
    const response = await prisma.request.create({
        data: {
            // @ts-ignore
            petitioner,
            meetingId,
            title,
            content,
            accepted,
            acceptorId: acceptorId || null,
            secondedById: secondedById || null,
        },
    })
    return res.send(response).status(201)
}

export const getMeetingRequests = async (req: express.Request, res: express.Response) => {
    const resources = (await prisma.request.findMany({
        where: {
            meetingId: Number(req.params.meetingId)
        },
        include: {
            meeting: true,
            acceptor: true,
            secondedBy: true,
            fromMotion: true,
        },
    }))
    return res.send(resources).status(200)
}
