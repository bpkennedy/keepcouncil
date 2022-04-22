import * as express from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import prisma from '../prisma'

export const hearingFromCitizenValidation = celebrate({
    [Segments.BODY]: {
        from: Joi.string().default(''),
        meetingId: Joi.number().required(),
        content: Joi.string().default(''),
    },
})

export const hearingFromCitizenCreate = async (req: express.Request, res: express.Response) => {
    const { from, content, meetingId } = req.body
    const response = await prisma.hearingFromCitizen.create({
        data: {
            // @ts-ignore
            from,
            meetingId,
            content,
        },
    })
    return res.send(response).status(201)
}

export const getMeetingHearingFromCitizens = async (req: express.Request, res: express.Response) => {
    const resources = (await prisma.hearingFromCitizen.findMany({
        where: {
            meetingId: Number(req.params.meetingId)
        },
        include: {
            meeting: true,
            fromMotion: true,
        },
    }))
    return res.send(resources).status(200)
}
