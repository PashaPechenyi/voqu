import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { BaseResponseDto } from '../../../../common/http/dto/base-response.dto';
import { WordlistEntryService } from '../../services/wordlist-entry.service';
import { CreateCollocationDto } from '../dto/create-collocation.dto';
import { CreateExampleDto } from '../dto/create-example.dto';
import { CreateIdResponseDto } from '../dto/create-id-response.dto';
import { UpdateEntryDto } from '../dto/update-entry.dto';

@Controller('wordlist/entry')
export class WordlistEntryController {
  constructor(private readonly wordlistEntryService: WordlistEntryService) {}

  @Patch(':EntryId')
  async update(
    @Param('EntryId') EntryId: string,
    @Body() body: UpdateEntryDto,
  ): Promise<CreateIdResponseDto> {
    const entry = await this.wordlistEntryService.updateEntry(EntryId, body);
    return new CreateIdResponseDto(entry.id!);
  }

  @Delete(':EntryId')
  async delete(@Param('EntryId') EntryId: string): Promise<BaseResponseDto> {
    await this.wordlistEntryService.deleteEntry(EntryId);
    return new BaseResponseDto();
  }

  @Post(':EntryId/example')
  async addExample(
    @Param('EntryId') EntryId: string,
    @Body() body: CreateExampleDto,
  ): Promise<CreateIdResponseDto> {
    const example = await this.wordlistEntryService.addExample(EntryId, body);
    return new CreateIdResponseDto(example.id!);
  }

  @Post(':EntryId/collocation')
  async addCollocation(
    @Param('EntryId') EntryId: string,
    @Body() body: CreateCollocationDto,
  ): Promise<CreateIdResponseDto> {
    const collocation = await this.wordlistEntryService.addCollocation(EntryId, body);
    return new CreateIdResponseDto(collocation.id!);
  }
}
