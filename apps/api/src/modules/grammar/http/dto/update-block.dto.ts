import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { GrammarTextRole } from '../../structs/block-type.enum';
import { IUpdateBlockParams } from '../../structs/block-input.interface';

/**
 * Body for `PATCH /grammar-block/:BlockId`. The orchestrator dispatches on the
 * existing block's blockType — send only the payload fields you want changed.
 */
export class UpdateBlockDto implements IUpdateBlockParams {
  @IsOptional()
  @IsEnum(GrammarTextRole)
  textRole?: string;

  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @IsString()
  @MaxLength(64)
  form?: string;

  @IsOptional()
  @IsString()
  markup?: string;
}
