import * as express from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import prisma from '../prisma'

export const billValidation = celebrate({
    [Segments.BODY]: {
        billNumber: Joi.number().required(),
        meetingId: Joi.number().required(),
        introducedById: Joi.number().required(),
        content: Joi.string().default('').allow(null),
        introducedDate: Joi.date().optional().allow(null),
        passDate: Joi.date().optional().allow(null),
        ordinance: Joi.string().default('').allow(null),
    },
})

export const billCreate = async (req: express.Request, res: express.Response) => {
    const { billNumber, content, meetingId, introducedById, introducedDate, passDate, ordinance } = req.body
    const response = await prisma.bill.create({
        data: {
            // @ts-ignore
            billNumber,
            meetingId,
            introducedById,
            content,
            introducedDate,
            passDate,
            ordinance,
        },
    })
    return res.send(response).status(201)
}

export const getMeetingBills = async (req: express.Request, res: express.Response) => {
    const resources = (await prisma.bill.findMany({
        where: {
            meetingId: Number(req.params.meetingId)
        },
        include: {
            meeting: true,
            ayeVote: true,
            nayVote: true,
            introducedBy: true,
            motion: true,
        },
    }))
    return res.send(resources).status(200)
}
