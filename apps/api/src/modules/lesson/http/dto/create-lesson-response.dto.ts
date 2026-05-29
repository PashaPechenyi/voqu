import { BaseResponseDto } from '../../../../common/http/dto/base-response.dto';

export class CreateLessonResponseDto extends BaseResponseDto {
  constructor(id: string) {
    super();
    this.id = id;
  }

  id: string;
}
