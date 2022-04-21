import * as express from 'express'
import prisma from '../prisma'

export const allPersonsHandler = async (req: express.Request, res: express.Response) => {
    // @ts-ignore
    const resources = (await prisma.person.findMany())
    return res.send(resources).status(200)
}
