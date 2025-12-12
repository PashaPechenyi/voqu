import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class Example {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
