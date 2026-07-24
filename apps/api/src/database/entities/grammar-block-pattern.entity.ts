import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { GrammarBlock } from './grammar-block.entity';
import { ParsedMarkupToken } from '../../modules/grammar/structs/parsed-markup-token.interface';

/**
 * 1:1 payload for `pattern` blocks — the pk IS the FK to GrammarBlock.
 * `markup` is author-edited; `parsedMarkup` is regenerated from it on every
 * write (never authored directly). `form` is a free-form variant label.
 */
@Entity('GrammarBlockPattern')
export class GrammarBlockPattern {
  constructor(data: Partial<GrammarBlockPattern> = {}) {
    Object.assign(this, data);
  }

  @PrimaryColumn({ name: 'GrammarBlockId', type: 'uuid' })
  GrammarBlockId?: string;

  @Column({ length: 64 })
  form?: string;

  @Column({ type: 'text' })
  markup?: string;

  @Column({ type: 'jsonb' })
  parsedMarkup?: ParsedMarkupToken[];

  // Relations
  @OneToOne(() => GrammarBlock, (block) => block.Pattern, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'GrammarBlockId' })
  GrammarBlock?: GrammarBlock;
}
