import { Parcel } from 'src/parcel/parcel.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class SampleData1707831641307 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert<Parcel[]>(Parcel, createParcelList(15));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('parcel');
  }
}

function randomString(): string {
  return Math.random().toString(36).substring(2, 10);
}

function randomDescription(): string {
  const descriptions = [
    'This is a small parcel',
    'This is a medium parcel',
    'This is a large parcel',
    'This one is coming from the moon',
  ];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
}

function createParcelList(amount: number): Parcel[] {
  const parcelList = [];

  for (let i = 0; i < amount; i++) {
    const parcel = {
      sku: randomString(),
      description: randomDescription(),
      streetAddress: '1234 Main St',
      town: 'Tallinn',
      country: 'Estonia',
      deliveryDate: new Date(),
    };
    parcelList.push(parcel);
  }

  return parcelList;
}
