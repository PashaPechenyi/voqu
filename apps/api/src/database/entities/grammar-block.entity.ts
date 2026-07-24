import { Entity, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { BaseSecuredEntity } from './base-secured.entity';
import { GrammarTopic } from './grammar-topic.entity';
import { GrammarBlockText } from './grammar-block-text.entity';
import { GrammarBlockPattern } from './grammar-block-pattern.entity';

/**
 * Ordered child of a topic. `blockType` is the structural discriminator that
 * tells you which 1:1 payload table holds the data (`text` → GrammarBlockText,
 * `pattern` → GrammarBlockPattern).
 */
@Entity('GrammarBlock')
export class GrammarBlock extends BaseSecuredEntity {
  constructor(data: Partial<GrammarBlock> = {}) {
    super();
    Object.assign(this, data);
  }

  @Column({ length: 16 })
  blockType?: string;

  @Column({ default: 0 })
  order?: number;

  // Relations
  @ManyToOne(() => GrammarTopic, (topic) => topic.Blocks)
  @JoinColumn({ name: 'GrammarTopicId' })
  GrammarTopic?: GrammarTopic;

  @Column({ name: 'GrammarTopicId' })
  GrammarTopicId?: string;

  @OneToOne(() => GrammarBlockText, (text) => text.GrammarBlock)
  Text?: GrammarBlockText | null;

  @OneToOne(() => GrammarBlockPattern, (pattern) => pattern.GrammarBlock)
  Pattern?: GrammarBlockPattern | null;
}
