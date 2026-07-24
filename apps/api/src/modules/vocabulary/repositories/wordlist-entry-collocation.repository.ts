import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { WordlistEntryCollocation } from '../../../database/entities/wordlist-entry-collocation.entity';
import { BaseRepository } from '../../../database/repositories/base.repository';

@Injectable()
export class WordlistEntryCollocationRepository extends BaseRepository<WordlistEntryCollocation> {
  constructor(dataSource: DataSource) {
    super(dataSource, WordlistEntryCollocation);
  }
}
