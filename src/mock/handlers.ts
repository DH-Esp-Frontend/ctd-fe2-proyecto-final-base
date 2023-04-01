import {rest} from 'msw';
import { API_URL } from '../app/constants';
//import {results} from './results';

const quoteRandom = [{
"quote": "Me fail English? That's unpossible.",
        "character": "Ralph Wiggum",
        "image": "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FRalphWiggum.png?1497567511523",
        "characterDirection": "Left"
}]
        
    const quoteCharacter =[{
         "quote": "I can't even say the word 'titmouse' without gigggling like a schoolgirl.",
                "character": "Homer Simpson",
                "image": "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FHomerSimpson.png?1497567511939",
                "characterDirection": "Right"
            }]
     
            
export const handlers = [
    rest.get(API_URL, (req, res, ctx) => {
     if(req.url.searchParams.get('character')){
        return res(
            ctx.status (200),
            ctx.json(quoteCharacter)
        )
     }
     return res(
        ctx.status(200),
        ctx.json(quoteRandom)
     )          
            })
]