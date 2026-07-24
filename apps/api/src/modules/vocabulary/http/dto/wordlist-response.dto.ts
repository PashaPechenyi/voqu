import { BaseResponseDto } from '../../../../common/http/dto/base-response.dto';
import { WordlistContentView } from '../../templates/wordlist/structs/wordlist-content.constructor';

export class WordlistResponseDto extends BaseResponseDto {
  constructor(wordlist: WordlistContentView) {
    super();
    this.wordlist = wordlist;
  }

  wordlist: WordlistContentView;
}
