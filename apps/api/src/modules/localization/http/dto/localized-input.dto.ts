import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ILocalizedInput } from '../../structs/localized-input.interface';

/**
 * Write-side counterpart of the read `LocalizedField`. A translatable field in
 * a create payload carries its source-language `value` plus an optional
 * `translation` in the request's `?lang=` language. The server stores `value`
 * on the entity column and, when `translation` is present and non-empty, writes
 * one `Translation` row for it in the same transaction.
 *
 * `value` length is not capped here because callers cap it per field (a title
 * is ≤255, an example text is unbounded TEXT); subclass/annotate at the field
 * if a specific cap is needed.
 */
export class LocalizedInputDto {
  @IsString()
  @IsNotEmpty()
  value: string;

  @IsOptional()
  @IsString()
  translation?: string;
}

/**
 * Same shape but the source `value` is optional/nullable — for fields whose
 * entity column is nullable (description, note, explanation, topic title).
 */
export class NullableLocalizedInputDto {
  @IsOptional()
  @IsString()
  value?: string | null;

  @IsOptional()
  @IsString()
  translation?: string;
}

/**
 * `LocalizedInputDto` with the source `value` capped at 255 — for fields backed
 * by a varchar(255) column (segment/wordlist titles). Declared standalone
 * rather than extending `LocalizedInputDto`: overriding a decorated property in
 * a subclass drops the parent's validators, so the constraints are restated in
 * full here. The cap is on `value` only; a translation of a ≤255 source can
 * legitimately run longer.
 */
export class TitleLocalizedInputDto implements ILocalizedInput {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  value: string;

  @IsOptional()
  @IsString()
  translation?: string;
}
