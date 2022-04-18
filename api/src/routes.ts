import * as express from 'express'
import asyncHandler from 'express-async-handler'
import { debugMatchHandler, debugMatchValidation } from './controllers/simulation'
import { errorHandler } from './services/errors'
import { pdfPreviewHandler, pdfValidation } from './controllers/pdfPreviewHandler'
import {
    meetingHandler,
    meetingValidation,
    getMeetingsHandler,
    getOneMeetingHandler,
    oneMeetingValidation
} from './controllers/meetingHandler'

export const routes = () => {
    const router = express.Router()

    router.get('/test', asyncHandler(async (req, res) => {
        res.send('Working!')
    }))

    // @ts-ignore
    router.get('/debugmatch', debugMatchValidation, asyncHandler(debugMatchHandler))

    router.get('/preview', pdfValidation, asyncHandler(pdfPreviewHandler))

    // @ts-ignore
    router.post('/meetings', meetingValidation, asyncHandler(meetingHandler))
    // @ts-ignore
    router.get('/meetings', asyncHandler(getMeetingsHandler))
    // @ts-ignore
    router.get('/meeting/:meetingId', oneMeetingValidation, asyncHandler(getOneMeetingHandler))

    router.use(errorHandler)
    return router
}
