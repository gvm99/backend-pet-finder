import {getRepository} from 'typeorm';
import {compare} from 'bcryptjs'
import Usuarios from '../models/Usuarios';
import {sign} from 'jsonwebtoken';

interface Request {
    email: string,
    password: string
}
class SessionsController {
    public async store({email,password}:Request): Promise<{user: Usuarios, token:string}>{
        const SessionsRepository = getRepository(Usuarios);

        const user = await SessionsRepository.findOne({where:{email}});

        if (!user){
            throw new Error("Usuário não existe!")
        }
        const senhaCorreta = await compare(password, user.password)
        if (!senhaCorreta){
            throw new Error("Senha incorreta")
        }
        
        const token = sign({},'79cfeb94595de33b3326c06ab1c7dbda',{
            subject:user.id,
            expiresIn: '1d'
        })
        return { user, token};
    }
}

export default SessionsController;