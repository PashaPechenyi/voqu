import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { GrammarTopic } from '../../../../database/entities/grammar-topic.entity';
import { LocalizedResolver } from '../../../localization/services/localized-resolver';
import { TranslatableEntityType } from '../../../localization/structs/translatable-entity-type.enum';
import {
  ILoadedContent,
  IKindHandler,
  ISegmentContentContext,
} from '../../../lesson-segment/structs/kind-handler.interface';
import { validateContent } from '../../../lesson-segment/structs/validate-content.helper';
import { BlockOrchestratorService } from '../../services/block-orchestrator.service';
import { HtmlSanitizerService } from '../../services/html-sanitizer.service';
import { SegmentKindCode } from '../../../segment-catalog/structs/segment-kind.enum';
import { GrammarTopicRepository } from '../../repositories/grammar-topic.repository';
import { CreateGrammarContentDto } from './http/dto/create-grammar-content.dto';
import { GrammarContentView, collectGrammarRefs } from './structs/grammar-content.constructor';

@Injectable()
export class TopicHandler implements IKindHandler {
  readonly code = SegmentKindCode.Topic;

  constructor(
    private readonly grammarTopicRepository: GrammarTopicRepository,
    private readonly blockOrchestrator: BlockOrchestratorService,
    private readonly htmlSanitizer: HtmlSanitizerService,
  ) {}

  /**
   * Inserts the topic (title/tense both optional — a topic can start empty)
   * and any initial ordered blocks inside the caller's transaction. The
   * orchestrator sanitizes/parses each block's source payload; this handler
   * writes translations for the topic title and each text block's text, both
   * sanitized to the same HTML allowlist as the source.
   */
  async createContent(
    input: unknown,
    manager: EntityManager,
    ctx: ISegmentContentContext,
  ): Promise<string> {
    const content = validateContent(CreateGrammarContentDto, input ?? {});

    const topic = await manager.save(
      manager.create(GrammarTopic, {
        title: content.title?.value ?? null,
        tense: content.tense ?? null,
      }),
    );
    await ctx.writeTranslation(
      TranslatableEntityType.GrammarTopic,
      topic.id!,
      'title',
      content.title?.translation,
    );

    const blocks = content.blocks ?? [];
    for (let index = 0; index < blocks.length; index++) {
      const blockInput = blocks[index];
      const order = blockInput.order ?? index;

      if (blockInput.blockType === 'text') {
        // Pass the source value to the orchestrator (it sanitizes + inserts);
        // sanitize the translation the same way before writing its slot.
        const block = await this.blockOrchestrator.addBlock(
          topic.id!,
          {
            blockType: 'text',
            textRole: blockInput.textRole,
            text: blockInput.text.value,
          },
          order,
          manager,
        );
        await ctx.writeTranslation(
          TranslatableEntityType.GrammarBlockText,
          block.id!,
          'text',
          blockInput.text.translation
            ? this.htmlSanitizer.sanitize(blockInput.text.translation)
            : undefined,
        );
      } else {
        await this.blockOrchestrator.addBlock(
          topic.id!,
          {
            blockType: 'pattern',
            form: blockInput.form,
            markup: blockInput.markup,
          },
          order,
          manager,
        );
      }
    }

    return topic.id!;
  }

  async loadContent(contentRowId: string): Promise<ILoadedContent> {
    const topic = await this.grammarTopicRepository.findFullById(contentRowId);
    return {
      data: topic,
      refs: topic ? collectGrammarRefs(topic) : [],
    };
  }

  serializeContent(loaded: ILoadedContent, resolver: LocalizedResolver): unknown {
    const topic = loaded.data as GrammarTopic | null;
    if (!topic) {
      return null;
    }
    return { grammarTopic: new GrammarContentView(topic, resolver) };
  }

  async deleteContent(contentRowId: string, manager: EntityManager): Promise<void> {
    // Blocks → payload rows cascade at the DB level.
    await manager.delete(GrammarTopic, { id: contentRowId });
  }
}
