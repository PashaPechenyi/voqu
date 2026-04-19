import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { CourseService } from '../../services/course.service';
import { CourseListResponseDto } from '../dto/course-list-response.dto';
import { CreateCourseDto } from '../dto/create-course.dto';
import { CreateCourseResponseDto } from '../dto/create-course-response.dto';
import { ListCoursesQueryDto } from '../dto/list-courses-query.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { UpdateCourseResponseDto } from '../dto/update-course-response.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  async list(@Query() query: ListCoursesQueryDto): Promise<CourseListResponseDto> {
    const paginatedList = await this.courseService.listCourses(query);
    return new CourseListResponseDto(paginatedList);
  }

  @Post()
  async create(@Body() body: CreateCourseDto): Promise<CreateCourseResponseDto> {
    const course = await this.courseService.createCourse(body);
    return new CreateCourseResponseDto(course.id!);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateCourseDto,
  ): Promise<UpdateCourseResponseDto> {
    const course = await this.courseService.updateCourse(id, body);
    return new UpdateCourseResponseDto(course);
  }
}
