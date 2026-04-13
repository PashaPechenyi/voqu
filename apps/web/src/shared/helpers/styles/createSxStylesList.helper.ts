import { TSxItem } from '@/theme/theme.type';

export const createSxStylesList = <TKeys extends string>(
  sx: Record<TKeys, TSxItem>,
): Record<TKeys, TSxItem> => sx;
