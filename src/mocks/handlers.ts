import { rest } from 'msw'
import {API_URL} from '../app/constants'
import mockQuotes from './mockQuotes'

export const handlers = [

   rest.get(API_URL, (req, res, ctx) => {
    const quoteToSearch =  req.url.searchParams.get("character") ? mockQuotes.withcharacterQuote : mockQuotes.randonQuote; 
        return res(
            ctx.status(200), ctx.json([quoteToSearch])
           )
    }),
  ];

