import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { SegmentKind } from '../../../database/entities/segment-kind.entity';
import { BaseRepository } from '../../../database/repositories/base.repository';

@Injectable()
export class SegmentKindRepository extends BaseRepository<SegmentKind> {
  constructor(dataSource: DataSource) {
    super(dataSource, SegmentKind);
  }

  async findByIdWithType(id: string): Promise<SegmentKind | null> {
    return this.createQueryBuilder('SegmentKind')
      .leftJoinAndSelect('SegmentKind.SegmentType', 'SegmentType')
      .where('SegmentKind.id = :id', { id })
      .getOne();
  }

  async findByKeyWithType(key: string): Promise<SegmentKind | null> {
    return this.createQueryBuilder('SegmentKind')
      .leftJoinAndSelect('SegmentKind.SegmentType', 'SegmentType')
      .where('SegmentKind.key = :key', { key })
      .getOne();
  }
}
