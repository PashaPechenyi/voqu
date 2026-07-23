import { Injectable } from '@nestjs/common';
import { EntityNotFoundException } from '../../../common/exceptions/entity-not-found.exception';
import { WordlistEntry } from '../../../database/entities/wordlist-entry.entity';
import { WordlistEntryExample } from '../../../database/entities/wordlist-entry-example.entity';
import { WordlistEntryCollocation } from '../../../database/entities/wordlist-entry-collocation.entity';
import { WordlistRepository } from '../repositories/wordlist.repository';
import { WordlistEntryRepository } from '../repositories/wordlist-entry.repository';
import { WordlistEntryExampleRepository } from '../repositories/wordlist-entry-example.repository';
import { WordlistEntryCollocationRepository } from '../repositories/wordlist-entry-collocation.repository';
import {
  ICreateCollocationParams,
  ICreateEntryParams,
  ICreateExampleParams,
  IUpdateEntryParams,
} from '../structs/entry-input.interface';

/**
 * Standalone authoring of wordlist entries and their examples/collocations
 * (the `/wordlist-entry/*` routes). No findOrCreate, no dedup — every entry is
 * self-contained and belongs to exactly one wordlist.
 */
@Injectable()
export class WordlistEntryService {
  constructor(
    private readonly wordlistRepository: WordlistRepository,
    private readonly wordlistEntryRepository: WordlistEntryRepository,
    private readonly exampleRepository: WordlistEntryExampleRepository,
    private readonly collocationRepository: WordlistEntryCollocationRepository,
  ) {}

  async createEntry(params: ICreateEntryParams): Promise<WordlistEntry> {
    await this.wordlistRepository.getOneByIdOrFail(params.WordlistId);

    const order =
      params.order ??
      (await this.wordlistEntryRepository
        .getMaxOrderByWordlist(params.WordlistId)
        .then((max) => (max === null ? 0 : max + 1)));

    return this.wordlistEntryRepository.create(
      new WordlistEntry({
        WordlistId: params.WordlistId,
        lemma: params.lemma,
        entryType: params.entryType ?? 'word',
        partOfSpeech: params.partOfSpeech ?? null,
        v2: params.v2 ?? null,
        v3: params.v3 ?? null,
        transcription: params.transcription ?? null,
        audioUrl: params.audioUrl ?? null,
        note: params.note ?? null,
        order,
      }),
    );
  }

  async updateEntry(EntryId: string, params: IUpdateEntryParams): Promise<WordlistEntry> {
    await this.wordlistEntryRepository.getOneByIdOrFail(EntryId);
    return this.wordlistEntryRepository.update(EntryId, params);
  }

  async deleteEntry(EntryId: string): Promise<void> {
    await this.wordlistEntryRepository.getOneByIdOrFail(EntryId);
    // Examples and collocations cascade at the DB level.
    await this.wordlistEntryRepository.deleteWhere({ id: EntryId });
  }

  async addExample(EntryId: string, params: ICreateExampleParams): Promise<WordlistEntryExample> {
    await this.wordlistEntryRepository.getOneByIdOrFail(EntryId);
    return this.exampleRepository.create(
      new WordlistEntryExample({
        WordlistEntryId: EntryId,
        text: params.text,
        order: params.order ?? 0,
      }),
    );
  }

  async addCollocation(
    EntryId: string,
    params: ICreateCollocationParams,
  ): Promise<WordlistEntryCollocation> {
    await this.wordlistEntryRepository.getOneByIdOrFail(EntryId);
    return this.collocationRepository.create(
      new WordlistEntryCollocation({
        WordlistEntryId: EntryId,
        expression: params.expression,
        explanation: params.explanation ?? null,
        order: params.order ?? 0,
      }),
    );
  }

  async getEntryOrFail(EntryId: string): Promise<WordlistEntry> {
    const entry = await this.wordlistEntryRepository.findFullById(EntryId);
    if (!entry) {
      throw new EntityNotFoundException({ entity: WordlistEntry, ctx: { id: EntryId } });
    }
    return entry;
  }
}
