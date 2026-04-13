import { Injectable } from '@nestjs/common';
import { Level } from '../../database/entities/level.entity';
import { LevelsRepository } from './levels.repository';

@Injectable()
export class LevelsService {
  constructor(private readonly levelsRepository: LevelsRepository) {}

  async findAll(): Promise<Level[]> {
    return this.levelsRepository.findAll();
  }
}
