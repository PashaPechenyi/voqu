import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { BaseResponseDto } from 'src/common/http/dto/base-response.dto';
import { LessonService } from '../../services/lesson.service';
import { CreateLessonDto } from '../dto/create-lesson.dto';
import { CreateLessonResponseDto } from '../dto/create-lesson-response.dto';
import { LessonListResponseDto } from '../dto/lesson-list-response.dto';
import { ListLessonsQueryDto } from '../dto/list-lessons-query.dto';
import { ReorderLessonsDto } from '../dto/reorder-lessons.dto';

@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Get()
  async list(@Query() query: ListLessonsQueryDto): Promise<LessonListResponseDto> {
    const paginatedList = await this.lessonService.listLessons(query);
    return new LessonListResponseDto(paginatedList);
  }

  @Post()
  async create(@Body() body: CreateLessonDto): Promise<CreateLessonResponseDto> {
    const lesson = await this.lessonService.createLesson(body);
    return new CreateLessonResponseDto(lesson.id!);
  }

  @Patch('reorder')
  async reorder(@Body() body: ReorderLessonsDto): Promise<BaseResponseDto> {
    await this.lessonService.reorderLessons(body);
    return new BaseResponseDto();
  }
}
