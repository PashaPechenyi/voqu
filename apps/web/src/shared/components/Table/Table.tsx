import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { TableColumnSettings } from './Table.type';

type TableProps<TRow> = {
  rows: TRow[];
  columns: TableColumnSettings<TRow>[];
  getRowId: (row: TRow) => string | number;
};

function SharedTable<TRow>({ rows, columns, getRowId }: TableProps<TRow>) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((value) => (
              <TableCell align="center" key={value.key as string} size={value.columnSize}>
                {value.columnName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={getRowId(row)}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {columns.map((item) => {
                const value = item.valueGetter ? item.valueGetter(row) : row[item.key];
                return (
                  <TableCell key={item.key as string} align="center" size={item.columnSize}>
                    {item.renderCell ? item.renderCell(value, row) : (value as React.ReactNode)}
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

export default SharedTable;
