import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

type Column<TRow extends Record<string, any>> = {
  key: keyof TRow;
  name: string;
  valueGetter?: (row: TRow) => any;
  renderCell?: (row: TRow, value: any) => any;
};

function Table1<TRow extends Record<string, any>>({
  rows,
  columns,
  rowsId,
}: {
  rows: TRow[];
  columns: Column<TRow>[];
  rowsId: (row: TRow) => any;
}) {
  const keys = Object.keys(Object.assign({}, ...rows));
 

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((el, ind) => (
              <TableCell key={ind} align="right">
                {el.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={rowsId(row)} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              {columns.map(({ valueGetter, key, renderCell }) => (
                <TableCell key={key as any} align="right">
                  {renderCell
                    ? renderCell(row, valueGetter ? valueGetter(row) : row[key])
                    : valueGetter
                      ? valueGetter(row)
                      : row[key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Table1;
