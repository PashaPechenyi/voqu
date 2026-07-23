import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { ICreateEntryParams } from '../../structs/entry-input.interface';
import { PartOfSpeech } from '../../structs/part-of-speech.enum';
import { WordlistEntryType } from '../../structs/entry-type.enum';

/** Body for `POST /wordlist/entry/:WordlistId`. WordlistId from route param. */
export class CreateEntryDto implements Omit<ICreateEntryParams, 'WordlistId'> {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  lemma: string;

  @IsOptional()
  @IsEnum(WordlistEntryType)
  entryType?: string;

  @IsOptional()
  @IsEnum(PartOfSpeech)
  partOfSpeech?: string | null;

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
  @IsString()
  note?: string | null;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}
