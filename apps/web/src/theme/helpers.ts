import { TSxItem, TSxProps } from './types';
// import { styled } from '@mui/material/styles';

// const MyButton = styled('button', {

//   name: 'MyButton',

//   slot:"Root"
// })({
 
//   padding: '10px 20px',
//   borderRadius: '8px',
//   border: 'none',
//   cursor: 'pointer',
//   // Example using theme
//   backgroundColor: "#aa9f96",
//   color: '#fff',
//   '&:hover': {
//     backgroundColor: '#71677D',
//   },
// });

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
