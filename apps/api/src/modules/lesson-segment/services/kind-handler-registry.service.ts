import { Injectable, NotFoundException } from '@nestjs/common';
import { IKindHandler } from '../structs/kind-handler.interface';

/**
 * Runtime registry mapping `SegmentKind.key` → handler. Template modules
 * (vocabulary, grammar, …) call `register()` in their module `onModuleInit`
 * so the set of live handlers matches the seeded catalog. LessonSegmentService
 * looks handlers up by the segment's kind code.
 */
@Injectable()
export class KindHandlerRegistryService {
  private readonly handlers = new Map<string, IKindHandler>();

  register(handler: IKindHandler): void {
    this.handlers.set(handler.code, handler);
  }

  get(code: string): IKindHandler {
    const handler = this.handlers.get(code);
    if (!handler) {
      throw new NotFoundException(`No segment kind handler registered for code "${code}"`);
    }
    return handler;
  }

  has(code: string): boolean {
    return this.handlers.has(code);
  }
}
