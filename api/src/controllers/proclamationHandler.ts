import * as express from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import prisma from '../prisma'

export const proclamationValidation = celebrate({
    [Segments.BODY]: {
        presentedTo: Joi.string().required(),
        meetingId: Joi.number().required(),
        content: Joi.string().default(''),
    },
})

export const proclamationCreate = async (req: express.Request, res: express.Response) => {
    const { presentedTo, content, meetingId } = req.body
    const response = await prisma.proclamation.create({
        data: {
            // @ts-ignore
            presentedTo,
            meetingId,
            content,
        },
    })
    return res.send(response).status(201)
}
