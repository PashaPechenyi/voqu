import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { IFindTranslationsParams } from '../../structs/find-translations-params.interface';

export class ListTranslationsQueryDto implements IFindTranslationsParams {
  @IsOptional()
  @IsString()
  @MaxLength(64)
  entityType?: string;

  @IsOptional()
  @IsUUID()
  EntityId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  languageCode?: string;
}
