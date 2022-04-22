import * as express from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import prisma from '../prisma'

export const billValidation = celebrate({
    [Segments.BODY]: {
        billNumber: Joi.number().required(),
        meetingId: Joi.number().required(),
        introducedById: Joi.number().required(),
        content: Joi.string().default(''),
        introducedDate: Joi.date().optional(),
        passDate: Joi.date().optional(),
        ordinance: Joi.string().default(''),
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
            introducedDate: introducedDate || null,
            passDate: passDate || null,
            ordinance,
        },
    })
    return res.send(response).status(201)
}
