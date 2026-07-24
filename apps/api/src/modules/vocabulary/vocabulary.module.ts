import { Module, OnModuleInit } from '@nestjs/common';
import { LessonSegmentModule } from '../lesson-segment/lesson-segment.module';
import { KindHandlerRegistryService } from '../lesson-segment/services/kind-handler-registry.service';
import { LocalizationModule } from '../localization/localization.module';
import { WordlistController } from './http/controllers/wordlist.controller';
import { WordlistEntryController } from './http/controllers/wordlist-entry.controller';
import { WordlistRepository } from './repositories/wordlist.repository';
import { WordlistEntryRepository } from './repositories/wordlist-entry.repository';
import { WordlistEntryExampleRepository } from './repositories/wordlist-entry-example.repository';
import { WordlistEntryCollocationRepository } from './repositories/wordlist-entry-collocation.repository';
import { WordlistService } from './services/wordlist.service';
import { WordlistEntryService } from './services/wordlist-entry.service';
import { WordlistHandler } from './templates/wordlist/wordlist.handler';

@Module({
  imports: [LessonSegmentModule, LocalizationModule],
  controllers: [WordlistController, WordlistEntryController],
  providers: [
    WordlistRepository,
    WordlistEntryRepository,
    WordlistEntryExampleRepository,
    WordlistEntryCollocationRepository,
    WordlistService,
    WordlistEntryService,
    WordlistHandler,
  ],
  exports: [WordlistHandler],
})
export class VocabularyModule implements OnModuleInit {
  constructor(
    private readonly kindHandlerRegistry: KindHandlerRegistryService,
    private readonly wordlistHandler: WordlistHandler,
  ) {}

  onModuleInit(): void {
    this.kindHandlerRegistry.register(this.wordlistHandler);
  }
}
