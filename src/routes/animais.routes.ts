import { Router} from 'express'
import AnimaisController from '../app/controllers/AnimaisController'
import ensureAutenticated from '../middlewares/ensureAutenticated'

const animaisRoutes = Router()

animaisRoutes.get('/', async (request,response)=>{
    try{
        const animaisController = new AnimaisController();
        const animal = await animaisController.listar_todos()

        return response.json(animal)
    }
    catch(erro){
        return response.status(400).json({error:erro.message})
    }
});


animaisRoutes.use(ensureAutenticated)

animaisRoutes.get('/:id', async (request,response)=>{
    try{
        const animaisController = new AnimaisController();
        const { id } = request.params;
        const animal = await animaisController.lista_por_id({id})

        return response.json(animal)
    }
    catch(erro){
        return response.status(400).json({error:erro.message})
    }
});

animaisRoutes.post('/', async (request,response)=>{
    try{
        const {nome, raca, peso, idade} = request.body
        
        const animaisController = new AnimaisController();
        const animal = await animaisController.salvar({nome, raca, peso, idade, usuario_criador_id: request.user.id})

        return response.json(animal)
    }
    catch(erro){
        return response.status(400).json({error:erro.message})
    }
});
animaisRoutes.delete('/:id', async (request,response)=>{
    try{
        const animaisController = new AnimaisController();
        const { id } = request.params;
        await animaisController.deletar({id})

        return response.send()
    }
    catch(erro){
        return response.status(400).json({error:erro.message})
    }
});
animaisRoutes.post('/update', async (request,response)=>{
    try{
        const {id, nome, raca, peso, idade} = request.body
        
        const animaisController = new AnimaisController();
        const animal = await animaisController.atualizar({id, nome, raca, peso, idade, usuario_criador_id: request.user.id})

        return response.json(animal)
    }
    catch(erro){
        return response.status(400).json({error:erro.message})
    }
});
animaisRoutes.post('/adotar', async (request,response)=>{
    try{
        const {id} = request.body
        
        const animaisController = new AnimaisController();
        const animal = await animaisController.adotar({usuario_adotante_id: request.user.id, animal_id: id})

        return response.json(animal)
    }
    catch(erro){
        return response.status(400).json({error:erro.message})
    }
});

animaisRoutes.post('/aprovar', async (request,response)=>{
    try{
        const {id} = request.body
        
        const animaisController = new AnimaisController();
        const animal = await animaisController.aprovar({usuario_criador_id: request.user.id, animal_id: id})

        return response.json(animal)
    }
    catch(erro){
        return response.status(400).json({error:erro.message})
    }
});

animaisRoutes.post('/recusar', async (request,response)=>{
    try{
        const {id} = request.body
        
        const animaisController = new AnimaisController();
        const animal = await animaisController.recusar({usuario_criador_id: request.user.id, animal_id: id})

        return response.json(animal)
    }
    catch(erro){
        return response.status(400).json({error:erro.message})
    }
});

animaisRoutes.get('/lista/adotar', async (request,response)=>{
    try{
        const animaisController = new AnimaisController();
        const animal = await animaisController.lista_de_pets({usuario_id: request.user.id})

        return response.json(animal)
    }
    catch(erro){
        return response.status(400).json({error:erro.message})
    }
});

animaisRoutes.get('/lista/aprovar', async (request,response)=>{
    try{
        const animaisController = new AnimaisController();
        const animal = await animaisController.lista_de_aprovacao({usuario_id: request.user.id})

        return response.json(animal)
    }
    catch(erro){
        return response.status(400).json({error:erro.message})
    }
});

animaisRoutes.get('/lista/adotados', async (request,response)=>{
    try{
        const animaisController = new AnimaisController();
        const animal = await animaisController.minha_lista({usuario_id: request.user.id})

        return response.json(animal)
    }
    catch(erro){
        return response.status(400).json({error:erro.message})
    }
});
animaisRoutes.get('/lista/criados', async (request,response)=>{
    try{
        const animaisController = new AnimaisController();
        const animal = await animaisController.listar_cadastrados({usuario_id: request.user.id})

        return response.json(animal)
    }
    catch(erro){
        return response.status(400).json({error:erro.message})
    }
});
export default animaisRoutes;