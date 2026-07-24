import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TranslationService } from '../../services/translation.service';
import { TranslationItem } from '../../structs/translation-item.constructor';
import { ListTranslationsQueryDto } from '../dto/list-translations-query.dto';
import { TranslationListResponseDto } from '../dto/translation-list-response.dto';
import { TranslationResponseDto } from '../dto/translation-response.dto';
import { UpsertTranslationDto } from '../dto/upsert-translation.dto';

@Controller('translation')
export class TranslationController {
  constructor(private readonly translationService: TranslationService) {}

  @Get()
  async list(@Query() query: ListTranslationsQueryDto): Promise<TranslationListResponseDto> {
    const translations = await this.translationService.find(query);
    return new TranslationListResponseDto(translations.map((t) => new TranslationItem(t)));
  }

  @Post()
  async upsert(@Body() body: UpsertTranslationDto): Promise<TranslationResponseDto> {
    const translation = await this.translationService.upsert(body);
    return new TranslationResponseDto(translation);
  }
}
