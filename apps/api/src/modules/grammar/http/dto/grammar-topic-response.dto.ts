import { BaseResponseDto } from '../../../../common/http/dto/base-response.dto';
import { GrammarContentView } from '../../templates/topic/structs/grammar-content.constructor';

export class GrammarTopicResponseDto extends BaseResponseDto {
  constructor(grammarTopic: GrammarContentView) {
    super();
    this.grammarTopic = grammarTopic;
  }

  grammarTopic: GrammarContentView;
}
