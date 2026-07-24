import { Body, Controller, Delete, Param, Patch } from '@nestjs/common';
import { BaseResponseDto } from '../../../../common/http/dto/base-response.dto';
import { GrammarTopicService } from '../../services/grammar-topic.service';
import { ReorderBlocksDto } from '../dto/reorder-blocks.dto';
import { UpdateBlockDto } from '../dto/update-block.dto';

@Controller('grammar-block')
export class GrammarBlockController {
  constructor(private readonly grammarTopicService: GrammarTopicService) {}

  @Patch('reorder/:GrammarTopicId')
  async reorder(
    @Param('GrammarTopicId') GrammarTopicId: string,
    @Body() body: ReorderBlocksDto,
  ): Promise<BaseResponseDto> {
    await this.grammarTopicService.reorderBlocks({ GrammarTopicId, items: body.items });
    return new BaseResponseDto();
  }

  @Patch(':BlockId')
  async update(
    @Param('BlockId') BlockId: string,
    @Body() body: UpdateBlockDto,
  ): Promise<BaseResponseDto> {
    await this.grammarTopicService.updateBlock(BlockId, body);
    return new BaseResponseDto();
  }

  @Delete(':BlockId')
  async delete(@Param('BlockId') BlockId: string): Promise<BaseResponseDto> {
    await this.grammarTopicService.deleteBlock(BlockId);
    return new BaseResponseDto();
  }
}
