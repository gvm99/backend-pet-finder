import {getRepository} from 'typeorm';
import Endereco from '../models/Endereco';


interface Request {
    rua: string,
    numero: string,
    estado: string,
    bairro: string,
    cidade: string,
    usuario_id: string,
    ativo: boolean
}
interface RequestUpdate {
    userId: string,
    enderecoId: string
}
class EnderecoController {
    public async store({rua, numero, estado, bairro, cidade, usuario_id, ativo}:Request): Promise<Endereco>{
        const enderecoRepository = getRepository(Endereco);

        const endereco = enderecoRepository.create({rua, numero, estado, cidade, bairro, usuario_id, ativo});
        await enderecoRepository.save(endereco);
        return endereco;
    }
    
    public async updatePrincipal({userId, enderecoId}:RequestUpdate): Promise<Endereco>{
        const enderecoRepository = getRepository(Endereco);

        await enderecoRepository.createQueryBuilder().update(Endereco).set(
            {
                ativo : false
            }
        ).where(
            "id != :id and usuario_id = :userId ",{id:enderecoId, userId: userId})
        .execute();
        
        return enderecoRepository.save({
            id: enderecoId,
            ativo: true
        });
    }
}

export default EnderecoController;