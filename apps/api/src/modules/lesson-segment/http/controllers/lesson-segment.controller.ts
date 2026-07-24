import { Body, Controller, Delete, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { BaseResponseDto } from '../../../../common/http/dto/base-response.dto';
import { SegmentKindCode } from '../../../segment-catalog/structs/segment-kind.enum';
import { LessonSegmentService } from '../../services/lesson-segment.service';
import { buildMockWordlistContent } from '../../structs/mock-wordlist-content.helper';
import { CreateSegmentDto } from '../dto/create-segment.dto';
import { CreateSegmentResponseDto } from '../dto/create-segment-response.dto';
import { ReorderSegmentsDto } from '../dto/reorder-segments.dto';
import { UpdateSegmentDto } from '../dto/update-segment.dto';

@Controller('lesson/segment')
export class LessonSegmentController {
  constructor(private readonly lessonSegmentService: LessonSegmentService) {}

  @Post(':LessonId')
  async create(
    @Param('LessonId') LessonId: string,
    @Body() body: CreateSegmentDto,
    @Query('lang') lang?: string,
  ): Promise<CreateSegmentResponseDto> {
    const segment = await this.lessonSegmentService.createSegment({ ...body, LessonId, lang });
    return new CreateSegmentResponseDto(segment.id!, segment.SegmentContentRowId!);
  }

  /**
   * TESTING ONLY. Adds a fully-populated mock `wordlist` segment to a lesson —
   * the mock payload is built server-side (see `buildMockWordlistContent`), so
   * no request body is needed. Pass `?lang=` (a course translation language) to
   * also seed translations; omit it for a source-only segment.
   */
  @Post(':LessonId/mock/wordlist')
  async createMockWordlist(
    @Param('LessonId') LessonId: string,
    @Query('lang') lang?: string,
  ): Promise<CreateSegmentResponseDto> {
    const segment = await this.lessonSegmentService.createSegment({
      LessonId,
      SegmentKindKey: SegmentKindCode.Wordlist,
      title: 'Vocabulary',
      description: 'Words and phrases for making plans',
      content: buildMockWordlistContent(Boolean(lang)),
      lang,
    });
    return new CreateSegmentResponseDto(segment.id!, segment.SegmentContentRowId!);
  }

  @Patch(':LessonId/reorder')
  async reorder(
    @Param('LessonId') LessonId: string,
    @Body() body: ReorderSegmentsDto,
  ): Promise<BaseResponseDto> {
    await this.lessonSegmentService.reorderSegments({ LessonId, items: body.items });
    return new BaseResponseDto();
  }

  @Put(':SegmentId')
  async replace(
    @Param('SegmentId') SegmentId: string,
    @Body() body: UpdateSegmentDto,
    @Query('lang') lang?: string,
  ): Promise<CreateSegmentResponseDto> {
    const segment = await this.lessonSegmentService.replaceSegment(SegmentId, { ...body, lang });
    return new CreateSegmentResponseDto(segment.id!, segment.SegmentContentRowId!);
  }

  @Delete(':SegmentId')
  async delete(@Param('SegmentId') SegmentId: string): Promise<BaseResponseDto> {
    await this.lessonSegmentService.deleteSegment(SegmentId);
    return new BaseResponseDto();
  }
}
