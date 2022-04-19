import * as express from 'express'
import asyncHandler from 'express-async-handler'
import { debugMatchHandler, debugMatchValidation } from './controllers/simulation'
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

    router.get('/test', asyncHandler(async (req, res) => {
        res.send('Working!')
    }))

    // @ts-ignore
    router.get('/debugmatch', debugMatchValidation, asyncHandler(debugMatchHandler))

    router.get('/preview', pdfValidation, asyncHandler(pdfPreviewHandler))

    // @ts-ignore
    router.post('/meeting', meetingValidation, asyncHandler(meetingHandler))
    // @ts-ignore
    router.get('/meeting/:meetingId', oneMeetingValidation, asyncHandler(getOneMeetingHandler))

    for (const itemType of AGENDA_ITEM_TYPES) {
        router.get(`/${itemType.value}`, asyncHandler(async (req: express.Request, res: express.Response) => {
            // @ts-ignore
            const resources = (await prisma[`${itemType.value}`].findMany())
            res.send(resources).status(200)
        }))
    }

    router.use(errorHandler)
    return router
}
