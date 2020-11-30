import { Router} from 'express'
import usuariosRoutes from './usuarios.routes'
import enderecoRoutes from './endereco.routes'
import animaisRoutes from './animais.routes'
import sessionsRoutes from './session.routes'
const routes = Router()


routes.use('/usuarios',usuariosRoutes)
routes.use('/enderecos',enderecoRoutes)
routes.use('/animais',animaisRoutes)
routes.use('/session',sessionsRoutes)


export default routes;