import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  ValidateIf,
} from 'class-validator';
import { CourseStatus } from '../../structs/course-status.enum';
import { IUpdateCourseParams } from '../../structs/update-course-params.interface';

export class UpdateCourseDto implements IUpdateCourseParams {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name?: string;

  @IsOptional()
  @ValidateIf((_, value) => value !== null)
  @IsString()
  description?: string | null;

  @IsOptional()
  @IsEnum(CourseStatus)
  status?: CourseStatus;

  @IsOptional()
  @Matches(/^\d+$/, { message: 'LevelId must be a positive integer id' })
  LevelId?: string;
}
