import { Type } from 'class-transformer';
import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  Min,
  ValidateNested,
} from 'class-validator';
import {
  NullableLocalizedInputDto,
  TitleLocalizedInputDto,
} from '../../../localization/http/dto/localized-input.dto';
import { IUpdateSegmentParams } from '../../structs/update-segment-params.interface';

/**
 * Body for `PUT /lesson/segment/:SegmentId` (full replace). Same shape as
 * `CreateSegmentDto` minus `SegmentKindKey` — the kind is fixed by the existing
 * segment and cannot change on edit. `content` is validated by the handler (its
 * shape varies per kind). `lang` comes from `?lang=`.
 *
 * `title` and `description` are required: a full replace must state the
 * segment's heading outright rather than inheriting whatever was there before.
 * Both are localized (`{ value, translation? }`) like every other translatable
 * field — the source string lands on the segment column, `translation` becomes
 * a Translation row in the `?lang=` language.
 */
export class UpdateSegmentDto implements Omit<IUpdateSegmentParams, 'lang'> {
  @IsDefined()
  @ValidateNested()
  @Type(() => TitleLocalizedInputDto)
  title: TitleLocalizedInputDto;

  @IsDefined()
  @ValidateNested()
  @Type(() => NullableLocalizedInputDto)
  description: NullableLocalizedInputDto;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;

  @IsObject()
  @IsNotEmpty()
  content: unknown;
}
