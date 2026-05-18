import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CourseService } from '../../services/course.service';
import { CourseListResponseDto } from '../dto/course-list-response.dto';
import { CourseResponseDto } from '../dto/course-response.dto';
import { CreateCourseDto } from '../dto/create-course.dto';
import { CreateCourseResponseDto } from '../dto/create-course-response.dto';
import { ListCoursesQueryDto } from '../dto/list-courses-query.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { UpdateCourseResponseDto } from '../dto/update-course-response.dto';
import { BaseResponseDto } from 'src/common/http/dto/base-response.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  async list(@Query() query: ListCoursesQueryDto): Promise<CourseListResponseDto> {
    const paginatedList = await this.courseService.listCourses(query);
    return new CourseListResponseDto(paginatedList);
  }

  @Get(':CourseId')
  async getCourseDetails(@Param('CourseId') CourseId: string): Promise<CourseResponseDto> {
    const course = await this.courseService.getCourseById(CourseId);
    return new CourseResponseDto(course);
  }

  @Post()
  async create(@Body() body: CreateCourseDto): Promise<CreateCourseResponseDto> {
    const course = await this.courseService.createCourse(body);
    return new CreateCourseResponseDto(course.id!);
  }

  @Patch(':CourseId')
  async update(
    @Param('CourseId') CourseId: string,
    @Body() body: UpdateCourseDto,
  ): Promise<UpdateCourseResponseDto> {
    const course = await this.courseService.updateCourse(CourseId, body);
    return new UpdateCourseResponseDto(course);
  }

  @Delete(':CourseId')
  async delete(@Param('CourseId') CourseId: string): Promise<BaseResponseDto> {
    await this.courseService.deleteCourse(CourseId);
    return new BaseResponseDto();
  }
}
