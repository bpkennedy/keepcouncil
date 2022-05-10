import * as express from 'express'
import asyncHandler from 'express-async-handler'
import {errorHandler} from './services/errors'
import {pdfPreviewHandler, pdfValidation} from './controllers/pdfPreviewHandler'
import {
    getAllMeetings,
    getOneMeetingHandler,
    meetingHandler,
    meetingValidation,
    oneMeetingValidation
} from './controllers/meetingHandler'
import {billCreate, billValidation, getAllBills, getMeetingBills} from './controllers/billHandler'
import {allPersonsHandler} from './controllers/personHandler'
import {
    getAllHearingFromCitizens,
    getMeetingHearingFromCitizens,
    hearingFromCitizenCreate,
    hearingFromCitizenValidation
} from './controllers/hearingFromCitizenHandler'
import {
    getAllProclamations,
    getMeetingProclamations,
    proclamationCreate,
    proclamationValidation
} from './controllers/proclamationHandler'
import {
    communicationCreate,
    communicationValidation,
    getAllCommunications,
    getMeetingCommunications
} from './controllers/communicationHandler'
import {
    getAllPublicHearings,
    getMeetingPublicHearings,
    publicHearingCreate,
    publicHearingValidation
} from './controllers/publicHearingHandler'
import {
    boardAppointmentCreate,
    boardAppointmentValidation,
    getAllBoardAppointments,
    getMeetingBoardAppointments
} from './controllers/boardAppointmentHandler'
import {
    announcementCreate,
    announcementValidation,
    getAllAnnouncements,
    getMeetingAnnouncements
} from './controllers/announcementHandler'
import {
    getAllResolutions,
    getMeetingResolutions,
    resolutionCreate,
    resolutionValidation
} from './controllers/resolutionHandler'
import {getAllRequests, getMeetingRequests, requestCreate, requestValidation} from './controllers/requestHandler'
import {getMeetingMotions, motionHandler, motionValidation} from './controllers/motionHandler'

export const routes = () => {
    const router = express.Router()
    //
    // PDF PREVIEWS
    //

    router.get('/preview', pdfValidation, asyncHandler(pdfPreviewHandler))

    //
    // MEETINGS
    //

    // @ts-ignore
    router.post('/meeting', meetingValidation, asyncHandler(meetingHandler))
    // @ts-ignore
    router.get('/meeting', asyncHandler(getAllMeetings))
    // @ts-ignore
    router.get('/meeting/:meetingId', oneMeetingValidation, asyncHandler(getOneMeetingHandler))

    //
    // PEOPLE
    //

    // @ts-ignore
    router.get('/person', asyncHandler(allPersonsHandler))

    //
    // MOTIONS
    //

    // @ts-ignore
    router.post('/motion', motionValidation, asyncHandler(motionHandler))
    // @ts-ignore
    router.get('/motion/meeting/:meetingId', oneMeetingValidation, asyncHandler(getMeetingMotions))

    //
    // GENERIC RESOURCES
    //

    // @ts-ignore
    router.post('/bill', billValidation, asyncHandler(billCreate))
    // @ts-ignore
    router.get('/bill/meeting/:meetingId', oneMeetingValidation, asyncHandler(getMeetingBills))
    // @ts-ignore
    router.get('/bill', asyncHandler(getAllBills))

    // @ts-ignore
    router.post('/hearingFromCitizen', hearingFromCitizenValidation, asyncHandler(hearingFromCitizenCreate))
    // @ts-ignore
    router.get('/hearingFromCitizen/meeting/:meetingId', oneMeetingValidation, asyncHandler(getMeetingHearingFromCitizens))
    // @ts-ignore
    router.get('/hearingFromCitizen', asyncHandler(getAllHearingFromCitizens))

    // @ts-ignore
    router.post('/proclamation', proclamationValidation, asyncHandler(proclamationCreate))
    // @ts-ignore
    router.get('/proclamation/meeting/:meetingId', oneMeetingValidation, asyncHandler(getMeetingProclamations))
    // @ts-ignore
    router.get('/proclamation', asyncHandler(getAllProclamations))

    // @ts-ignore
    router.post('/resolution', resolutionValidation, asyncHandler(resolutionCreate))
    // @ts-ignore
    router.get('/resolution/meeting/:meetingId', oneMeetingValidation, asyncHandler(getMeetingResolutions))
    // @ts-ignore
    router.get('/resolution', asyncHandler(getAllResolutions))

    // @ts-ignore
    router.post('/communication', communicationValidation, asyncHandler(communicationCreate))
    // @ts-ignore
    router.get('/communication/meeting/:meetingId', oneMeetingValidation, asyncHandler(getMeetingCommunications))
    // @ts-ignore
    router.get('/communication', asyncHandler(getAllCommunications))

    // @ts-ignore
    router.post('/publicHearing', publicHearingValidation, asyncHandler(publicHearingCreate))
    // @ts-ignore
    router.get('/publicHearing/meeting/:meetingId', oneMeetingValidation, asyncHandler(getMeetingPublicHearings))
    // @ts-ignore
    router.get('/publicHearing', asyncHandler(getAllPublicHearings))

    // @ts-ignore
    router.post('/boardAppointment', boardAppointmentValidation, asyncHandler(boardAppointmentCreate))
    // @ts-ignore
    router.get('/boardAppointment/meeting/:meetingId', oneMeetingValidation, asyncHandler(getMeetingBoardAppointments))
    // @ts-ignore
    router.get('/boardAppointment', asyncHandler(getAllBoardAppointments))

    // @ts-ignore
    router.post('/request', requestValidation, asyncHandler(requestCreate))
    // @ts-ignore
    router.get('/request/meeting/:meetingId', oneMeetingValidation, asyncHandler(getMeetingRequests))
    // @ts-ignore
    router.get('/request', asyncHandler(getAllRequests))

    // @ts-ignore
    router.post('/announcement', announcementValidation, asyncHandler(announcementCreate))
    // @ts-ignore
    router.get('/announcement/meeting/:meetingId', oneMeetingValidation, asyncHandler(getMeetingAnnouncements))
    // @ts-ignore
    router.get('/announcement', asyncHandler(getAllAnnouncements))

    router.use(errorHandler)
    return router
}
