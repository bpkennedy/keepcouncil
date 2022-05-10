import * as express from 'express'
import {celebrate, Joi, Segments} from 'celebrate'
import prisma from '../prisma'

const EMAIL_ENUM = 'EMAIL'
const MAIL_ENUM = 'MAIL'

export const communicationValidation = celebrate({
    [Segments.BODY]: {
        communicationType: Joi.string().valid(EMAIL_ENUM, MAIL_ENUM),
        meetingId: Joi.number().required(),
        from: Joi.string().default('').allow(null),
        content: Joi.string().default('').allow(null),
        dateReceived: Joi.date().optional().allow(null)
    },
})

export const communicationCreate = async (req: express.Request, res: express.Response) => {
    const { communicationType, meetingId, from, content, dateReceived } = req.body
    const response = await prisma.communication.create({
        data: {
            // @ts-ignore
            communicationType,
            meetingId,
            from,
            content,
            dateReceived,
        },
    })
    return res.send(response).status(201)
}

export const getMeetingCommunications = async (req: express.Request, res: express.Response) => {
    const resources = (await prisma.communication.findMany({
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

export const getAllCommunications = async (req: express.Request, res: express.Response) => {
    const resources = (await prisma.communication.findMany({
        include: {
            meeting: true,
            motion: true,
        },
    }))
    return res.send(resources).status(200)
}

