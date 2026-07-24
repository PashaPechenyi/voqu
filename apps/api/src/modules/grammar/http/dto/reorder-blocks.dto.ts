import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsInt, IsUUID, Min, ValidateNested } from 'class-validator';
import { IReorderBlockItem } from '../../structs/block-input.interface';

export class ReorderBlockItemDto implements IReorderBlockItem {
  @IsUUID()
  BlockId: string;

  @IsInt()
  @Min(0)
  order: number;
}

export class ReorderBlocksDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ReorderBlockItemDto)
  items: ReorderBlockItemDto[];
}
