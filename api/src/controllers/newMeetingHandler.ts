import * as express from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import prisma from '../prisma'

export const meetingValidation = celebrate({
    [Segments.BODY]: {
        meetingName: Joi.string().required(),
        meetingDate: Joi.date().required(),
    }
})

export const newMeetingHandler = async (req: express.Request, res: express.Response) => {
    const { meetingName, meetingDate } = req.body
    const response = await prisma.meeting.create({
        data: {
            // @ts-ignore
            name: meetingName,
            date: meetingDate,
        },
    })
    console.log(response)
    return res.send(JSON.stringify([], null, 2))
}
