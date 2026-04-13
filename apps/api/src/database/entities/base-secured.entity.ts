import { PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

export class BaseSecuredEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  declare id?: string;
}
