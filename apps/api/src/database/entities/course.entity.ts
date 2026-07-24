import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseSecuredEntity } from './base-secured.entity';
import { CourseStatus } from '../../modules/course/structs/course-status.enum';
import { Level } from './level.entity';
import { Lesson } from './lesson.entity';
import { User } from './user.entity';

@Entity('Course')
export class Course extends BaseSecuredEntity {
  constructor(data: Partial<Course> = {}) {
    super();
    Object.assign(this, data);
  }

  @Column({ length: 255 })
  name?: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ length: 20, default: CourseStatus.Draft })
  status?: CourseStatus;

  /** The language the course teaches; source text on entity columns is in this language. */
  @Column({ name: 'sourceLanguageCode', length: 10, default: 'en' })
  sourceLanguageCode?: string;

  /** Languages this course may be translated into; the details `?lang=` must be one of these. */
  @Column({
    name: 'translationLanguageCodes',
    type: 'varchar',
    length: 10,
    array: true,
    default: () => "'{}'",
  })
  translationLanguageCodes?: string[];

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
