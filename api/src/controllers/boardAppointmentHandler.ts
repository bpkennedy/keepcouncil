import * as express from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import prisma from '../prisma'

export const boardAppointmentValidation = celebrate({
    [Segments.BODY]: {
        appointee: Joi.string().required(),
        meetingId: Joi.number().required(),
        referredById: Joi.number().optional(),
        appointedTo: Joi.string().default(''),
        expiration: Joi.date().optional(),
    },
})

export const boardAppointmentCreate = async (req: express.Request, res: express.Response) => {
    const { appointee, appointedTo, meetingId, referredById, expiration } = req.body
    const response = await prisma.boardAppointment.create({
        data: {
            // @ts-ignore
            appointee,
            meetingId,
            referredById: referredById || null,
            appointedTo,
            expiration: expiration || new Date(),
        },
    })
    return res.send(response).status(201)
}
