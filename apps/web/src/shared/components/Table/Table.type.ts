import { ReactNode } from 'react';

export type TableColumnSettings<TRow, TValue = unknown> = {
  key: keyof TRow;
  columnName: string;
  columnSize?: 'medium' | 'small';
  valueGetter?: (row: TRow) => TValue;
  renderCell?: (value: TValue, row: TRow) => ReactNode;
};
