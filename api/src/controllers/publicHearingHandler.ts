import * as express from 'express'
import {celebrate, Joi, Segments} from 'celebrate'
import prisma from '../prisma'

export const publicHearingValidation = celebrate({
    [Segments.BODY]: {
        from: Joi.string().required(),
        title: Joi.string().required(),
        meetingId: Joi.number().required(),
        topic: Joi.string().default('').allow(null),
        content: Joi.string().default('').allow(null),
    },
})

export const publicHearingCreate = async (req: express.Request, res: express.Response) => {
    const { from, title, meetingId, topic, content } = req.body
    const response = await prisma.publicHearing.create({
        data: {
            // @ts-ignore
            from,
            title,
            meetingId,
            topic,
            content,
        },
    })
    return res.send(response).status(201)
}

export const getMeetingPublicHearings = async (req: express.Request, res: express.Response) => {
    const resources = (await prisma.publicHearing.findMany({
        where: {
            meetingId: Number(req.params.meetingId)
        },
        include: {
            meeting: true,
            motion: true,
        },
    }))
    return res.send(resources).status(200)
}

export const getAllPublicHearings = async (req: express.Request, res: express.Response) => {
    const resources = (await prisma.publicHearing.findMany({
        include: {
            meeting: true,
            motion: true,
        },
    }))
    return res.send(resources).status(200)
}
