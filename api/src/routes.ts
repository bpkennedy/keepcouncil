import * as express from 'express'
import asyncHandler from 'express-async-handler'
import { errorHandler } from './services/errors'

export const routes = () => {
    const router = express.Router()

    router.get('/test', asyncHandler(async (req, res) => {
        res.send('Working!')
    }))

    router.use(errorHandler)
    return router
}
