import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseSecuredEntity } from './base-secured.entity';
import { Wordlist } from './wordlist.entity';
import { WordlistEntryExample } from './wordlist-entry-example.entity';
import { WordlistEntryCollocation } from './wordlist-entry-collocation.entity';

/**
 * A self-contained vocabulary entry. All lexical metadata lives here directly;
 * there is no global Word table. An entry is a single word (`entryType='word'`)
 * or a multi-word phrase (`entryType='phrase'`). The source-language
 * definition is the lemma itself; translated definitions live in Translation
 * keyed by ('wordlist_entry', id, 'definition', lang).
 */
@Entity('WordlistEntry')
export class WordlistEntry extends BaseSecuredEntity {
  constructor(data: Partial<WordlistEntry> = {}) {
    super();
    Object.assign(this, data);
  }

  @Column({ length: 255 })
  lemma?: string;

  @Column({ length: 8, default: 'word' })
  entryType?: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  partOfSpeech?: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  v2?: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  v3?: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  transcription?: string | null;

  @Column({ type: 'varchar', length: 512, nullable: true })
  audioUrl?: string | null;

  @Column({ default: 0 })
  order?: number;

  @Column({ type: 'text', nullable: true })
  note?: string | null;

  // Relations
  @ManyToOne(() => Wordlist, (wordlist) => wordlist.Entries)
  @JoinColumn({ name: 'WordlistId' })
  Wordlist?: Wordlist;

  @Column({ name: 'WordlistId' })
  WordlistId?: string;

  @OneToMany(() => WordlistEntryExample, (example) => example.WordlistEntry)
  Examples?: WordlistEntryExample[];

  @OneToMany(() => WordlistEntryCollocation, (collocation) => collocation.WordlistEntry)
  Collocations?: WordlistEntryCollocation[];
}
