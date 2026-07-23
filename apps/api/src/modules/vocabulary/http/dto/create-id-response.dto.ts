import { BaseResponseDto } from '../../../../common/http/dto/base-response.dto';

/** Generic "created, here's its id" response for entry/example/collocation. */
export class CreateIdResponseDto extends BaseResponseDto {
  constructor(id: string) {
    super();
    this.id = id;
  }

  id: string;
}
