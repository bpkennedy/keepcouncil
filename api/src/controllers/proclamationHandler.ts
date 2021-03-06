import * as express from 'express'
import {celebrate, Joi, Segments} from 'celebrate'
import prisma from '../prisma'

export const proclamationValidation = celebrate({
    [Segments.BODY]: {
        presentedTo: Joi.string().default('').allow(null),
        meetingId: Joi.number().required(),
        content: Joi.string().default('').allow(null),
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

export const getMeetingProclamations = async (req: express.Request, res: express.Response) => {
    const resources = (await prisma.proclamation.findMany({
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

export const getAllProclamations = async (req: express.Request, res: express.Response) => {
    const resources = (await prisma.proclamation.findMany({
        include: {
            meeting: true,
            motion: true,
        },
    }))
    return res.send(resources).status(200)
}

