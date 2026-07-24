import { Module, OnModuleInit } from '@nestjs/common';
import { LessonSegmentModule } from '../lesson-segment/lesson-segment.module';
import { KindHandlerRegistryService } from '../lesson-segment/services/kind-handler-registry.service';
import { LocalizationModule } from '../localization/localization.module';
import { GrammarBlockController } from './http/controllers/grammar-block.controller';
import { GrammarTopicController } from './http/controllers/grammar-topic.controller';
import { GrammarBlockRepository } from './repositories/grammar-block.repository';
import { GrammarTopicRepository } from './repositories/grammar-topic.repository';
import { BlockOrchestratorService } from './services/block-orchestrator.service';
import { GrammarTopicService } from './services/grammar-topic.service';
import { HtmlSanitizerService } from './services/html-sanitizer.service';
import { PatternParserService } from './services/pattern-parser.service';
import { TopicHandler } from './templates/topic/topic.handler';

@Module({
  imports: [LessonSegmentModule, LocalizationModule],
  controllers: [GrammarTopicController, GrammarBlockController],
  providers: [
    GrammarTopicRepository,
    GrammarBlockRepository,
    PatternParserService,
    HtmlSanitizerService,
    BlockOrchestratorService,
    GrammarTopicService,
    TopicHandler,
  ],
  exports: [TopicHandler, PatternParserService],
})
export class GrammarModule implements OnModuleInit {
  constructor(
    private readonly kindHandlerRegistry: KindHandlerRegistryService,
    private readonly topicHandler: TopicHandler,
  ) {}

  onModuleInit(): void {
    this.kindHandlerRegistry.register(this.topicHandler);
  }
}
