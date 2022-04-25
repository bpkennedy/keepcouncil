import * as express from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import prisma from '../prisma'

export const requestValidation = celebrate({
    [Segments.BODY]: {
        petitioner: Joi.string().required(),
        meetingId: Joi.number().required(),
        title: Joi.string().required(),
        accepted: Joi.bool().required().default(false),
        content: Joi.string().default('').allow(null),
        acceptorId: Joi.number().optional().allow(null),
        secondedById: Joi.number().optional().allow(null),
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
            acceptorId,
            secondedById,
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
            motion: true,
        },
    }))
    return res.send(resources).status(200)
}
