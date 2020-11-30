import { Router} from 'express'
import SessionsController from '../app/controllers/SessionsController'

const sessionsRoutes = Router()

sessionsRoutes.post('/', async (request,response)=>{
    try{
        const {email,password} = request.body

        const sessionsController= new SessionsController();
        const user = await sessionsController.store({email,password})

        return response.json(user)
    }
    catch(erro){
        return response.status(400).json({error:erro.message})
    }
})

export default sessionsRoutes;