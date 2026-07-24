import { BaseResponseDto } from '../../../../common/http/dto/base-response.dto';
import { Translation } from '../../../../database/entities/translation.entity';
import { TranslationItem } from '../../structs/translation-item.constructor';

export class TranslationResponseDto extends BaseResponseDto {
  constructor(translation: Translation) {
    super();
    this.translation = new TranslationItem(translation);
  }

  translation: TranslationItem;
}
