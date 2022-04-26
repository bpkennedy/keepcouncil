import * as express from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import prisma from '../prisma'

const APPROVE_MINUTES_ENUM = 'APPROVE_MINUTES'
const ADJOURN_ENUM = 'ADJOURN'
const FIRST_READ_ENUM = 'FIRST_READ'
const SECOND_READ_ENUM = 'SECOND_READ'
const THIRD_READ_ENUM = 'THIRD_READ'
const REPORT_ENUM = 'REPORT'
const PRESENT_ENUM = 'PRESENT'
const ADD_BILL_ENUM = 'ADD_BILL'
const ANNOUNCE_ENUM = 'ANNOUNCE'
const APPOINT_ENUM = 'APPOINT'
const REAPPOINT_ENUM = 'REAPPOINT'
const ACCEPT_ENUM = 'ACCEPT'
const SUSPEND_ENUM = 'SUSPEND'
const POSTPONE_ENUM = 'POSTPONE'

export const motionValidation = celebrate({
    [Segments.BODY]: {
        meetingId: Joi.number().required(),
        carried: Joi.bool().required().default(false),
        action: Joi.string().valid(
            APPROVE_MINUTES_ENUM,
            ADJOURN_ENUM,
            FIRST_READ_ENUM,
            SECOND_READ_ENUM,
            THIRD_READ_ENUM,
            REPORT_ENUM,
            PRESENT_ENUM,
            ADD_BILL_ENUM,
            ANNOUNCE_ENUM,
            APPOINT_ENUM,
            REAPPOINT_ENUM,
            ACCEPT_ENUM,
            SUSPEND_ENUM,
            POSTPONE_ENUM,
        ).required(),
        initiatorId: Joi.number().required(),
        seconderId: Joi.number().optional().allow(null),
        hearingFromCitizenId: Joi.number().optional().allow(null),
        proclamationId: Joi.number().optional().allow(null),
        resolutionId: Joi.number().optional().allow(null),
        communicationId: Joi.number().optional().allow(null),
        publicHearingId: Joi.number().optional().allow(null),
        billId: Joi.number().optional().allow(null),
        boardAppointmentId: Joi.number().optional().allow(null),
        requestId: Joi.number().optional().allow(null),
        announcementId: Joi.number().optional().allow(null),
    }
})

export const motionHandler = async (req: express.Request, res: express.Response) => {
    const {
        meetingId,
        carried,
        action,
        initiatorId,
        seconderId,
        hearingFromCitizenId,
        proclamationId,
        resolutionId,
        communicationId,
        publicHearingId,
        billId,
        boardAppointmentId,
        requestId,
        announcementId,
    } = req.body
    const response = await prisma.motion.create({
        data: {
            // @ts-ignore
            meetingId,
            carried,
            action,
            initiatorId,
            seconderId,
            hearingFromCitizenId,
            proclamationId,
            resolutionId,
            communicationId,
            publicHearingId,
            billId,
            boardAppointmentId,
            requestId,
            announcementId,
        },
    })
    return res.send(response).status(201)
}

export const getMeetingMotions = async (req: express.Request, res: express.Response) => {
    const resources = (await prisma.motion.findMany({
        where: {
            meetingId: Number(req.params.meetingId)
        },
        include: {
            meeting: true,
            initiator: true,
            seconder: true,
            hearingFromCitizen: true,
            proclamation: true,
            resolution: true,
            communication: true,
            publicHearing: true,
            bill: true,
            boardAppointment: true,
            request: true,
            announcement: true,
        }
    }))
    return res.send(resources).status(200)
}
