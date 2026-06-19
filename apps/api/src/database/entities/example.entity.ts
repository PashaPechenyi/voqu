import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class Example {
  constructor(data: Partial<Example> = {}) {
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn('uuid')
  id?: string;
}
