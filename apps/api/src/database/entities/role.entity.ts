import { Entity, Column, OneToMany } from 'typeorm';
import { BaseSecuredEntity } from './base-secured.entity';
import { User } from './user.entity';

@Entity('Role')
export class Role extends BaseSecuredEntity {
  constructor(data: Partial<Role> = {}) {
    super();
    Object.assign(this, data);
  }

  @Column({ length: 50, unique: true })
  name?: string;

  @Column({ length: 50, unique: true })
  slug?: string;

  @Column({ type: 'jsonb', default: [] })
  delegableRoles?: string[];

  // Relations
  @OneToMany(() => User, (user) => user.Role)
  Users?: User[];
}
