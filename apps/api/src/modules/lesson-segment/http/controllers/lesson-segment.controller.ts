import { Body, Controller, Delete, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { BaseResponseDto } from '../../../../common/http/dto/base-response.dto';
import { LessonSegmentService } from '../../services/lesson-segment.service';
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
