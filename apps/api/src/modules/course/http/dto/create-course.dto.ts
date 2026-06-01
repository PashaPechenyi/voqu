import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
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

  @IsInt({ message: 'LevelId must be a positive integer id' })
  @IsPositive({ message: 'LevelId must be a positive integer id' })
  LevelId: number;
}
