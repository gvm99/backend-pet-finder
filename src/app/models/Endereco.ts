import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import Usuarios from './Usuarios';

@Entity('enderecos')
class Endereco {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    rua: string;

    @Column()
    numero: string;

    @Column()
    estado: string;
    
    @Column()
    cidade: string;

    @Column()
    bairro: string;
    
    @Column()
    usuario_id: string;

    @Column()
    ativo: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(()=>Usuarios)
    @JoinColumn({name:'usuario_id'})
    usuario_criador: Usuarios
}

export default Endereco;