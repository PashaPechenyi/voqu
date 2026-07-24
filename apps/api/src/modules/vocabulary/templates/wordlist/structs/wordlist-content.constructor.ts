import { Wordlist } from '../../../../../database/entities/wordlist.entity';
import { WordlistEntry } from '../../../../../database/entities/wordlist-entry.entity';
import { WordlistEntryExample } from '../../../../../database/entities/wordlist-entry-example.entity';
import { WordlistEntryCollocation } from '../../../../../database/entities/wordlist-entry-collocation.entity';
import { IEntityRef } from '../../../../localization/repositories/translation.repository';
import { LocalizedResolver } from '../../../../localization/services/localized-resolver';
import { LocalizedField } from '../../../../localization/structs/localized-value.constructor';
import { TranslatableEntityType } from '../../../../localization/structs/translatable-entity-type.enum';

/**
 * Collects every translatable `(entityType, EntityId)` ref inside a loaded
 * wordlist so the read path can batch-fetch translations in one query.
 */
export function collectWordlistRefs(wordlist: Wordlist): IEntityRef[] {
  const refs: IEntityRef[] = [
    { entityType: TranslatableEntityType.Wordlist, EntityId: wordlist.id! },
  ];

  for (const entry of wordlist.Entries ?? []) {
    refs.push({ entityType: TranslatableEntityType.WordlistEntry, EntityId: entry.id! });
    for (const example of entry.Examples ?? []) {
      refs.push({
        entityType: TranslatableEntityType.WordlistEntryExample,
        EntityId: example.id!,
      });
    }
    for (const collocation of entry.Collocations ?? []) {
      refs.push({
        entityType: TranslatableEntityType.WordlistEntryCollocation,
        EntityId: collocation.id!,
      });
    }
  }

  return refs;
}

class WordlistExampleView {
  constructor(example: WordlistEntryExample, resolver: LocalizedResolver) {
    this.id = example.id!;
    this.order = example.order!;
    this.text = resolver.resolve(
      TranslatableEntityType.WordlistEntryExample,
      example.id!,
      'text',
      example.text!,
    );
  }

  id: string;
  order: number;
  text: LocalizedField;
}

class WordlistCollocationView {
  constructor(collocation: WordlistEntryCollocation, resolver: LocalizedResolver) {
    this.id = collocation.id!;
    this.order = collocation.order!;
    this.expression = collocation.expression!;
    this.explanation = resolver.resolveNullable(
      TranslatableEntityType.WordlistEntryCollocation,
      collocation.id!,
      'explanation',
      collocation.explanation,
    );
  }

  id: string;
  order: number;
  expression: string;
  explanation: LocalizedField | null;
}

class WordlistEntryView {
  constructor(entry: WordlistEntry, resolver: LocalizedResolver) {
    this.id = entry.id!;
    this.order = entry.order!;
    this.lemma = entry.lemma!;
    this.entryType = entry.entryType!;
    this.partOfSpeech = entry.partOfSpeech ?? null;
    this.v2 = entry.v2 ?? null;
    this.v3 = entry.v3 ?? null;
    this.transcription = entry.transcription ?? null;
    this.audioUrl = entry.audioUrl ?? null;
    // The source-language "definition" is the lemma itself; translations are
    // what define it for the user. Falls back to lemma when untranslated.
    this.definition = resolver.resolve(
      TranslatableEntityType.WordlistEntry,
      entry.id!,
      'definition',
      entry.lemma!,
    );
    this.note = resolver.resolveNullable(
      TranslatableEntityType.WordlistEntry,
      entry.id!,
      'note',
      entry.note,
    );
    this.examples = (entry.Examples ?? []).map((e) => new WordlistExampleView(e, resolver));
    this.collocations = (entry.Collocations ?? []).map(
      (c) => new WordlistCollocationView(c, resolver),
    );
  }

  id: string;
  order: number;
  lemma: string;
  entryType: string;
  partOfSpeech: string | null;
  v2: string | null;
  v3: string | null;
  transcription: string | null;
  audioUrl: string | null;
  definition: LocalizedField;
  note: LocalizedField | null;
  examples: WordlistExampleView[];
  collocations: WordlistCollocationView[];
}

/**
 * The localized response shape for a wordlist segment's content (§6.3).
 */
export class WordlistContentView {
  constructor(wordlist: Wordlist, resolver: LocalizedResolver) {
    this.id = wordlist.id!;
    this.title = resolver.resolve(
      TranslatableEntityType.Wordlist,
      wordlist.id!,
      'title',
      wordlist.title!,
    );
    this.description = resolver.resolveNullable(
      TranslatableEntityType.Wordlist,
      wordlist.id!,
      'description',
      wordlist.description,
    );
    this.entries = (wordlist.Entries ?? []).map((e) => new WordlistEntryView(e, resolver));
  }

  id: string;
  title: LocalizedField;
  description: LocalizedField | null;
  entries: WordlistEntryView[];
}
