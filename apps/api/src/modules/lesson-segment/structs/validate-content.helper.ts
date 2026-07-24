import { BadRequestException } from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

/**
 * Validates a segment's opaque `content` payload against a template-specific
 * DTO. `CreateSegmentDto.content` is typed `unknown` (its shape varies per
 * kind), so the global ValidationPipe can't check it — each handler runs this
 * against its own DTO at the start of `createContent`. Throws 400 on any
 * violation, mirroring the pipe's behavior.
 */
export function validateContent<T extends object>(dto: ClassConstructor<T>, content: unknown): T {
  const instance = plainToInstance(dto, content, { enableImplicitConversion: false });
  const errors = validateSync(instance as object, {
    whitelist: true,
    forbidNonWhitelisted: true,
  });
  if (errors.length) {
    throw new BadRequestException({
      message: 'Invalid segment content',
      errors: errors.map((e) => ({ property: e.property, constraints: e.constraints })),
    });
  }
  return instance;
}
