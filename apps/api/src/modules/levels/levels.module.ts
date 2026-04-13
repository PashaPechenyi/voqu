import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Level } from '../../database/entities/level.entity';
import { LevelsController } from './levels.controller';
import { LevelsService } from './levels.service';
import { LevelsRepository } from './levels.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Level])],
  controllers: [LevelsController],
  providers: [LevelsRepository, LevelsService],
  exports: [LevelsService],
})
export class LevelsModule {}
