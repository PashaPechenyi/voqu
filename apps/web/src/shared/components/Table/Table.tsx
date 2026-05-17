// TODO: Export name `TableSection` does not match the file name `Table.tsx` or the prop type `TableSectionProps`. Either rename the file to `TableSection.tsx`, or rename the component to `Table`. The `Section` suffix is reserved for page-local sections per the project pattern (`pages/.../sections/*.section.tsx`).
// TODO: `valueGetter: (row: TRow) => any` and `renderCell: (value: any, ...)` use `any`. Either constrain with a generic per-column value type, or use `unknown` + caller-side narrowing.
// TODO: `columnSize?: 'medium' | 'small'` is in the column-settings type but never read by the component. Either implement it (`<TableCell size={...}>`) or remove the field.
// TODO: Hardcoded `minWidth: 650` on the table — should be a prop, the table is supposed to be reusable.
// TODO: `aria-label="simple table"` is generic. Accept a `caption`/`ariaLabel` prop so each consumer can describe its data.
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { TableColumnSettings } from './Table.types';

type TableSectionProps<TRow> = {
  data: TRow[];
  settings: TableColumnSettings<TRow>[];
  getRowId: (row: TRow) => string | number;
};

function TableSection<TRow>({ data, settings, getRowId }: TableSectionProps<TRow>) {
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

export default TableSection;
