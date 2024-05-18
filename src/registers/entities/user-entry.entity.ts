import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userCode: string;

  @Column()
  dateEntry: string;

  @Column()
  hourEntry: string;
}
