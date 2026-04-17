import { Entity, Column, OneToMany, Index } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Course } from './course.entity';

@Entity('Level')
export class Level extends BaseEntity {
  @Column({ length: 255 })
  name?: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Index('idx_level_cefrLevel')
  @Column({ length: 4 })
  cefrLevel?: string;

  @Column({ default: 0 })
  order?: number;

  // Relations
  @OneToMany(() => Course, (course) => course.Level)
  Courses?: Course[];
}
