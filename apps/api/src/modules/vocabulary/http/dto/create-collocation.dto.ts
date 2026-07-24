import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { ICreateCollocationParams } from '../../structs/entry-input.interface';

export class CreateCollocationDto implements ICreateCollocationParams {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  expression: string;

  @IsOptional()
  @IsString()
  explanation?: string | null;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}
