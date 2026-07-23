import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseSecuredEntity } from './base-secured.entity';
import { SegmentType } from './segment-type.entity';

@Entity('SegmentKind')
export class SegmentKind extends BaseSecuredEntity {
  constructor(data: Partial<SegmentKind> = {}) {
    super();
    Object.assign(this, data);
  }

  @Column({ length: 64 })
  key?: string;

  @Column({ length: 64 })
  name?: string;

  @Column({ length: 64 })
  tableName?: string;

  @Column({ default: true })
  isActive?: boolean;

  // Relations
  @ManyToOne(() => SegmentType, (type) => type.SegmentKinds)
  @JoinColumn({ name: 'SegmentTypeId' })
  SegmentType?: SegmentType;

  @Column({ name: 'SegmentTypeId' })
  SegmentTypeId?: string;
}
