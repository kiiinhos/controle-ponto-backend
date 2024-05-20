import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserHistoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userCode: string;

  @Column()
  dateEntry: string;

  @Column()
  dateExit: string;

  @Column()
  hourEntry: string;

  @Column()
  hourExit: string;

  @Column()
  workTime: string;
}
