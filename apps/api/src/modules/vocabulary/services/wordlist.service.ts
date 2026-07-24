import { Injectable } from '@nestjs/common';
import { EntityNotFoundException } from '../../../common/exceptions/entity-not-found.exception';
import { Wordlist } from '../../../database/entities/wordlist.entity';
import { WordlistRepository } from '../repositories/wordlist.repository';

export interface IUpdateWordlistParams {
  title?: string;
  description?: string | null;
}

@Injectable()
export class WordlistService {
  constructor(private readonly wordlistRepository: WordlistRepository) {}

  /** Loads a wordlist with all entries → examples + collocations. */
  async getFullOrFail(WordlistId: string): Promise<Wordlist> {
    const wordlist = await this.wordlistRepository.findFullById(WordlistId);
    if (!wordlist) {
      throw new EntityNotFoundException({ entity: Wordlist, ctx: { id: WordlistId } });
    }
    return wordlist;
  }

  async update(WordlistId: string, params: IUpdateWordlistParams): Promise<Wordlist> {
    await this.wordlistRepository.getOneByIdOrFail(WordlistId);
    return this.wordlistRepository.update(WordlistId, params);
  }

  async listByOwner(OwnerUserId: string): Promise<Wordlist[]> {
    return this.wordlistRepository.findByOwner(OwnerUserId);
  }
}
