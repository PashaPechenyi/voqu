import {
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
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
  //@IsNumberString()
  @IsNotEmpty()
  LevelId?: string;
}
