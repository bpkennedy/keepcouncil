import * as express from 'express'
import {apiLogger} from './logger'
import {ApiError} from './ApiError'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: ApiError, req: express.Request, res: express.Response, next: express.NextFunction) {
    apiLogger.error('Catch-All Router Error: ', err)
    res.status(err.status || 500).send(err.message)
}
