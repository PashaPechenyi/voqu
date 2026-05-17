import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export type Column<TRow extends Record<string, unknown>> = {
  key: keyof TRow;
  name: string;
  valueGetter?: (row: TRow) => unknown;
  renderCell?: (row: TRow, value: unknown) => React.ReactNode;
};

type TableProps<TRow extends Record<string, unknown>> = {
  rows: TRow[];
  columns: Column<TRow>[];
  rowsId: (row: TRow) => string;
};

const Table = <TRow extends Record<string, unknown>>({
  rows,
  columns,
  rowsId,
}: TableProps<TRow>) => {
  return (
    <TableContainer component={Paper}>
      <MuiTable sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={String(col.key)} align="right">
                {col.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={rowsId(row)} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              {columns.map(({ valueGetter, key, renderCell }) => (
                <TableCell key={String(key)} align="right">
                  {renderCell
                    ? renderCell(row, valueGetter ? valueGetter(row) : row[key])
                    : ((valueGetter ? valueGetter(row) : row[key]) as React.ReactNode)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export default Table;
