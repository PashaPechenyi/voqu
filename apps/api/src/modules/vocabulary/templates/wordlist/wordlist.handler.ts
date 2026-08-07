import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Wordlist } from '../../../../database/entities/wordlist.entity';
import { WordlistEntry } from '../../../../database/entities/wordlist-entry.entity';
import { WordlistEntryExample } from '../../../../database/entities/wordlist-entry-example.entity';
import { WordlistEntryCollocation } from '../../../../database/entities/wordlist-entry-collocation.entity';
import { LocalizedResolver } from '../../../localization/services/localized-resolver';
import { TranslatableEntityType } from '../../../localization/structs/translatable-entity-type.enum';
import {
  ILoadedContent,
  IKindHandler,
  ISegmentContentContext,
} from '../../../lesson-segment/structs/kind-handler.interface';
import { validateContent } from '../../../lesson-segment/structs/validate-content.helper';
import { SegmentKindCode } from '../../../segment-catalog/structs/segment-kind.enum';
import { WordlistRepository } from '../../repositories/wordlist.repository';
import { CreateWordlistContentDto } from './http/dto/create-wordlist-content.dto';
import { WordlistContentView, collectWordlistRefs } from './structs/wordlist-content.constructor';

@Injectable()
export class WordlistHandler implements IKindHandler {
  readonly code = SegmentKindCode.Wordlist;

  constructor(private readonly wordlistRepository: WordlistRepository) {}

  /**
   * Inserts the wordlist and all its entries (+ examples + collocations)
   * inside the caller's transaction. No lookup against a global lexicon, no
   * dedup — each entry is self-contained. Translatable fields carry
   * `{ value, translation? }`; `value` goes on the column, `translation` is
   * written via `ctx.writeTranslation` under the field's translation slot.
   */
  async createContent(
    input: unknown,
    manager: EntityManager,
    ctx: ISegmentContentContext,
  ): Promise<string> {
    const content = validateContent(CreateWordlistContentDto, input, this.code);

    const wordlist = await manager.save(
      manager.create(Wordlist, {
        title: content.title.value,
        description: content.description?.value ?? null,
        OwnerUserId: content.OwnerUserId ?? null,
      }),
    );
    await ctx.writeTranslation(
      TranslatableEntityType.Wordlist,
      wordlist.id!,
      'title',
      content.title.translation,
    );
    await ctx.writeTranslation(
      TranslatableEntityType.Wordlist,
      wordlist.id!,
      'description',
      content.description?.translation,
    );

    const entries = content.entries ?? [];
    for (let index = 0; index < entries.length; index++) {
      const entryInput = entries[index];
      const entry = await manager.save(
        manager.create(WordlistEntry, {
          WordlistId: wordlist.id,
          lemma: entryInput.lemma.value,
          entryType: entryInput.entryType ?? 'word',
          partOfSpeech: entryInput.partOfSpeech ?? null,
          v2: entryInput.v2 ?? null,
          v3: entryInput.v3 ?? null,
          transcription: entryInput.transcription ?? null,
          audioUrl: entryInput.audioUrl ?? null,
          note: entryInput.note?.value ?? null,
          order: entryInput.order ?? index,
        }),
      );
      // The entry's meaning translation is stored under 'definition' (the
      // source is the lemma column itself; there is no 'definition' column).
      await ctx.writeTranslation(
        TranslatableEntityType.WordlistEntry,
        entry.id!,
        'definition',
        entryInput.lemma.translation,
      );
      await ctx.writeTranslation(
        TranslatableEntityType.WordlistEntry,
        entry.id!,
        'note',
        entryInput.note?.translation,
      );

      const examples = entryInput.examples ?? [];
      for (let exIndex = 0; exIndex < examples.length; exIndex++) {
        const exampleInput = examples[exIndex];
        const example = await manager.save(
          manager.create(WordlistEntryExample, {
            WordlistEntryId: entry.id,
            text: exampleInput.text.value,
            order: exampleInput.order ?? exIndex,
          }),
        );
        await ctx.writeTranslation(
          TranslatableEntityType.WordlistEntryExample,
          example.id!,
          'text',
          exampleInput.text.translation,
        );
      }

      const collocations = entryInput.collocations ?? [];
      for (let colIndex = 0; colIndex < collocations.length; colIndex++) {
        const collocationInput = collocations[colIndex];
        const collocation = await manager.save(
          manager.create(WordlistEntryCollocation, {
            WordlistEntryId: entry.id,
            expression: collocationInput.expression,
            explanation: collocationInput.explanation?.value ?? null,
            order: collocationInput.order ?? colIndex,
          }),
        );
        await ctx.writeTranslation(
          TranslatableEntityType.WordlistEntryCollocation,
          collocation.id!,
          'explanation',
          collocationInput.explanation?.translation,
        );
      }
    }

    return wordlist.id!;
  }

  async loadContent(contentRowId: string): Promise<ILoadedContent> {
    const wordlist = await this.wordlistRepository.findFullById(contentRowId);
    return {
      data: wordlist,
      refs: wordlist ? collectWordlistRefs(wordlist) : [],
    };
  }

  serializeContent(loaded: ILoadedContent, resolver: LocalizedResolver): unknown {
    const wordlist = loaded.data as Wordlist | null;
    if (!wordlist) {
      return null;
    }
    return { wordlist: new WordlistContentView(wordlist, resolver) };
  }

  async deleteContent(contentRowId: string, manager: EntityManager): Promise<void> {
    // Entries → examples/collocations cascade at the DB level.
    await manager.delete(Wordlist, { id: contentRowId });
  }
}
