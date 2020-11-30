import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CriarUsuarios1606617670353 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "usuarios",
                columns:[
                    {
                        name:'id',
                        type:'uuid',
                        isPrimary: true,
                        generationStrategy:'uuid',
                        default:'uuid_generate_v4()'
                    },
                    {
                        name:'nome',
                        type:'varchar'
                    },
                    {
                        name:'email',
                        type:'varchar',
                        isUnique:true
                    },
                    {
                        name:'password',
                        type:'varchar'
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
                    {
                        name:'email_confirmado',
                        type:'boolean',
                        default:'false'
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('usuarios')
    }

}
