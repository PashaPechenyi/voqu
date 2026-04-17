import { Injectable } from '@nestjs/common';
import { Level } from '../../../database/entities/level.entity';
import { LevelRepository } from '../repositories/level.repository';

@Injectable()
export class LevelService {
  constructor(private readonly levelRepository: LevelRepository) {}

  async findAll(): Promise<Level[]> {
    return this.levelRepository.findAllOrdered();
  }
}
