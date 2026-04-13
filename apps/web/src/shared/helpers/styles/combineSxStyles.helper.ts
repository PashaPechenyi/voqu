import { TSxArray, TSxProps } from '@/theme/theme.type';

export const combineSxStyles = (...args: (TSxProps | null | undefined | false)[]): TSxProps => {
  return args.reduce((sx: TSxArray, item) => {
    if (!item) return sx;

    if (Array.isArray(item)) return [...sx, ...item];
    return [...sx, item];
  }, []);
};
