import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { WordlistEntryExample } from '../../../database/entities/wordlist-entry-example.entity';
import { BaseRepository } from '../../../database/repositories/base.repository';

@Injectable()
export class WordlistEntryExampleRepository extends BaseRepository<WordlistEntryExample> {
  constructor(dataSource: DataSource) {
    super(dataSource, WordlistEntryExample);
  }
}
