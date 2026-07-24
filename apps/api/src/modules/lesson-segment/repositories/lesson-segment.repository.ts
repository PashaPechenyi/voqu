import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { LessonSegment } from '../../../database/entities/lesson-segment.entity';
import { BaseRepository } from '../../../database/repositories/base.repository';

@Injectable()
export class LessonSegmentRepository extends BaseRepository<LessonSegment> {
  constructor(dataSource: DataSource) {
    super(dataSource, LessonSegment);
  }

  /**
   * All segments of a lesson, ordered, with their SegmentKind + SegmentType
   * joined (so the read path knows each segment's handler code and can shape
   * the catalog refs).
   */
  async findByLessonWithKind(LessonId: string): Promise<LessonSegment[]> {
    return this.createQueryBuilder('LessonSegment')
      .leftJoinAndSelect('LessonSegment.SegmentKind', 'SegmentKind')
      .leftJoinAndSelect('SegmentKind.SegmentType', 'SegmentType')
      .where('LessonSegment.LessonId = :LessonId', { LessonId })
      .orderBy('LessonSegment.order', 'ASC')
      .addOrderBy('LessonSegment.createdAt', 'ASC')
      .getMany();
  }

  async findByIdWithKind(id: string): Promise<LessonSegment | null> {
    return this.createQueryBuilder('LessonSegment')
      .leftJoinAndSelect('LessonSegment.SegmentKind', 'SegmentKind')
      .leftJoinAndSelect('SegmentKind.SegmentType', 'SegmentType')
      .where('LessonSegment.id = :id', { id })
      .getOne();
  }

  async getMaxOrderByLesson(LessonId: string): Promise<number | null> {
    const result = await this.createQueryBuilder('LessonSegment')
      .select('MAX(LessonSegment.order)', 'max')
      .where('LessonSegment.LessonId = :LessonId', { LessonId })
      .getRawOne<{ max: string | null }>();

    return result?.max !== null && result?.max !== undefined ? Number(result.max) : null;
  }

  async findIdsByLesson(LessonId: string): Promise<Pick<LessonSegment, 'id' | 'order'>[]> {
    return this.createQueryBuilder('LessonSegment')
      .select(['LessonSegment.id', 'LessonSegment.order'])
      .where('LessonSegment.LessonId = :LessonId', { LessonId })
      .orderBy('LessonSegment.order', 'ASC')
      .getMany();
  }
}
