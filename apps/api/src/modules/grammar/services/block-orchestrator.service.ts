import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { GrammarBlock } from '../../../database/entities/grammar-block.entity';
import { GrammarBlockText } from '../../../database/entities/grammar-block-text.entity';
import { GrammarBlockPattern } from '../../../database/entities/grammar-block-pattern.entity';
import { GrammarBlockType } from '../structs/block-type.enum';
import { IAddBlockParams, IUpdateBlockParams } from '../structs/block-input.interface';
import { HtmlSanitizerService } from './html-sanitizer.service';
import { PatternParserService } from './pattern-parser.service';

/**
 * Owns the write-side lifecycle of grammar blocks. Picks the right payload
 * table based on `blockType`, sanitizes `text` on every write, and re-parses
 * `markup` → `parsedMarkup` on every pattern write. All multi-row writes run
 * inside a transaction (its own, or a caller-supplied manager).
 */
@Injectable()
export class BlockOrchestratorService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly patternParser: PatternParserService,
    private readonly htmlSanitizer: HtmlSanitizerService,
  ) {}

  /**
   * Inserts one block + its payload. If `manager` is given, runs in that
   * transaction; otherwise opens its own.
   */
  async addBlock(
    GrammarTopicId: string,
    params: IAddBlockParams,
    order: number,
    manager?: EntityManager,
  ): Promise<GrammarBlock> {
    const run = (m: EntityManager) => this.insertBlock(m, GrammarTopicId, params, order);
    return manager ? run(manager) : this.dataSource.transaction(run);
  }

  private async insertBlock(
    manager: EntityManager,
    GrammarTopicId: string,
    params: IAddBlockParams,
    order: number,
  ): Promise<GrammarBlock> {
    const block = await manager.save(
      manager.create(GrammarBlock, {
        GrammarTopicId,
        blockType: params.blockType,
        order,
      }),
    );

    // Payload PK is the FK to GrammarBlock (assigned, not generated); use
    // insert() to force an INSERT and skip save()'s existence SELECT.
    if (params.blockType === GrammarBlockType.Text) {
      await manager.insert(GrammarBlockText, {
        GrammarBlockId: block.id,
        textRole: params.textRole,
        text: this.htmlSanitizer.sanitize(params.text),
      });
    } else if (params.blockType === GrammarBlockType.Pattern) {
      await manager.insert(GrammarBlockPattern, {
        GrammarBlockId: block.id,
        form: params.form,
        markup: params.markup,
        parsedMarkup: this.patternParser.parse(params.markup),
      });
    } else {
      throw new BadRequestException(
        `Unknown blockType "${(params as { blockType: string }).blockType}"`,
      );
    }

    return block;
  }

  /**
   * Updates a block's payload. Dispatches on the block's existing blockType;
   * re-sanitizes text and re-parses markup as needed.
   */
  async updateBlock(
    block: GrammarBlock,
    params: IUpdateBlockParams,
    manager?: EntityManager,
  ): Promise<void> {
    const run = async (m: EntityManager) => {
      if (block.blockType === GrammarBlockType.Text) {
        const patch: Partial<GrammarBlockText> = {};
        if (params.textRole !== undefined) {
          patch.textRole = params.textRole;
        }
        if (params.text !== undefined) {
          patch.text = this.htmlSanitizer.sanitize(params.text);
        }
        if (Object.keys(patch).length) {
          await m.update(GrammarBlockText, { GrammarBlockId: block.id }, patch);
        }
      } else if (block.blockType === GrammarBlockType.Pattern) {
        const patch: Partial<GrammarBlockPattern> = {};
        if (params.form !== undefined) {
          patch.form = params.form;
        }
        if (params.markup !== undefined) {
          patch.markup = params.markup;
          patch.parsedMarkup = this.patternParser.parse(params.markup);
        }
        if (Object.keys(patch).length) {
          await m.update(GrammarBlockPattern, { GrammarBlockId: block.id }, patch);
        }
      }
    };

    return manager ? run(manager) : this.dataSource.transaction(run);
  }
}
