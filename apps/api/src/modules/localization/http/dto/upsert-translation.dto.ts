import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';
import { IUpsertTranslationParams } from '../../structs/upsert-translation-params.interface';

export class UpsertTranslationDto implements IUpsertTranslationParams {
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  entityType: string;

  @IsUUID()
  EntityId: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  field: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  languageCode: string;

  @IsString()
  @IsNotEmpty()
  value: string;
}
