import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseSecuredEntity } from './base-secured.entity';
import { Course } from './course.entity';

@Entity('Lesson')
export class Lesson extends BaseSecuredEntity {
  @Column({ length: 255 })
  title?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  subtitle?: string | null;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ default: 0 })
  order?: number;

  @Column({ length: 20, default: 'draft' })
  status?: string;

  // Relations
  @ManyToOne(() => Course, (course) => course.Lessons)
  @JoinColumn({ name: 'CourseId' })
  Course?: Course;

  @Column({ name: 'CourseId' })
  CourseId?: string;
}
