// TODO: File name convention is `Table.types.ts` (plural) here, but other type files use `<name>.type.ts` (singular). Pick one and apply repo-wide. The project convention so far is singular `.type.ts`.
import { ReactNode } from 'react';

export type TableColumnSettings<TRow> = {
  key: keyof TRow;
  columnName: string;
  columnSize?: 'medium' | 'small';
  valueGetter?: (row: TRow) => any;
  renderCell?: (value: any, row: TRow) => ReactNode;
};
