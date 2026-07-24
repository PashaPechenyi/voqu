import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseSecuredEntity } from './base-secured.entity';
import { Lesson } from './lesson.entity';
import { SegmentKind } from './segment-kind.entity';

@Entity('LessonSegment')
export class LessonSegment extends BaseSecuredEntity {
  constructor(data: Partial<LessonSegment> = {}) {
    super();
    Object.assign(this, data);
  }

  /**
   * Id of the row in the template-specific table named by
   * `SegmentKind.tableName`. FK-by-convention (Postgres can't do polymorphic
   * FKs); integrity is enforced by the atomic create transaction in
   * LessonSegmentService and a periodic orphan-check job.
   */
  @Column({ name: 'SegmentContentRowId' })
  SegmentContentRowId?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  title?: string | null;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ default: 0 })
  order?: number;

  // Relations
  @ManyToOne(() => Lesson)
  @JoinColumn({ name: 'LessonId' })
  Lesson?: Lesson;

  @Column({ name: 'LessonId' })
  LessonId?: string;

  @ManyToOne(() => SegmentKind)
  @JoinColumn({ name: 'SegmentKindId' })
  SegmentKind?: SegmentKind;

  @Column({ name: 'SegmentKindId' })
  SegmentKindId?: string;
}
