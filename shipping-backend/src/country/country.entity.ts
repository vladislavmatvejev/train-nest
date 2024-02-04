import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('country')
export class Country {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  code: string;
}
