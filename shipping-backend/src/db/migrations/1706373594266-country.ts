import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { Country } from '../../country/country.entity'
const availableCountries = [
    {
        name: 'Estonia',
        code: 'EE'
    },
    {
        name: 'Latvia',
        code: 'LV'
    },
    {
        name: 'Lithuania',
        code: 'LT'
    },
    {
        name: 'Poland',
        code: 'PL'
    },
    {
        name: 'Germany',
        code: 'DE'
    }
];
export class Countries1706373594266 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'country',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isUnique: true,
                    isNullable: false,
                },
                {
                    name: 'code',
                    type: 'varchar',
                    isUnique: true,
                    isNullable: false
                }
            ]
        }));

        await queryRunner.manager.insert<Country[]>(Country, availableCountries)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('country');
    }

}
