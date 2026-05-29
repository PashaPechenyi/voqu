import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsInt, IsUUID, Min, ValidateNested } from 'class-validator';
import {
  IReorderLessonItem,
  IReorderLessonsParams,
} from '../../structs/reorder-lessons-params.interface';

export class ReorderLessonItemDto implements IReorderLessonItem {
  @IsUUID()
  LessonId: string;

  @IsInt()
  @Min(0)
  order: number;
}

export class ReorderLessonsDto implements IReorderLessonsParams {
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
