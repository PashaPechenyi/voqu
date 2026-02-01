import { TSxItem, TSxProps } from './types';

type TSxArray = Extract<TSxProps, ReadonlyArray<any>>;

export const createSxStylesList = <TKeys extends string>(
  sx: Record<TKeys, TSxItem>,
): Record<TKeys, TSxItem> => sx;

export const combineSxStyles = (...args: (TSxProps | null | undefined | false)[]): TSxProps => {
  return args.reduce((sx: TSxArray, item) => {
    if (!item) return sx;

    if (Array.isArray(item)) return [...sx, ...item];
    return [...sx, item];
  }, []);
};
