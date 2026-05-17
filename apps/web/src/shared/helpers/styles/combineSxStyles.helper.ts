// TODO: Also duplicated in `theme/helpers.ts`. Delete the other copy.
// TODO: This helper is exported but never used anywhere in the app. Either wire it in for combining conditional sx props, or delete it until it has a caller.
import { TSxArray, TSxProps } from '@/theme/theme.type';

export const combineSxStyles = (...args: (TSxProps | null | undefined | false)[]): TSxProps => {
  return args.reduce((sx: TSxArray, item) => {
    if (!item) return sx;

    if (Array.isArray(item)) return [...sx, ...item];
    return [...sx, item];
  }, []);
};
