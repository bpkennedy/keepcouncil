import * as express from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import prisma from '../prisma'

export const publicHearingValidation = celebrate({
    [Segments.BODY]: {
        from: Joi.string().required(),
        title: Joi.string().required(),
        meetingId: Joi.number().required(),
        topic: Joi.string().default(''),
        content: Joi.string().default(''),
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
