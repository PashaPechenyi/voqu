import { ReactNode } from 'react';

export type TableColumnSettings<TRow> = {
  key: keyof TRow;
  columnName: string;
  columnSize?: 'medium' | 'small';
  valueGetter?: (row: TRow) => any;
  renderCell?: (value: any, row: TRow) => ReactNode;
};
