import * as express from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import prisma from '../prisma'

export const resolutionValidation = celebrate({
    [Segments.BODY]: {
        introducedById: Joi.number().required(),
        resolutionNumber: Joi.number().required(),
        resolutionTitle: Joi.string().required(),
        meetingId: Joi.number().required(),
        introducedDate: Joi.date().optional(),
        passDate: Joi.date().optional(),
        content: Joi.string().default(''),
    },
})

export const resolutionCreate = async (req: express.Request, res: express.Response) => {
    const { introducedById, resolutionNumber, resolutionTitle, meetingId, introducedDate, passDate, content } = req.body
    const response = await prisma.resolution.create({
        data: {
            // @ts-ignore
            introducedById,
            resolutionNumber,
            resolutionTitle,
            meetingId,
            introducedDate: introducedDate || null,
            passDate: passDate || null,
            content,
        },
    })
    return res.send(response).status(201)
}

export const getMeetingResolutions = async (req: express.Request, res: express.Response) => {
    const resources = (await prisma.resolution.findMany({
        where: {
            meetingId: Number(req.params.meetingId)
        },
        include: {
            meeting: true,
            introducedBy: true,
            ayeVote: true,
            nayVote: true,
            fromMotion: true,
        },
    }))
    return res.send(resources).status(200)
}
