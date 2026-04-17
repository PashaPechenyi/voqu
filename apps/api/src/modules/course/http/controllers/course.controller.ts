import { Body, Controller, Post } from '@nestjs/common';
import { CourseService } from '../../services/course.service';
import { CreateCourseDto } from '../dto/create-course.dto';
import { CreateCourseResponseDto } from '../dto/create-course-response.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  async create(@Body() body: CreateCourseDto): Promise<CreateCourseResponseDto> {
    const course = await this.courseService.createCourse(body);
    return new CreateCourseResponseDto(course.id!);
  }
}
