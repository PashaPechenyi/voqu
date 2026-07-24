import { BaseResponseDto } from '../../../../common/http/dto/base-response.dto';

export class CreateSegmentResponseDto extends BaseResponseDto {
  constructor(id: string, SegmentContentRowId: string) {
    super();
    this.id = id;
    this.SegmentContentRowId = SegmentContentRowId;
  }

  id: string;

  SegmentContentRowId: string;
}
