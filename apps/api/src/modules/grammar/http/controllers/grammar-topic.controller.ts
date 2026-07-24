import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TranslationService } from '../../../localization/services/translation.service';
import { GrammarTopicService } from '../../services/grammar-topic.service';
import {
  GrammarContentView,
  collectGrammarRefs,
} from '../../templates/topic/structs/grammar-content.constructor';
import { AddBlockDto } from '../dto/add-block.dto';
import { CreateIdResponseDto } from '../dto/create-id-response.dto';
import { GrammarTopicResponseDto } from '../dto/grammar-topic-response.dto';
import { UpdateTopicDto } from '../dto/update-topic.dto';

@Controller('grammar-topic')
export class GrammarTopicController {
  constructor(
    private readonly grammarTopicService: GrammarTopicService,
    private readonly translationService: TranslationService,
  ) {}

  @Get(':GrammarTopicId')
  async get(
    @Param('GrammarTopicId') GrammarTopicId: string,
    @Query('lang') lang?: string,
  ): Promise<GrammarTopicResponseDto> {
    const topic = await this.grammarTopicService.getFullOrFail(GrammarTopicId);
    const resolver = await this.translationService.buildResolver(collectGrammarRefs(topic), lang);
    return new GrammarTopicResponseDto(new GrammarContentView(topic, resolver));
  }

  @Patch(':GrammarTopicId')
  async update(
    @Param('GrammarTopicId') GrammarTopicId: string,
    @Body() body: UpdateTopicDto,
  ): Promise<CreateIdResponseDto> {
    const topic = await this.grammarTopicService.updateTopic(GrammarTopicId, body);
    return new CreateIdResponseDto(topic.id!);
  }

  @Post('block/:GrammarTopicId')
  async addBlock(
    @Param('GrammarTopicId') GrammarTopicId: string,
    @Body() body: AddBlockDto,
  ): Promise<CreateIdResponseDto> {
    const block = await this.grammarTopicService.addBlock(GrammarTopicId, body.toParams());
    return new CreateIdResponseDto(block.id!);
  }
}
