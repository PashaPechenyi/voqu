import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Wordlist } from '../../../database/entities/wordlist.entity';
import { BaseRepository } from '../../../database/repositories/base.repository';

@Injectable()
export class WordlistRepository extends BaseRepository<Wordlist> {
  constructor(dataSource: DataSource) {
    super(dataSource, Wordlist);
  }

  /**
   * Loads a wordlist with all entries → examples + collocations in one query,
   * fully ordered. This is the single content query for a vocabulary segment.
   */
  async findFullById(id: string): Promise<Wordlist | null> {
    return this.createQueryBuilder('Wordlist')
      .leftJoinAndSelect('Wordlist.Entries', 'Entry')
      .leftJoinAndSelect('Entry.Examples', 'Example')
      .leftJoinAndSelect('Entry.Collocations', 'Collocation')
      .where('Wordlist.id = :id', { id })
      .orderBy('Entry.order', 'ASC')
      .addOrderBy('Example.order', 'ASC')
      .addOrderBy('Collocation.order', 'ASC')
      .getOne();
  }

  async findByOwner(OwnerUserId: string): Promise<Wordlist[]> {
    return this.createQueryBuilder('Wordlist')
      .where('Wordlist.OwnerUserId = :OwnerUserId', { OwnerUserId })
      .orderBy('Wordlist.createdAt', 'ASC')
      .getMany();
  }
}
