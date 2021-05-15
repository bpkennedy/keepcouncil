import * as server from './src/server'
import { apiLogger } from './src/services/logger'

process.on('uncaughtException', (err: Error) => {
    apiLogger.error('Uncaught exception', err)
    throw err
})

process.on('unhandledRejection', (err: Error) => {
    apiLogger.error('Unhandled rejection', err)
})

server.start()
