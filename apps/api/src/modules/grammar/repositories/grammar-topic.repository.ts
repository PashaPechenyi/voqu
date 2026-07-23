import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { GrammarTopic } from '../../../database/entities/grammar-topic.entity';
import { BaseRepository } from '../../../database/repositories/base.repository';

@Injectable()
export class GrammarTopicRepository extends BaseRepository<GrammarTopic> {
  constructor(dataSource: DataSource) {
    super(dataSource, GrammarTopic);
  }

  /**
   * Loads a topic with all blocks joined left to both payload tables, ordered.
   * Each block matches exactly one payload per its blockType. This is the
   * single content query for a grammar segment.
   */
  async findFullById(id: string): Promise<GrammarTopic | null> {
    return this.createQueryBuilder('GrammarTopic')
      .leftJoinAndSelect('GrammarTopic.Blocks', 'Block')
      .leftJoinAndSelect('Block.Text', 'Text')
      .leftJoinAndSelect('Block.Pattern', 'Pattern')
      .where('GrammarTopic.id = :id', { id })
      .orderBy('Block.order', 'ASC')
      .getOne();
  }
}
