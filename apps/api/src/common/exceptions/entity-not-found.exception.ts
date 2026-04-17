import { NotFoundException } from '@nestjs/common';
import { EntityTarget } from 'typeorm';

export interface EntityNotFoundContext {
  entity: EntityTarget<any> | any;
  ctx?: unknown;
}

export class EntityNotFoundException extends NotFoundException {
  constructor({ entity, ctx }: EntityNotFoundContext) {
    const name = typeof entity === 'function' ? entity.name : String(entity);
    super({ message: `${name} not found`, entity: name, ctx });
  }
}
