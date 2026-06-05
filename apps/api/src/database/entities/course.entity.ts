import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseSecuredEntity } from './base-secured.entity';
import { CourseStatus } from '../../modules/course/structs/course-status.enum';
import { Level } from './level.entity';
import { Lesson } from './lesson.entity';
import { User } from './user.entity';

@Entity('Course')
export class Course extends BaseSecuredEntity {
  @Column({ length: 255 })
  name?: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ length: 20, default: CourseStatus.Draft })
  status?: CourseStatus;

  // Relations
  @ManyToOne(() => Level, (level) => level.Courses)
  @JoinColumn({ name: 'LevelId' })
  Level?: Level;

  @Column({ name: 'LevelId' })
  LevelId?: number;

  @ManyToOne(() => User, (user) => user.Courses)
  @JoinColumn({ name: 'OwnerId' })
  Owner?: User;

  @Column({ name: 'OwnerId' })
  OwnerId?: string;

  @OneToMany(() => Lesson, (lesson) => lesson.Course)
  Lessons?: Lesson[];
}
