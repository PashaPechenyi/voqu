import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import {
  LocalizedInputDto,
  NullableLocalizedInputDto,
} from '../../../../../localization/http/dto/localized-input.dto';
import { WordlistEntryType } from '../../../../structs/entry-type.enum';
import { PartOfSpeech } from '../../../../structs/part-of-speech.enum';
import {
  IWordlistContentInput,
  IWordlistEntryCollocationInput,
  IWordlistEntryExampleInput,
  IWordlistEntryInput,
} from '../../structs/wordlist-content.interface';

/**
 * Validated `content` payload for creating a `wordlist` segment. Translatable
 * fields use `{ value, translation? }` (LocalizedInputDto); `value` is the
 * source column, `translation` becomes a Translation row for the request's
 * `?lang=`.
 */
export class CreateWordlistExampleDto implements IWordlistEntryExampleInput {
  @IsDefined()
  @ValidateNested()
  @Type(() => LocalizedInputDto)
  text: LocalizedInputDto;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}

export class CreateWordlistCollocationDto implements IWordlistEntryCollocationInput {
  @IsString()
  @MaxLength(255)
  expression: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => NullableLocalizedInputDto)
  explanation?: NullableLocalizedInputDto | null;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}

export class CreateWordlistEntryDto implements IWordlistEntryInput {
  @IsDefined()
  @ValidateNested()
  @Type(() => LocalizedInputDto)
  lemma: LocalizedInputDto;

  @IsOptional()
  @IsEnum(WordlistEntryType)
  entryType?: WordlistEntryType;

  @IsOptional()
  @IsEnum(PartOfSpeech)
  partOfSpeech?: PartOfSpeech | null;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  v2?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  v3?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  transcription?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(512)
  audioUrl?: string | null;

  @IsOptional()
  @ValidateNested()
  @Type(() => NullableLocalizedInputDto)
  note?: NullableLocalizedInputDto | null;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWordlistExampleDto)
  examples?: CreateWordlistExampleDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWordlistCollocationDto)
  collocations?: CreateWordlistCollocationDto[];
}

export class CreateWordlistContentDto implements IWordlistContentInput {
  @IsDefined()
  @ValidateNested()
  @Type(() => LocalizedInputDto)
  title: LocalizedInputDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => NullableLocalizedInputDto)
  description?: NullableLocalizedInputDto | null;

  @IsOptional()
  @IsUUID()
  OwnerUserId?: string | null;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWordlistEntryDto)
  entries?: CreateWordlistEntryDto[];
}
