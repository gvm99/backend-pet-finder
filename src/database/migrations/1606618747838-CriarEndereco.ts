import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CriarEndereco1606618747838 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "enderecos",
                columns:[
                    {
                        name:'id',
                        type:'uuid',
                        isPrimary: true,
                        generationStrategy:'uuid',
                        default:'uuid_generate_v4()'
                    },
                    {
                        name:'usuario_id',
                        type:'uuid'
                    },
                    {
                        name:'rua',
                        type:'varchar',
                    },
                    {
                        name:'numero',
                        type:'varchar'
                    },
                    {
                        name:'cidade',
                        type:'varchar'
                    },
                    {
                        name:'estado',
                        type:'varchar'
                    },
                    {
                        name:'bairro',
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
                        name:'ativo',
                        type:'boolean',
                        default:'true'
                    }
                ]
            })
        );

        await queryRunner.createForeignKey(
            'enderecos',
            new TableForeignKey({
                columnNames: ['usuario_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'usuarios',
                onDelete:'SET NULL',
                onUpdate:'CASCADE',
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('enderecos');
    }

}
