import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { BaseResponseDto } from 'src/common/http/dto/base-response.dto';
import { LessonContentService } from '../../../lesson-segment/services/lesson-content.service';
import { LessonService } from '../../services/lesson.service';
import { CreateLessonDto } from '../dto/create-lesson.dto';
import { CreateLessonResponseDto } from '../dto/create-lesson-response.dto';
import { LessonDetailsResponseDto } from '../dto/lesson-details-response.dto';
import { LessonListResponseDto } from '../dto/lesson-list-response.dto';
import { ReorderLessonsDto } from '../dto/reorder-lessons.dto';
import { UpdateLessonStatusDto } from '../dto/update-lesson-status.dto';
import { UpdateLessonStatusResponseDto } from '../dto/update-lesson-status-response.dto';

@Controller('course/lesson')
export class LessonController {
  constructor(
    private readonly lessonService: LessonService,
    private readonly lessonContentService: LessonContentService,
  ) {}

  @Get(':CourseId/list')
  async list(@Param('CourseId') CourseId: string): Promise<LessonListResponseDto> {
    const items = await this.lessonService.listLessons(CourseId);
    return new LessonListResponseDto(items);
  }

  @Get(':LessonId/details')
  async details(
    @Param('LessonId') LessonId: string,
    @Query('lang') lang?: string,
  ): Promise<LessonDetailsResponseDto> {
    // `?lang=` is a single language slug (one of the course's translation
    // languages), not a comma-separated chain.
    const {
      lesson,
      lang: requestedLang,
      sourceLanguage,
    } = await this.lessonService.resolveLessonForDetails(LessonId, lang);
    const details = await this.lessonContentService.buildLessonView(
      lesson,
      requestedLang,
      sourceLanguage,
    );
    return new LessonDetailsResponseDto(details);
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
