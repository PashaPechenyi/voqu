import { Injectable } from '@nestjs/common';
import { Brackets, DataSource } from 'typeorm';
import { Translation } from '../../../database/entities/translation.entity';
import { BaseRepository } from '../../../database/repositories/base.repository';
import { IFindTranslationsParams } from '../structs/find-translations-params.interface';

export interface IEntityRef {
  entityType: string;
  EntityId: string;
}

@Injectable()
export class TranslationRepository extends BaseRepository<Translation> {
  constructor(dataSource: DataSource) {
    super(dataSource, Translation);
  }

  /**
   * One batched query that fetches every translation for a set of
   * `(entityType, EntityId)` pairs, restricted to the requested language
   * chain. This is the single translation round-trip per lesson read.
   */
  async findForEntities(refs: IEntityRef[], languageCodes: string[]): Promise<Translation[]> {
    if (!refs.length || !languageCodes.length) {
      return [];
    }

    const qb = this.createQueryBuilder('Translation').where(
      'Translation.languageCode IN (:...languageCodes)',
      { languageCodes },
    );

    qb.andWhere(
      new Brackets((outer) => {
        refs.forEach((ref, index) => {
          outer.orWhere(
            new Brackets((inner) => {
              inner
                .where(`Translation.entityType = :entityType_${index}`, {
                  [`entityType_${index}`]: ref.entityType,
                })
                .andWhere(`Translation.EntityId = :entityId_${index}`, {
                  [`entityId_${index}`]: ref.EntityId,
                });
            }),
          );
        });
      }),
    );

    return qb.getMany();
  }

  /**
   * Filtered list for the generic `GET /translation` admin endpoint.
   */
  async findByFilters(params: IFindTranslationsParams): Promise<Translation[]> {
    const qb = this.createQueryBuilder('Translation');

    if (params.entityType) {
      qb.andWhere('Translation.entityType = :entityType', { entityType: params.entityType });
    }
    if (params.EntityId) {
      qb.andWhere('Translation.EntityId = :EntityId', { EntityId: params.EntityId });
    }
    if (params.languageCode) {
      qb.andWhere('Translation.languageCode = :languageCode', {
        languageCode: params.languageCode,
      });
    }

    return qb
      .orderBy('Translation.entityType', 'ASC')
      .addOrderBy('Translation.field', 'ASC')
      .getMany();
  }
}
