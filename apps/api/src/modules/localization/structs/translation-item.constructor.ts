import { Translation } from '../../../database/entities/translation.entity';

export class TranslationItem {
  constructor(data: Translation) {
    this.id = data.id!;
    this.entityType = data.entityType!;
    this.EntityId = data.EntityId!;
    this.field = data.field!;
    this.languageCode = data.languageCode!;
    this.value = data.value!;
    this.version = data.version!;
    this.createdAt = data.createdAt!;
    this.updatedAt = data.updatedAt!;
  }

  id: string;

  entityType: string;

  EntityId: string;

  field: string;

  languageCode: string;

  value: string;

  version: number;

  createdAt: string;

  updatedAt: string;
}
