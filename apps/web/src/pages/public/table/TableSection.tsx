import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { ReactNode } from 'react';
type Settings<TRow> = {
  key: keyof TRow;
  columnName: string;
  columnSize?: 'medium' | 'small';
  valueGetter?: (row: TRow) => any;
  renderCell?: (value: any, row: TRow) => ReactNode;
};

type TableSectionProps<TRow> = {
  data: TRow[];
  settings: Settings<TRow>[];
  getRowId: (row: TRow) => string | number;
};

export default function TableSection<TRow>({ data, settings, getRowId }: TableSectionProps<TRow>) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {settings.map((value) => (
              <TableCell align="center" key={value.key as string}>
                {value.columnName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={getRowId(row)}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {settings.map((item) => {
                const value = item.valueGetter ? item.valueGetter(row) : row[item.key];
                return (
                  <TableCell key={item.key as string} align="center">
                    {item.renderCell ? item.renderCell(value, row) : value}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
