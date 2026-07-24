import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { GrammarBlock } from '../../../database/entities/grammar-block.entity';
import { BaseRepository } from '../../../database/repositories/base.repository';

@Injectable()
export class GrammarBlockRepository extends BaseRepository<GrammarBlock> {
  constructor(dataSource: DataSource) {
    super(dataSource, GrammarBlock);
  }

  async findByIdWithPayload(id: string): Promise<GrammarBlock | null> {
    return this.createQueryBuilder('GrammarBlock')
      .leftJoinAndSelect('GrammarBlock.Text', 'Text')
      .leftJoinAndSelect('GrammarBlock.Pattern', 'Pattern')
      .where('GrammarBlock.id = :id', { id })
      .getOne();
  }

  async getMaxOrderByTopic(GrammarTopicId: string): Promise<number | null> {
    const result = await this.createQueryBuilder('GrammarBlock')
      .select('MAX(GrammarBlock.order)', 'max')
      .where('GrammarBlock.GrammarTopicId = :GrammarTopicId', { GrammarTopicId })
      .getRawOne<{ max: string | null }>();

    return result?.max !== null && result?.max !== undefined ? Number(result.max) : null;
  }

  async findIdsByTopic(GrammarTopicId: string): Promise<Pick<GrammarBlock, 'id' | 'order'>[]> {
    return this.createQueryBuilder('GrammarBlock')
      .select(['GrammarBlock.id', 'GrammarBlock.order'])
      .where('GrammarBlock.GrammarTopicId = :GrammarTopicId', { GrammarTopicId })
      .orderBy('GrammarBlock.order', 'ASC')
      .getMany();
  }
}
