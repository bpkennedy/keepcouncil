import * as express from 'express'
import asyncHandler from 'express-async-handler'
import { errorHandler } from './services/errors'
import { pdfPreviewHandler, pdfValidation } from './controllers/pdfPreviewHandler'
import {
    meetingHandler,
    meetingValidation,
    getOneMeetingHandler,
    oneMeetingValidation
} from './controllers/meetingHandler'
import { AGENDA_ITEM_TYPES } from './config/constants'
import prisma from './prisma'
import { billCreate, billValidation } from './controllers/billHandler'
import { allPersonsHandler } from './controllers/personHandler'
import {hearingFromCitizenCreate, hearingFromCitizenValidation} from './controllers/hearingFromCitizenHandler'
import {proclamationCreate, proclamationValidation} from './controllers/proclamationHandler'
import {communicationCreate, communicationValidation} from './controllers/communicationHandler'
import {publicHearingCreate, publicHearingValidation} from './controllers/publicHearingHandler'
import {boardAppointmentCreate, boardAppointmentValidation} from './controllers/boardAppointmentHandler'
import {announcementCreate, announcementValidation} from './controllers/announcementHandler'

export const routes = () => {
    const router = express.Router()

    router.get('/preview', pdfValidation, asyncHandler(pdfPreviewHandler))

    // @ts-ignore
    router.post('/meeting', meetingValidation, asyncHandler(meetingHandler))
    // @ts-ignore
    router.get('/meeting', asyncHandler(async (req: express.Request, res: express.Response) => {
        // @ts-ignore
        const resources = (await prisma.meeting.findMany())
        res.send(resources).status(200)
    }))

    // @ts-ignore
    router.get('/meeting/:meetingId', oneMeetingValidation, asyncHandler(getOneMeetingHandler))

    for (const itemType of AGENDA_ITEM_TYPES.filter(ai => !['person', 'meeting'].includes(ai.value))) {
        router.get(`/${itemType.value}/meeting/:meetingId`, asyncHandler(async (req: express.Request, res: express.Response) => {
            // @ts-ignore
            const resources = (await prisma[`${itemType.value}`].findMany({
                where: {
                    meetingId: Number(req.params.meetingId)
                }
            }))
            res.send(resources).status(200)
        }))
    }

    // @ts-ignore
    router.post('/bill', billValidation, asyncHandler(billCreate))
    // @ts-ignore
    router.post('/hearingFromCitizen', hearingFromCitizenValidation, asyncHandler(hearingFromCitizenCreate))
    // @ts-ignore
    router.post('/proclamation', proclamationValidation, asyncHandler(proclamationCreate))
    // @ts-ignore
    router.post('/communication', communicationValidation, asyncHandler(communicationCreate))
    // @ts-ignore
    router.post('/publicHearing', publicHearingValidation, asyncHandler(publicHearingCreate))
    // @ts-ignore
    router.post('/boardAppointment', boardAppointmentValidation, asyncHandler(boardAppointmentCreate))
    // @ts-ignore
    router.post('/announcement', announcementValidation, asyncHandler(announcementCreate))

    // @ts-ignore
    router.get('/person', asyncHandler(allPersonsHandler))


    router.use(errorHandler)
    return router
}
