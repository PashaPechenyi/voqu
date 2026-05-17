import { SxStyleProps } from '@/shared/types/sx.type';

type SxArray = Extract<SxStyleProps, ReadonlyArray<unknown>>;

export const combineSxStyles = (
  ...args: (SxStyleProps | null | undefined | false)[]
): SxStyleProps => {
  return args.reduce((sx: SxArray, item) => {
    if (!item) return sx;

    if (Array.isArray(item)) return [...sx, ...item];
    return [...sx, item];
  }, []);
};
