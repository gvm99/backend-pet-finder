import { Router} from 'express'
import UsuariosController from '../app/controllers/UsuariosController'
import ensureAutenticated from '../middlewares/ensureAutenticated'
import EnderecoController from '../app/controllers/EnderecoController'

const usuariosRoutes = Router()

usuariosRoutes.post('/', async (request,response)=>{
    try{
        const {nome, email, password, rua, numero, estado, bairro, cidade} = request.body

        const usuariosController= new UsuariosController();
        
        const user = await usuariosController.store({nome, email, password})
        user.password = ""

        const enderecosController= new EnderecoController();
        const endereco = await enderecosController.store({rua, numero, estado, bairro, cidade, usuario_id: user.id, ativo:true})

        return response.json(user)
    }
    catch(erro){
        return response.status(400).json({error:erro.message})
    }
})

usuariosRoutes.use(ensureAutenticated)
usuariosRoutes.get('/', async (request,response)=>{
    try{
        const usuariosController= new UsuariosController();
        const user = await usuariosController.find({id:request.user.id})
        user!.password = ""
        return response.json(user)
    }
    catch(erro){
        return response.status(400).json({error:erro.message})
    }
})

export default usuariosRoutes;