import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('Language')
export class Language {
  constructor(data: Partial<Language> = {}) {
    Object.assign(this, data);
  }

  @PrimaryColumn({ length: 10 })
  code?: string;

  @Column({ length: 64 })
  name?: string;

  @Column({ length: 64 })
  nativeName?: string;

  @Column({ default: true })
  isActive?: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt?: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt?: string;
}
