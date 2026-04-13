import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Level } from '../../database/entities/level.entity';

@Injectable()
export class LevelsRepository {
  constructor(
    @InjectRepository(Level)
    private readonly repository: Repository<Level>,
  ) {}

  async findAll(): Promise<Level[]> {
    return this.repository.find({
      order: { order: 'ASC' },
    });
  }
}
