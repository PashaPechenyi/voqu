// TODO: This file is duplicated in `theme/helpers.ts` (`createSxStylesList`). Delete one copy and let the whole codebase import from a single path. Most usages in the project already import this one, so delete the `theme/helpers.ts` copy.
import { TSxItem } from '@/theme/theme.type';

export const createSxStylesList = <TKeys extends string>(
  sx: Record<TKeys, TSxItem>,
): Record<TKeys, TSxItem> => sx;
