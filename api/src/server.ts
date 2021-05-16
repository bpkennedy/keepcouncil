import { apiLogger } from './services/logger'
import express from 'express'
import http from 'http'
import {createHttpTerminator} from 'http-terminator'
import compression from 'compression'
import * as bodyParser from 'body-parser'
import cors from 'cors'
import { errors } from 'celebrate'
import { routes } from './routes'

let httpTerminator: any

export async function start(appPort: number = 3001, options: any = { debug: false }) {
    if (options.debug) {
        process.env.NODE_ENV = 'development'
    }

    const app: any = express()
    app.use(cors())
    app.use(bodyParser.json())
    app.use(compression())

    app.use('/api/v1/', routes())

    app.use(errors())

    const server = http.createServer(app)

    server.listen(appPort)
    httpTerminator = createHttpTerminator({
        gracefulTerminationTimeout: 4000,
        server
    })
    apiLogger.info('Connection', `Server running at: ${appPort}`)
}

export async function stop() {
    return httpTerminator.terminate()
}
