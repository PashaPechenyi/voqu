import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { ICreateExampleParams } from '../../structs/entry-input.interface';

export class CreateExampleDto implements ICreateExampleParams {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}
