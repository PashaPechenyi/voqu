import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { BaseResponseDto } from 'src/common/http/dto/base-response.dto';
import { LessonService } from '../../services/lesson.service';
import { CreateLessonDto } from '../dto/create-lesson.dto';
import { CreateLessonResponseDto } from '../dto/create-lesson-response.dto';
import { LessonListResponseDto } from '../dto/lesson-list-response.dto';
import { ListLessonsQueryDto } from '../dto/list-lessons-query.dto';
import { ReorderLessonsDto } from '../dto/reorder-lessons.dto';
import { UpdateLessonStatusDto } from '../dto/update-lesson-status.dto';
import { UpdateLessonStatusResponseDto } from '../dto/update-lesson-status-response.dto';

@Controller('course/lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Get(':CourseId/list')
  async list(
    @Param('CourseId') CourseId: string,
    @Query() query: ListLessonsQueryDto,
  ): Promise<LessonListResponseDto> {
    const paginatedList = await this.lessonService.listLessons({ ...query, CourseId });
    return new LessonListResponseDto(paginatedList);
  }

  @Post(':CourseId')
  async create(
    @Param('CourseId') CourseId: string,
    @Body() body: CreateLessonDto,
  ): Promise<CreateLessonResponseDto> {
    const lesson = await this.lessonService.createLesson({ ...body, CourseId });
    return new CreateLessonResponseDto(lesson.id!);
  }

  @Patch(':CourseId/reorder')
  async reorder(
    @Param('CourseId') CourseId: string,
    @Body() body: ReorderLessonsDto,
  ): Promise<BaseResponseDto> {
    await this.lessonService.reorderLessons({ CourseId, items: body.items });
    return new BaseResponseDto();
  }

  @Patch(':LessonId/status')
  async updateStatus(
    @Param('LessonId') LessonId: string,
    @Body() body: UpdateLessonStatusDto,
  ): Promise<UpdateLessonStatusResponseDto> {
    const lesson = await this.lessonService.updateLessonStatus(LessonId, body);
    return new UpdateLessonStatusResponseDto(lesson);
  }

  @Delete(':LessonId')
  async delete(@Param('LessonId') LessonId: string): Promise<BaseResponseDto> {
    await this.lessonService.deleteLesson(LessonId);
    return new BaseResponseDto();
  }
}
