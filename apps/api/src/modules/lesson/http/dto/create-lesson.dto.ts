import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';
import { LessonStatus } from '../../structs/lesson-status.enum';
import { ICreateLessonParams } from '../../structs/create-lesson-params.interface';

export class CreateLessonDto implements ICreateLessonParams {
  @IsUUID()
  @IsNotEmpty()
  CourseId: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  subtitle?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;

  @IsOptional()
  @IsEnum(LessonStatus)
  status?: LessonStatus;
}
