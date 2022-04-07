import * as express from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import Axios from 'axios'
import { createWriteStream } from 'fs'
// import prisma from '../prisma'

const downloadsDirectory = `${process.cwd()}/tempfiles`

export const pdfValidation = celebrate({
    [Segments.QUERY]: {
        pdfUrl: Joi.string().required()
    }
})

export const pdfPreviewHandler = async (req: express.Request, res: express.Response) => {
    const url = req.query.pdfUrl as string
    const downloadLocation = downloadsDirectory + '/file.pdf'
    await downloadFile(url, downloadLocation)
    return res.status(200).sendFile(downloadLocation)
}

export async function downloadFile(fileUrl: string, outputLocationPath: string) {
    const writer = createWriteStream(outputLocationPath);

    return Axios({
        method: 'get',
        url: fileUrl,
        responseType: 'stream',
    }).then(response => {

        //ensure that the user can call `then()` only when the file has
        //been downloaded entirely.

        return new Promise((resolve, reject) => {
            response.data.pipe(writer)
            let error: any = null
            writer.on('error', err => {
                error = err
                writer.close()
                reject(err)
            })
            writer.on('close', () => {
                if (!error) {
                    resolve(true)
                }
                //no need to call the reject here, as it will have been called in the
                //'error' stream;
            })
        })
    })
}
