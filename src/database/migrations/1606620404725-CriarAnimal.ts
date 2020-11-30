import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CriarAnimal1606620404725 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "animais",
                columns:[
                    {
                        name:'id',
                        type:'uuid',
                        isPrimary: true,
                        generationStrategy:'uuid',
                        default:'uuid_generate_v4()'
                    },
                    {
                        name:'usuario_criador_id',
                        type:'uuid'
                    },
                    {
                        name:'usuario_adotante_id',
                        type:'uuid',
                        isNullable: true
                    },
                    {
                        name:'nome',
                        type:'varchar',
                    },
                    {
                        name:'raca',
                        type:'varchar'
                    },
                    {
                        name:'idade',
                        type:'int'
                    },
                    {
                        name:'peso',
                        type:'varchar'
                    },
                    {
                        name:'cidade',
                        type:'varchar'
                    },
                    {
                        name:'aceitoCriador',
                        type:'boolean',
                        default:'false'
                    },
                    {
                        name:'created_at',
                        type:'timestamp',
                        default:'now()'
                    },
                    {
                        name:'updated_at',
                        type:'timestamp',
                        default:'now()'
                    },
                ]
            })
        );

        await queryRunner.createForeignKey(
            'animais',
            new TableForeignKey({
                columnNames: ['usuario_criador_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'usuarios',
                onDelete:'SET NULL',
                onUpdate:'CASCADE',
            })
        );
        
        await queryRunner.createForeignKey(
            'animais',
            new TableForeignKey({
                columnNames: ['usuario_adotante_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'usuarios',
                onDelete:'SET NULL',
                onUpdate:'CASCADE',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('animais');
    }

}
