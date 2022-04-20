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

    // router.get(`/person/meeting/:meetingId`, asyncHandler(async (req: express.Request, res: express.Response) => {
    //     // @ts-ignore
    //     const resources = (await prisma[`${itemType.value}`].findMany())
    //     res.send(resources).status(200)
    // }))


    router.use(errorHandler)
    return router
}
