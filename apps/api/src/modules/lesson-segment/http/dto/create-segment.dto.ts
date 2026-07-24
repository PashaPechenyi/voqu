import { IsInt, IsNotEmpty, IsObject, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { ICreateSegmentParams } from '../../structs/create-segment-params.interface';

/**
 * Body for `POST /lesson/segment/:LessonId`. `LessonId` comes from the route
 * param. `content` is the template-specific payload — validated by the
 * handler, not here (its shape varies per SegmentKind).
 */
export class CreateSegmentDto implements Omit<ICreateSegmentParams, 'LessonId'> {
  /** The SegmentKind's stable code, e.g. "wordlist" / "topic". */
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  SegmentKindKey: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;

  @IsObject()
  @IsNotEmpty()
  content: unknown;
}
