import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import {
  LocalizedInputDto,
  NullableLocalizedInputDto,
} from '../../../../../localization/http/dto/localized-input.dto';
import { GrammarBlockType, GrammarTextRole } from '../../../../structs/block-type.enum';
import { IGrammarBlockInput, IGrammarContentInput } from '../../structs/grammar-content.interface';

/**
 * Validated `content` payload for creating a `topic` segment. Translatable
 * fields (topic `title`, text block `text`) use `{ value, translation? }`.
 * One block DTO covers both structural types; `@ValidateIf` gates the payload
 * fields per `blockType`.
 */
export class CreateGrammarBlockDto {
  @IsEnum(GrammarBlockType)
  blockType: GrammarBlockType;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;

  // text payload
  @ValidateIf((o: CreateGrammarBlockDto) => o.blockType === GrammarBlockType.Text)
  @IsEnum(GrammarTextRole)
  textRole?: string;

  @ValidateIf((o: CreateGrammarBlockDto) => o.blockType === GrammarBlockType.Text)
  @IsDefined()
  @ValidateNested()
  @Type(() => LocalizedInputDto)
  text?: LocalizedInputDto;

  // pattern payload
  @ValidateIf((o: CreateGrammarBlockDto) => o.blockType === GrammarBlockType.Pattern)
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  form?: string;

  @ValidateIf((o: CreateGrammarBlockDto) => o.blockType === GrammarBlockType.Pattern)
  @IsString()
  @IsNotEmpty()
  markup?: string;
}

export class CreateGrammarContentDto implements IGrammarContentInput {
  @IsOptional()
  @ValidateNested()
  @Type(() => NullableLocalizedInputDto)
  title?: NullableLocalizedInputDto | null;

  @IsOptional()
  @IsString()
  @MaxLength(64)
  tense?: string | null;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateGrammarBlockDto)
  blocks?: IGrammarBlockInput[];
}
