import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TranslationService } from '../../../localization/services/translation.service';
import { WordlistService } from '../../services/wordlist.service';
import { WordlistEntryService } from '../../services/wordlist-entry.service';
import {
  WordlistContentView,
  collectWordlistRefs,
} from '../../templates/wordlist/structs/wordlist-content.constructor';
import { CreateEntryDto } from '../dto/create-entry.dto';
import { CreateIdResponseDto } from '../dto/create-id-response.dto';
import { UpdateWordlistDto } from '../dto/update-wordlist.dto';
import { WordlistResponseDto } from '../dto/wordlist-response.dto';

@Controller('wordlist')
export class WordlistController {
  constructor(
    private readonly wordlistService: WordlistService,
    private readonly wordlistEntryService: WordlistEntryService,
    private readonly translationService: TranslationService,
  ) {}

  @Get(':WordlistId')
  async get(
    @Param('WordlistId') WordlistId: string,
    @Query('lang') lang?: string,
  ): Promise<WordlistResponseDto> {
    const wordlist = await this.wordlistService.getFullOrFail(WordlistId);
    const resolver = await this.translationService.buildResolver(
      collectWordlistRefs(wordlist),
      lang,
    );
    return new WordlistResponseDto(new WordlistContentView(wordlist, resolver));
  }

  @Patch(':WordlistId')
  async update(
    @Param('WordlistId') WordlistId: string,
    @Body() body: UpdateWordlistDto,
  ): Promise<CreateIdResponseDto> {
    const wordlist = await this.wordlistService.update(WordlistId, body);
    return new CreateIdResponseDto(wordlist.id!);
  }

  @Post('entry/:WordlistId')
  async addEntry(
    @Param('WordlistId') WordlistId: string,
    @Body() body: CreateEntryDto,
  ): Promise<CreateIdResponseDto> {
    const entry = await this.wordlistEntryService.createEntry({ ...body, WordlistId });
    return new CreateIdResponseDto(entry.id!);
  }
}
