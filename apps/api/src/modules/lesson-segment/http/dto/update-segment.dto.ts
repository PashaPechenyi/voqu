import { IsInt, IsNotEmpty, IsObject, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { IUpdateSegmentParams } from '../../structs/update-segment-params.interface';

/**
 * Body for `PUT /lesson/segment/:SegmentId` (full replace). Same shape as
 * `CreateSegmentDto` minus `SegmentKindKey` — the kind is fixed by the existing
 * segment and cannot change on edit. `content` is validated by the handler (its
 * shape varies per kind). `lang` comes from `?lang=`.
 */
export class UpdateSegmentDto implements Omit<IUpdateSegmentParams, 'lang'> {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  title?: string | null;

  @IsOptional()
  @IsString()
  description?: string | null;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;

  @IsObject()
  @IsNotEmpty()
  content: unknown;
}
