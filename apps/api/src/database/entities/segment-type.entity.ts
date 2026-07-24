import { Entity, Column, OneToMany } from 'typeorm';
import { BaseSecuredEntity } from './base-secured.entity';
import { SegmentKind } from './segment-kind.entity';

@Entity('SegmentType')
export class SegmentType extends BaseSecuredEntity {
  constructor(data: Partial<SegmentType> = {}) {
    super();
    Object.assign(this, data);
  }

  @Column({ length: 32 })
  key?: string;

  @Column({ length: 64 })
  name?: string;

  @Column({ default: true })
  isActive?: boolean;

  // Relations
  @OneToMany(() => SegmentKind, (kind) => kind.SegmentType)
  SegmentKinds?: SegmentKind[];
}
