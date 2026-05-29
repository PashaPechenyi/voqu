import { IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MaxLength } from 'class-validator';
import { CourseStatus } from '../../structs/course-status.enum';
import { ICreateCourseParams } from '../../structs/create-course-params.interface';

export class CreateCourseDto implements ICreateCourseParams {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(CourseStatus)
  status?: CourseStatus;

  @Matches(/^\d+$/, { message: 'LevelId must be a positive integer id' })
  LevelId: string;
}
