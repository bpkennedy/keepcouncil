import {ApiError} from './ApiError'

function formatLogString(...args: any) {
    let log = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
    for (const arg of args) {
        log += (' :: ' + JSON.parse(JSON.stringify(arg)))
    }
    return log
}

function logMessage(level: string, title = '', errorObject: ApiError) {
    console.log(formatLogString(level, title, errorObject))
}

interface Logger {
    info: any
    debug: any
    warn: any
    error: any
}

export const apiLogger: Logger = {
  info: (title: string, errorObject: ApiError) => logMessage('info', title, errorObject),
  debug: (title: string, errorObject: ApiError) => logMessage('debug', title, errorObject),
  warn: (title: string, errorObject: ApiError) => logMessage('warn', title, errorObject),
  error: (title: string, errorObject: ApiError) => logMessage('error', title, errorObject),
}
