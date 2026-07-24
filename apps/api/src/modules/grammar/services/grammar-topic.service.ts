import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { EntityNotFoundException } from '../../../common/exceptions/entity-not-found.exception';
import { GrammarBlock } from '../../../database/entities/grammar-block.entity';
import { GrammarTopic } from '../../../database/entities/grammar-topic.entity';
import { GrammarBlockRepository } from '../repositories/grammar-block.repository';
import { GrammarTopicRepository } from '../repositories/grammar-topic.repository';
import {
  IAddBlockParams,
  IReorderBlocksParams,
  IUpdateBlockParams,
  IUpdateTopicParams,
} from '../structs/block-input.interface';
import { BlockOrchestratorService } from './block-orchestrator.service';

@Injectable()
export class GrammarTopicService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly grammarTopicRepository: GrammarTopicRepository,
    private readonly grammarBlockRepository: GrammarBlockRepository,
    private readonly blockOrchestrator: BlockOrchestratorService,
  ) {}

  async getFullOrFail(GrammarTopicId: string): Promise<GrammarTopic> {
    const topic = await this.grammarTopicRepository.findFullById(GrammarTopicId);
    if (!topic) {
      throw new EntityNotFoundException({ entity: GrammarTopic, ctx: { id: GrammarTopicId } });
    }
    return topic;
  }

  async updateTopic(GrammarTopicId: string, params: IUpdateTopicParams): Promise<GrammarTopic> {
    await this.grammarTopicRepository.getOneByIdOrFail(GrammarTopicId);
    return this.grammarTopicRepository.update(GrammarTopicId, params);
  }

  async addBlock(GrammarTopicId: string, params: IAddBlockParams): Promise<GrammarBlock> {
    await this.grammarTopicRepository.getOneByIdOrFail(GrammarTopicId);
    const maxOrder = await this.grammarBlockRepository.getMaxOrderByTopic(GrammarTopicId);
    const order = params.order ?? (maxOrder === null ? 0 : maxOrder + 1);
    return this.blockOrchestrator.addBlock(GrammarTopicId, params, order);
  }

  async updateBlock(BlockId: string, params: IUpdateBlockParams): Promise<void> {
    const block = await this.grammarBlockRepository.findByIdWithPayload(BlockId);
    if (!block) {
      throw new EntityNotFoundException({ entity: GrammarBlock, ctx: { id: BlockId } });
    }
    await this.blockOrchestrator.updateBlock(block, params);
  }

  async deleteBlock(BlockId: string): Promise<void> {
    await this.grammarBlockRepository.getOneByIdOrFail(BlockId);
    // Payload rows cascade at the DB level.
    await this.grammarBlockRepository.deleteWhere({ id: BlockId });
  }

  async reorderBlocks(params: IReorderBlocksParams): Promise<void> {
    const { GrammarTopicId, items } = params;

    const topicBlocks = await this.grammarBlockRepository.findIdsByTopic(GrammarTopicId);
    const topicBlockIds = new Set(topicBlocks.map((b) => b.id!));

    const requestedIds = new Set<string>();
    for (const { BlockId } of items) {
      if (!topicBlockIds.has(BlockId)) {
        throw new BadRequestException(
          `Block ${BlockId} does not belong to topic ${GrammarTopicId}`,
        );
      }
      requestedIds.add(BlockId);
    }

    // Re-index sequentially by sorted position rather than trusting the
    // client's raw `order` values — otherwise non-contiguous client orders
    // (e.g. 10, 20) overlap the appended items' indices.
    const orderedIds = [...items].sort((a, b) => a.order - b.order).map((i) => i.BlockId);
    const appendedIds = topicBlocks.filter((b) => !requestedIds.has(b.id!)).map((b) => b.id!);
    const finalOrder = [...orderedIds, ...appendedIds];

    await this.dataSource.transaction(async (manager) => {
      for (let index = 0; index < finalOrder.length; index++) {
        await manager.update(GrammarBlock, { id: finalOrder[index] }, { order: index });
      }
    });
  }
}
