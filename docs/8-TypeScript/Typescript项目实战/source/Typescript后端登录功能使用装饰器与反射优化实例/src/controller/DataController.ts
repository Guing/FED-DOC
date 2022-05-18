import { Request, Response } from 'express'
import { getResponseData, checkLogin } from '../utils/index'
import { get, use, controller } from '../decorator/'
import * as Data from '../utils/data.json'

@controller('/')
export class DataController {

    @get('/showData')
    @use(checkLogin)
    router(req: Request, res: Response) {

        res.json(getResponseData(Data))

    }
}

