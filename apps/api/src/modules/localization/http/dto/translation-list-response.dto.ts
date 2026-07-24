import { BaseResponseDto } from '../../../../common/http/dto/base-response.dto';
import { TranslationItem } from '../../structs/translation-item.constructor';

export class TranslationListResponseDto extends BaseResponseDto {
  constructor(items: TranslationItem[]) {
    super();
    this.items = items;
  }

  items: TranslationItem[];
}
