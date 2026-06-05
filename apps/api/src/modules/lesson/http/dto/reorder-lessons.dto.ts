import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsInt, IsUUID, Min, ValidateNested } from 'class-validator';
import { IReorderLessonItem } from '../../structs/reorder-lessons-params.interface';

export class ReorderLessonItemDto implements IReorderLessonItem {
  @IsUUID()
  LessonId: string;

  @IsInt()
  @Min(0)
  order: number;
}

/**
 * Body for the reorder endpoint. `CourseId` is taken from the route param,
 * not the body.
 */
export class ReorderLessonsDto {
  /**
   * New order for each lesson, e.g.
   * `{ "items": [{ "LessonId": "<uuid>", "order": 0 }, { "LessonId": "<uuid>", "order": 1 }] }`.
   */
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ReorderLessonItemDto)
  items: ReorderLessonItemDto[];
}
