import { rest } from 'msw'
import {API_URL} from '../app/constants'

export const handlers = [

    rest.get(API_URL, (req, res, ctx) => {
        return res(
            ctx.status(200)
           )
    }),
  ]