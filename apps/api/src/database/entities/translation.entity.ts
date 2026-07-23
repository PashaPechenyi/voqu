import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseSecuredEntity } from './base-secured.entity';
import { Language } from './language.entity';

@Entity('Translation')
export class Translation extends BaseSecuredEntity {
  constructor(data: Partial<Translation> = {}) {
    super();
    Object.assign(this, data);
  }

  @Column({ length: 64 })
  entityType?: string;

  @Column({ name: 'EntityId' })
  EntityId?: string;

  @Column({ length: 64 })
  field?: string;

  @Column({ name: 'languageCode', length: 10 })
  languageCode?: string;

  @Column({ type: 'text' })
  value?: string;

  @Column({ type: 'int', default: 1 })
  version?: number;

  // Relations
  @ManyToOne(() => Language)
  @JoinColumn({ name: 'languageCode', referencedColumnName: 'code' })
  Language?: Language;
}
