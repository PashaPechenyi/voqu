import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Level } from '../../../database/entities/level.entity';
import { BaseRepository } from '../../../database/repositories/base.repository';

@Injectable()
export class LevelRepository extends BaseRepository<Level> {
  constructor(dataSource: DataSource) {
    super(dataSource, Level);
  }

  async findAllOrdered(): Promise<Level[]> {
    return this.orm.find({ order: { order: 'ASC' } });
  }
}
