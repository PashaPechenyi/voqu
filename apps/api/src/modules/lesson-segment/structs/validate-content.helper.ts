import { BadRequestException } from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { ValidationError, validateSync } from 'class-validator';

export interface IContentViolation {
  /** Dotted/indexed path from the content root, e.g. `entries[2].examples[0].text.value`. */
  path: string;
  /** Human-readable messages for every failed constraint on that path. */
  messages: string[];
  /** The value that was rejected, so the client can see what it actually sent. */
  value?: unknown;
}

/**
 * Flattens class-validator's error tree into one entry per offending leaf. A
 * top-level `entries` error with children carries no constraints of its own —
 * without this the client only learns "entries is invalid", never which entry
 * or which field of it.
 */
function flattenErrors(errors: ValidationError[], parentPath = ''): IContentViolation[] {
  const violations: IContentViolation[] = [];

  for (const error of errors) {
    // Array items surface as children whose `property` is the numeric index.
    const path = /^\d+$/.test(error.property)
      ? `${parentPath}[${error.property}]`
      : parentPath
        ? `${parentPath}.${error.property}`
        : error.property;

    const messages = Object.values(error.constraints ?? {});
    if (messages.length) {
      violations.push({ path, messages, value: error.value });
    }

    if (error.children?.length) {
      violations.push(...flattenErrors(error.children, path));
    }
  }

  return violations;
}

/**
 * Validates a segment's opaque `content` payload against a template-specific
 * DTO. `CreateSegmentDto.content` is typed `unknown` (its shape varies per
 * kind), so the global ValidationPipe can't check it — each handler runs this
 * against its own DTO at the start of `createContent`. Throws 400 on any
 * violation, mirroring the pipe's behavior.
 *
 * `label` names the content being validated (usually the segment kind, e.g.
 * `wordlist`) so the message points at the failing part of a mixed request.
 */
export function validateContent<T extends object>(
  dto: ClassConstructor<T>,
  content: unknown,
  label?: string,
): T {
  const subject = label ?? dto.name;

  if (content === null || typeof content !== 'object' || Array.isArray(content)) {
    throw new BadRequestException({
      message: `Invalid ${subject} content: expected an object, received ${describeType(content)}`,
      violations: [
        {
          path: 'content',
          messages: [`content must be an object, received ${describeType(content)}`],
          value: content,
        },
      ],
    });
  }

  const instance = plainToInstance(dto, content, { enableImplicitConversion: false });
  const errors = validateSync(instance as object, {
    whitelist: true,
    forbidNonWhitelisted: true,
  });

  if (errors.length) {
    const violations = flattenErrors(errors);
    throw new BadRequestException({
      message: `Invalid ${subject} content: ${violations
        .map((v) => `${v.path} — ${v.messages.join('; ')}`)
        .join(' | ')}`,
      violations,
    });
  }

  return instance;
}

function describeType(value: unknown): string {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'an array';
  return typeof value;
}
