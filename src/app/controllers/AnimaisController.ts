import {getRepository, getConnection, DeepPartial} from 'typeorm';
import Animal from '../models/Animais';
import Endereco from '../models/Endereco';
import Usuarios from '../models/Usuarios';


interface Request {
    nome: string,
    raca: string,
    peso: string,
    idade: number,
    usuario_criador_id: string
}
interface RequestAtualizar {
    id: string,
    nome: string,
    raca: string,
    peso: string,
    idade: number,
    usuario_criador_id: string
}
interface RequestAdotar {
    usuario_adotante_id: string,
    animal_id: string,
}
interface RequestAprovar {
    usuario_criador_id: string,
    animal_id: string,
}
interface RequestListas {
    usuario_id: string,
}
interface RequestListaId {
    id: string,
}
class AnimaisController {
    public async salvar({nome, raca, peso, idade, usuario_criador_id}:Request): Promise<Animal>{
        const animaisRepository = getRepository(Animal);
        
        const endereco = await getConnection().createQueryBuilder()
            .select("endereco")
            .from(Endereco, "endereco")
            .where("endereco.usuario_id = :id and ativo = true", { id: usuario_criador_id })
            .getOne();
        
        const animal = animaisRepository.create({nome, raca, peso, idade, cidade: endereco!.cidade, usuario_criador_id});
        await animaisRepository.save(animal);
        return animal;
    }
    public async atualizar({id, nome, raca, peso, idade, usuario_criador_id}:RequestAtualizar): Promise<Animal>{
        const animaisRepository = getRepository(Animal);
        
        const verificaAnimal = await getConnection().createQueryBuilder()
            .select("animal")
            .from(Animal, "animal")
            .where("animal.usuario_criador_id = :user_id and id = :id and animal.aceitoCriador = false", { user_id: usuario_criador_id, id: id })
            .getOne();
        if (!verificaAnimal){
            throw new Error("O animal não foi cadastrado por você ou ele já foi adotado!")
        }
        const animal = animaisRepository.save({id, nome, raca, peso, idade});
        
        return animal;
    }

    public async lista_de_aprovacao({usuario_id}:RequestListas): Promise<Animal[]>{
        const animaisParaAprovar = await getConnection().createQueryBuilder()
            .select("animal")
            .from(Animal, "animal").innerJoinAndSelect("animal.usuario_adotante","usuarios")
            .where("animal.usuario_criador_id = :id and animal.aceitoCriador = false and animal.usuario_adotante_id is not null", { id: usuario_id })
            .getMany();
        
        
        return animaisParaAprovar;
    }

    public async minha_lista({usuario_id}:RequestListas): Promise<Animal[]>{
        const animaisParaAprovar = await getConnection().createQueryBuilder()
            .select("animal")
            .from(Animal, "animal")
            .where("animal.usuario_adotante_id = :id", { id: usuario_id })
            .getMany();
        
        
        return animaisParaAprovar;
    }

    public async lista_de_pets({usuario_id}:RequestListas): Promise<Animal[]>{
        const animaisParaAdotar = await getConnection().createQueryBuilder()
            .select("animal")
            .from(Animal, "animal").innerJoinAndSelect("animal.usuario_criador","usuarios")
            .where("animal.usuario_criador_id != :id and animal.usuario_adotante_id is null", { id: usuario_id })
            .getMany();
        
        return animaisParaAdotar;
    }

    public async adotar({usuario_adotante_id, animal_id}:RequestAdotar): Promise<Animal>{
        const animalRepository = getRepository(Animal);

        const verificaAnimal = await animalRepository.findOne({where: {usuario_criador_id:usuario_adotante_id, id:animal_id}});

        if (verificaAnimal){
            throw new Error("O animal foi cadastrado por você, portanto não pode adotá-lo!")
        }
        
        return animalRepository.save({
            id: animal_id,
            usuario_adotante_id
        });
        
    }
    
    public async aprovar({usuario_criador_id, animal_id}:RequestAprovar): Promise<Animal>{
        const animalRepository = getRepository(Animal);

        const verificaAnimal = await animalRepository.findOne({where: {usuario_criador_id:usuario_criador_id, id:animal_id}});

        if (!verificaAnimal){
            throw new Error("O animal não foi adicionado por você!")
        }
        
        return animalRepository.save({
            id: animal_id,
            aceitoCriador:true
        });
    }
    
    public async recusar({usuario_criador_id, animal_id}:RequestAprovar): Promise<void>{
        const animalRepository = getRepository(Animal);

        const verificaAnimal = await animalRepository.findOne({where: {usuario_criador_id, id:animal_id}});

        if (!verificaAnimal){
            throw new Error("O animal não foi adicionado por você!"+usuario_criador_id)
        }
        
        await getConnection()
            .createQueryBuilder()
            .update(Animal)
            .set({ usuario_adotante_id: null})
            .where("id = :id", { id: animal_id })
            .execute();

    }
    public async listar_todos(): Promise<Animal[]>{
        return await getConnection().createQueryBuilder()
            .select("animal")
            .from(Animal, "animal").innerJoinAndSelect("animal.usuario_criador","usuarios")
            .where("animal.usuario_adotante_id is null")
            .getMany();
    }
    public async deletar({id}:RequestListaId): Promise<void>{
        const animalRepository = getRepository(Animal);
        await animalRepository.delete(id);
    }

    public async listar_cadastrados({usuario_id}:RequestListas): Promise<Animal[]>{
        return await getConnection().createQueryBuilder()
            .select("animal")
            .from(Animal, "animal")
            .where("animal.usuario_criador_id = :id ", { id: usuario_id })
            .getMany();
    }
    public async lista_por_id({id}:RequestListaId): Promise<Animal | undefined>{
        return await getConnection().createQueryBuilder()
            .select("animal")
            .from(Animal, "animal")
            .where("animal.id = :id ", { id: id })
            .getOne();
    }
}

export default AnimaisController;