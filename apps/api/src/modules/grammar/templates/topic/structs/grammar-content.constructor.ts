import { GrammarTopic } from '../../../../../database/entities/grammar-topic.entity';
import { GrammarBlock } from '../../../../../database/entities/grammar-block.entity';
import { IEntityRef } from '../../../../localization/repositories/translation.repository';
import { LocalizedResolver } from '../../../../localization/services/localized-resolver';
import { LocalizedField } from '../../../../localization/structs/localized-value.constructor';
import { TranslatableEntityType } from '../../../../localization/structs/translatable-entity-type.enum';
import { GrammarBlockType } from '../../../structs/block-type.enum';
import { ParsedMarkupToken } from '../../../structs/parsed-markup-token.interface';

/**
 * Collects translatable refs inside a loaded grammar topic: the topic title,
 * plus each `text` block's text. Pattern blocks carry markup, not translatable
 * prose, so they contribute no refs by default (localized markup is possible
 * but not part of the read path).
 */
export function collectGrammarRefs(topic: GrammarTopic): IEntityRef[] {
  const refs: IEntityRef[] = [
    { entityType: TranslatableEntityType.GrammarTopic, EntityId: topic.id! },
  ];

  for (const block of topic.Blocks ?? []) {
    if (block.blockType === GrammarBlockType.Text) {
      refs.push({
        entityType: TranslatableEntityType.GrammarBlockText,
        EntityId: block.id!,
      });
    }
  }

  return refs;
}

class GrammarBlockView {
  constructor(block: GrammarBlock, resolver: LocalizedResolver) {
    this.id = block.id!;
    this.blockType = block.blockType!;
    this.order = block.order!;

    if (block.blockType === GrammarBlockType.Text && block.Text) {
      this.textRole = block.Text.textRole!;
      this.text = resolver.resolve(
        TranslatableEntityType.GrammarBlockText,
        block.id!,
        'text',
        block.Text.text!,
      );
    } else if (block.blockType === GrammarBlockType.Pattern && block.Pattern) {
      this.form = block.Pattern.form!;
      this.markup = block.Pattern.markup!;
      this.parsedMarkup = block.Pattern.parsedMarkup!;
    }
  }

  id: string;
  blockType: string;
  order: number;

  // text payload
  textRole?: string;
  text?: LocalizedField;

  // pattern payload
  form?: string;
  markup?: string;
  parsedMarkup?: ParsedMarkupToken[];
}

/**
 * The localized response shape for a grammar topic's content (§6.3).
 * `title` is localized; `tense` is a technical term returned as-is.
 */
export class GrammarContentView {
  constructor(topic: GrammarTopic, resolver: LocalizedResolver) {
    this.id = topic.id!;
    this.title = resolver.resolveNullable(
      TranslatableEntityType.GrammarTopic,
      topic.id!,
      'title',
      topic.title,
    );
    this.tense = topic.tense ?? null;
    this.blocks = (topic.Blocks ?? []).map((b) => new GrammarBlockView(b, resolver));
  }

  id: string;
  title: LocalizedField | null;
  tense: string | null;
  blocks: GrammarBlockView[];
}
