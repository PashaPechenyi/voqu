import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseSecuredEntity } from './base-secured.entity';
import { WordlistEntry } from './wordlist-entry.entity';

@Entity('WordlistEntryCollocation')
export class WordlistEntryCollocation extends BaseSecuredEntity {
  constructor(data: Partial<WordlistEntryCollocation> = {}) {
    super();
    Object.assign(this, data);
  }

  @Column({ length: 255 })
  expression?: string;

  @Column({ type: 'text', nullable: true })
  explanation?: string | null;

  @Column({ default: 0 })
  order?: number;

  // Relations
  @ManyToOne(() => WordlistEntry, (entry) => entry.Collocations)
  @JoinColumn({ name: 'WordlistEntryId' })
  WordlistEntry?: WordlistEntry;

  @Column({ name: 'WordlistEntryId' })
  WordlistEntryId?: string;
}
