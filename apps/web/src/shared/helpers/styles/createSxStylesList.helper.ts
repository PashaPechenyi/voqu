import { SxItem } from '@/shared/types/sx.type';

export const createSxStylesList = <TKeys extends string>(
  sx: Record<TKeys, SxItem>,
): Record<TKeys, SxItem> => sx;
