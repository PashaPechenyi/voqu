import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { WordlistEntry } from '../../../database/entities/wordlist-entry.entity';
import { BaseRepository } from '../../../database/repositories/base.repository';

@Injectable()
export class WordlistEntryRepository extends BaseRepository<WordlistEntry> {
  constructor(dataSource: DataSource) {
    super(dataSource, WordlistEntry);
  }

  async getMaxOrderByWordlist(WordlistId: string): Promise<number | null> {
    const result = await this.createQueryBuilder('WordlistEntry')
      .select('MAX(WordlistEntry.order)', 'max')
      .where('WordlistEntry.WordlistId = :WordlistId', { WordlistId })
      .getRawOne<{ max: string | null }>();

    return result?.max !== null && result?.max !== undefined ? Number(result.max) : null;
  }

  async findFullById(id: string): Promise<WordlistEntry | null> {
    return this.createQueryBuilder('WordlistEntry')
      .leftJoinAndSelect('WordlistEntry.Examples', 'Example')
      .leftJoinAndSelect('WordlistEntry.Collocations', 'Collocation')
      .where('WordlistEntry.id = :id', { id })
      .orderBy('Example.order', 'ASC')
      .addOrderBy('Collocation.order', 'ASC')
      .getOne();
  }
}
