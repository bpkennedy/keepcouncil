import * as express from 'express'
import asyncHandler from 'express-async-handler'
import { debugMatchHandler, debugMatchValidation } from './controllers/simulation'
import { errorHandler } from './services/errors'

export const routes = () => {
    const router = express.Router()

    router.get('/test', asyncHandler(async (req, res) => {
        res.send('Working!')
    }))

    router.get('/debugmatch', debugMatchValidation, asyncHandler(debugMatchHandler))

    router.use(errorHandler)
    return router
}
