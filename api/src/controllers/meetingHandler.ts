import * as express from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import prisma from '../prisma'

export const meetingValidation = celebrate({
    [Segments.BODY]: {
        meetingName: Joi.string().required(),
        meetingDate: Joi.date().required(),
        meetingPreviewUrl: Joi.string().optional().default('')
    }
})

export const meetingHandler = async (req: express.Request, res: express.Response) => {
    const { meetingName, meetingDate, meetingPreviewUrl } = req.body
    const response = await prisma.meeting.create({
        data: {
            // @ts-ignore
            name: meetingName,
            date: meetingDate,
            previewUrl: meetingPreviewUrl,
        },
    })
    return res.send(response).status(201)
}

export const oneMeetingValidation = celebrate({
    [Segments.PARAMS]: {
        meetingId: Joi.number().required(),
    }
})

export const getOneMeetingHandler = async (req: express.Request, res: express.Response) => {
    const id = Number(req.params.meetingId)
    const meeting = await prisma.meeting.findUnique({
        where: {
            id,
        }
    })
    return res.send(meeting).status(200)
}
