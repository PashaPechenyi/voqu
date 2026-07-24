import { IsOptional, IsString, MaxLength } from 'class-validator';
import { IUpdateTopicParams } from '../../structs/block-input.interface';

export class UpdateTopicDto implements IUpdateTopicParams {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  title?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(64)
  tense?: string | null;
}
