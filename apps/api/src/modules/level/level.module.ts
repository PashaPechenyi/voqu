import { Module } from '@nestjs/common';
import { LevelController } from './http/controllers/level.controller';
import { LevelService } from './services/level.service';
import { LevelRepository } from './repositories/level.repository';

@Module({
  controllers: [LevelController],
  providers: [LevelRepository, LevelService],
  exports: [LevelService],
})
export class LevelModule {}
