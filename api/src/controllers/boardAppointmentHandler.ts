import * as express from 'express'
import {celebrate, Joi, Segments} from 'celebrate'
import prisma from '../prisma'

export const boardAppointmentValidation = celebrate({
    [Segments.BODY]: {
        appointee: Joi.string().required(),
        meetingId: Joi.number().required(),
        referredById: Joi.number().optional().allow(null),
        appointedTo: Joi.string().default('').allow(null),
        expiration: Joi.date().optional().allow(null),
    },
})

export const boardAppointmentCreate = async (req: express.Request, res: express.Response) => {
    const { appointee, appointedTo, meetingId, referredById, expiration } = req.body
    const response = await prisma.boardAppointment.create({
        data: {
            // @ts-ignore
            appointee,
            meetingId,
            referredById,
            appointedTo,
            expiration,
        },
    })
    return res.send(response).status(201)
}

export const getMeetingBoardAppointments = async (req: express.Request, res: express.Response) => {
    const resources = (await prisma.boardAppointment.findMany({
        where: {
            meetingId: Number(req.params.meetingId)
        },
        include: {
            meeting: true,
            referredBy: true,
            motion: true,
        },
    }))
    return res.send(resources).status(200)
}

export const getAllBoardAppointments = async (req: express.Request, res: express.Response) => {
    const resources = (await prisma.boardAppointment.findMany({
        include: {
            meeting: true,
            referredBy: true,
            motion: true,
        },
    }))
    return res.send(resources).status(200)
}
