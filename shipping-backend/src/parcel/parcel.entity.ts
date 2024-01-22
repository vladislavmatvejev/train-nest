import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('parcel')
export class Parcel {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  sku: string;

  @Column()
  description: string;

  @Column({ name: 'street_address' })
  streetAddress: string;

  @Column()
  town: string;

  @Column()
  country: string;

  @Column({ name: 'delivery_date' })
  deliveryDate: Date;
}
