import { BaseResponseDto } from '../../../../common/http/dto/base-response.dto';
import { Level } from '../../../../database/entities/level.entity';

export class LevelListResponseDto extends BaseResponseDto {
  constructor(items: Level[]) {
    super();
    this.items = items;
  }

  items: Level[];
}
