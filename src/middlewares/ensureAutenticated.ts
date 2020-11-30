import {Request, Response, NextFunction} from 'express'
import { verify } from 'jsonwebtoken'
import authConfig from '../config/auth'

interface TokenPayload{
    iat: number,
    exp: number,
    sub: string
}
export default function ensureAutentication(request: Request,response:Response, next:NextFunction):void{
    try {
        const authHeader = request.headers.authorization
        if (!authHeader){
            throw new Error("Autenticação necessária!")
        }
        const [bearer,token] = authHeader.split(' ')
        const decoded = verify(token,authConfig.jwt.secret)
        const {sub} = decoded as TokenPayload
        request.user = {id:sub}
        return next()
    }
    catch{
        throw new Error('Token inválido')
    }
    

}