import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseSecuredEntity } from './base-secured.entity';
import { Level } from './level.entity';
import { Lesson } from './lesson.entity';

@Entity('Course')
export class Course extends BaseSecuredEntity {
  @Column({ length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ length: 20, default: 'draft' })
  status: string;

  // Relations
  @ManyToOne(() => Level, (level) => level.Courses)
  @JoinColumn({ name: 'LevelId' })
  Level: Level;

  @Column({ name: 'LevelId' })
  LevelId: string;

  @OneToMany(() => Lesson, (lesson) => lesson.Course)
  Lessons: Lesson[];
}
