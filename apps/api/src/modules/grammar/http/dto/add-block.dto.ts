import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  ValidateIf,
} from 'class-validator';
import { GrammarBlockType, GrammarTextRole } from '../../structs/block-type.enum';
import { IAddBlockParams } from '../../structs/block-input.interface';

/**
 * Body for `POST /grammar-topic/block/:GrammarTopicId`. `blockType` selects
 * which payload fields are required:
 *   - text    → textRole + text
 *   - pattern → form + markup
 */
export class AddBlockDto {
  @IsEnum(GrammarBlockType)
  blockType: GrammarBlockType;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;

  // text payload
  @ValidateIf((o: AddBlockDto) => o.blockType === GrammarBlockType.Text)
  @IsEnum(GrammarTextRole)
  textRole?: string;

  @ValidateIf((o: AddBlockDto) => o.blockType === GrammarBlockType.Text)
  @IsString()
  @IsNotEmpty()
  text?: string;

  // pattern payload
  @ValidateIf((o: AddBlockDto) => o.blockType === GrammarBlockType.Pattern)
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  form?: string;

  @ValidateIf((o: AddBlockDto) => o.blockType === GrammarBlockType.Pattern)
  @IsString()
  @IsNotEmpty()
  markup?: string;

  toParams(): IAddBlockParams {
    if (this.blockType === GrammarBlockType.Text) {
      return {
        blockType: 'text',
        textRole: this.textRole!,
        text: this.text!,
        order: this.order,
      };
    }
    return {
      blockType: 'pattern',
      form: this.form!,
      markup: this.markup!,
      order: this.order,
    };
  }
}
