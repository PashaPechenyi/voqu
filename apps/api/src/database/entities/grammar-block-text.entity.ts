import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { GrammarBlock } from './grammar-block.entity';

/**
 * 1:1 payload for `text` blocks — the pk IS the FK to GrammarBlock.
 * `text` is always sanitized HTML in the source language (allowlisted tags).
 * `textRole` is the semantic label ('description' | 'example').
 */
@Entity('GrammarBlockText')
export class GrammarBlockText {
  constructor(data: Partial<GrammarBlockText> = {}) {
    Object.assign(this, data);
  }

  @PrimaryColumn({ name: 'GrammarBlockId', type: 'uuid' })
  GrammarBlockId?: string;

  @Column({ length: 32 })
  textRole?: string;

  @Column({ type: 'text' })
  text?: string;

  // Relations
  @OneToOne(() => GrammarBlock, (block) => block.Text, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'GrammarBlockId' })
  GrammarBlock?: GrammarBlock;
}
