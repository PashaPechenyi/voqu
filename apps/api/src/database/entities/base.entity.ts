import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id?: string;

  @Column({ type: 'timestamptz' })
  createdAt?: string;

  @Column({ type: 'timestamptz' })
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt?: string;

  public static getName(): string {
    return this.name;
  }
}
