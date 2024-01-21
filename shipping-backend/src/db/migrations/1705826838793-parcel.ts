import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableIndex,
} from "typeorm"

export class Parcel1705826838793 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'parcel',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                    },
                    {
                        name: 'sku',
                        type: 'varchar',
                        isUnique: true,
                        isNullable: false,
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'street_address',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'town',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'country',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'delivery_date',
                        type: 'timestamp',
                        isNullable: false,
                    }
                ]
            })
        );

        await queryRunner.createIndex(
            "parcel",
            new TableIndex({
                name: "IDX_PARCEL_SKU",
                columnNames: ["sku"],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex('parcel', 'IDX_PARCEL_SKU');
        await queryRunner.dropTable('parcel');
    }
}
