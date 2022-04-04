import * as express from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
// import prisma from '../prisma'

export const debugMatchValidation = celebrate({
    [Segments.QUERY]: {
        gameId: Joi.string().required()
    }
})

export const debugMatchHandler = async (req: express.Request, res: express.Response) => {
    // const allGames = await prisma.game.findMany()
    return res.send(JSON.stringify([], null, 2))
}
