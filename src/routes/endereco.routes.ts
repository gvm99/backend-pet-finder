import { Router, Request} from 'express'
import EnderecoController from '../app/controllers/EnderecoController'
import ensureAutenticated from '../middlewares/ensureAutenticated'

const enderecoRoutes = Router()
enderecoRoutes.use(ensureAutenticated)

enderecoRoutes.post('/', async (request,response)=>{
    try{
        const {rua, numero, estado, bairro, cidade} = request.body

        const enderecosController= new EnderecoController();
        
        const endereco = await enderecosController.store({rua, numero, estado, bairro, cidade, usuario_id:request.user.id, ativo:false})

        return response.json(endereco)
    }
    catch(erro){
        return response.status(400).json({error:erro.message})
    }
})

enderecoRoutes.post('/principal', async (request,response)=>{
    try{
        const {enderecoId} = request.body
        
        const enderecosController = new EnderecoController();
        const enderecos = await enderecosController.updatePrincipal({userId:request.user.id, enderecoId});

        return response.json(enderecos);
    }
    catch(erro){
        return response.status(400).json({error:erro.message})
    }
})


export default enderecoRoutes;