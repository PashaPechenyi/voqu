import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsInt, IsUUID, Min, ValidateNested } from 'class-validator';
import { IReorderSegmentItem } from '../../structs/reorder-segments-params.interface';

export class ReorderSegmentItemDto implements IReorderSegmentItem {
  @IsUUID()
  SegmentId: string;

  @IsInt()
  @Min(0)
  order: number;
}

export class ReorderSegmentsDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ReorderSegmentItemDto)
  items: ReorderSegmentItemDto[];
}
