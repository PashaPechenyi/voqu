import { Injectable } from '@nestjs/common';
import { EntityNotFoundException } from '../../../common/exceptions/entity-not-found.exception';
import { SegmentKind } from '../../../database/entities/segment-kind.entity';
import { SegmentKindRepository } from '../repositories/segment-kind.repository';

@Injectable()
export class SegmentCatalogService {
  constructor(private readonly segmentKindRepository: SegmentKindRepository) {}

  /** Loads a kind by its stable `key` (with its type) or throws. */
  async getKindByKeyOrFail(key: string): Promise<SegmentKind> {
    const kind = await this.segmentKindRepository.findByKeyWithType(key);
    if (!kind) {
      throw new EntityNotFoundException({ entity: SegmentKind, ctx: { key } });
    }
    return kind;
  }
}
