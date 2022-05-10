import * as express from 'express'
import {celebrate, Joi, Segments} from 'celebrate'
import prisma from '../prisma'

export const meetingValidation = celebrate({
    [Segments.BODY]: {
        meetingName: Joi.string().required(),
        meetingDate: Joi.date().required(),
        meetingPreviewUrl: Joi.string().default('').allow(null)
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
        },
        include: {
            attendees: true,
            motions: true,
            hearingFromCitizens: true,
            proclamations: true,
            resolutions: true,
            communications: true,
            publicHearings: true,
            bills: true,
            boardAppointments: true,
            requests: true,
            announcements: true,
        }
    })
    return res.send(meeting).status(200)
}

export const getAllMeetings = async (req: express.Request, res: express.Response) => {
    const resources = (await prisma.meeting.findMany({
        include: {
            attendees: true,
            motions: true,
            hearingFromCitizens: true,
            proclamations: true,
            resolutions: true,
            communications: true,
            publicHearings: true,
            bills: true,
            boardAppointments: true,
            requests: true,
            announcements: true,
        },
    }))
    return res.send(resources).status(200)
}
