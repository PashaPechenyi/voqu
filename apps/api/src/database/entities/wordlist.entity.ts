import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseSecuredEntity } from './base-secured.entity';
import { User } from './user.entity';
import { WordlistEntry } from './wordlist-entry.entity';

/**
 * Content row for a `wordlist` segment, OR a user's personal
 * saved-words list. `OwnerUserId` is NULL for lesson wordlists (admin-created,
 * attached to a LessonSegment) and non-NULL for user-owned lists.
 */
@Entity('Wordlist')
export class Wordlist extends BaseSecuredEntity {
  constructor(data: Partial<Wordlist> = {}) {
    super();
    Object.assign(this, data);
  }

  @Column({ length: 255 })
  title?: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  // Relations
  @ManyToOne(() => User)
  @JoinColumn({ name: 'OwnerUserId' })
  OwnerUser?: User | null;

  @Column({ name: 'OwnerUserId', type: 'uuid', nullable: true })
  OwnerUserId?: string | null;

  @OneToMany(() => WordlistEntry, (entry) => entry.Wordlist)
  Entries?: WordlistEntry[];
}
