import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import Usuarios from './Usuarios';

@Entity('animais')
class Animal {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nome: string;

    @Column()
    raca: string;
    
    @Column()
    idade: number;

    @Column()
    peso: string;
    
    @Column()
    cidade: string;

    @Column()
    usuario_criador_id: string ;
    
    @Column()
    usuario_adotante_id: string | null;

    @Column()
    aceitoCriador: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(()=>Usuarios)
    @JoinColumn({name:'usuario_criador_id'})
    usuario_criador: Usuarios

    @ManyToOne(()=>Usuarios)
    @JoinColumn({name:'usuario_adotante_id'})
    usuario_adotante: Usuarios
}

export default Animal;