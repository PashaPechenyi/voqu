import { Controller, Get } from '@nestjs/common';
import { LevelService } from '../../services/level.service';
import { LevelListResponseDto } from '../dto/level-list-response.dto';

@Controller('level')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  @Get()
  async findAll(): Promise<LevelListResponseDto> {
    const items = await this.levelService.findAll();
    return new LevelListResponseDto(items);
  }
}
