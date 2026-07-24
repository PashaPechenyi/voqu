import { IsOptional, IsString, MaxLength } from 'class-validator';
import { IUpdateWordlistParams } from '../../services/wordlist.service';

export class UpdateWordlistDto implements IUpdateWordlistParams {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  title?: string;

  @IsOptional()
  @IsString()
  description?: string | null;
}
