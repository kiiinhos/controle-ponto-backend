import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserExitEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userCode: string;

  @Column()
  dateExit: string;

  @Column()
  hourExit: string;
}
