import { Entity, Column, OneToMany } from 'typeorm';
import { BaseSecuredEntity } from './base-secured.entity';
import { GrammarBlock } from './grammar-block.entity';

/**
 * Content row for a `topic` segment. Carries the two fixed topic-level
 * attributes (title, tense); everything else lives in ordered GrammarBlock
 * children.
 */
@Entity('GrammarTopic')
export class GrammarTopic extends BaseSecuredEntity {
  constructor(data: Partial<GrammarTopic> = {}) {
    super();
    Object.assign(this, data);
  }

  @Column({ type: 'varchar', length: 255, nullable: true })
  title?: string | null;

  @Column({ type: 'varchar', length: 64, nullable: true })
  tense?: string | null;

  // Relations
  @OneToMany(() => GrammarBlock, (block) => block.GrammarTopic)
  Blocks?: GrammarBlock[];
}
