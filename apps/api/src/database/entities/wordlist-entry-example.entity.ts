import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseSecuredEntity } from './base-secured.entity';
import { WordlistEntry } from './wordlist-entry.entity';

@Entity('WordlistEntryExample')
export class WordlistEntryExample extends BaseSecuredEntity {
  constructor(data: Partial<WordlistEntryExample> = {}) {
    super();
    Object.assign(this, data);
  }

  @Column({ type: 'text' })
  text?: string;

  @Column({ default: 0 })
  order?: number;

  // Relations
  @ManyToOne(() => WordlistEntry, (entry) => entry.Examples)
  @JoinColumn({ name: 'WordlistEntryId' })
  WordlistEntry?: WordlistEntry;

  @Column({ name: 'WordlistEntryId' })
  WordlistEntryId?: string;
}
