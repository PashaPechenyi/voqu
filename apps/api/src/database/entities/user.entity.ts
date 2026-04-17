import { Entity, Column, ManyToOne, OneToMany, JoinColumn, Index } from 'typeorm';
import { BaseSecuredEntity } from './base-secured.entity';
import { Role } from './role.entity';
import { Course } from './course.entity';

@Entity('User')
export class User extends BaseSecuredEntity {
  @Index('idx_user_email')
  @Column({ length: 255, unique: true })
  email?: string;

  @Column({ length: 255 })
  firstName?: string;

  @Column({ length: 255 })
  lastName?: string;

  @Column({ length: 255 })
  password?: string;

  // Relations
  @ManyToOne(() => Role, (role) => role.Users)
  @JoinColumn({ name: 'RoleId' })
  Role?: Role;

  @Column({ name: 'RoleId' })
  RoleId?: string;

  @OneToMany(() => Course, (course) => course.Owner)
  Courses?: Course[];
}
