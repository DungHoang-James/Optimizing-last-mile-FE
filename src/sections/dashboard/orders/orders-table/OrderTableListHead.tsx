import {
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";

import type { TableHead as TTableHead } from "@/types";

type Props = {
  headLabel: TTableHead[];
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function OrderTableListHead({
  headLabel,
  onSelectAllClick,
}: Props) {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" colSpan={1}>
          <Checkbox
            color="primary"
            // indeterminate={numSelected > 0 && numSelected < rowCount}
            // checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            colSpan={headCell.subHead?.length ?? 1}
          >
            <TableSortLabel hideSortIcon>{headCell.label}</TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell hidden />
        {headLabel.map((headCell) =>
          Array.isArray(headCell.subHead) && headCell.subHead?.length > 0 ? (
            headCell.subHead?.map((headSubCell) => (
              <TableCell key={headSubCell.id} align={headSubCell.align}>
                <TableSortLabel hideSortIcon>
                  {headSubCell.label}
                </TableSortLabel>
              </TableCell>
            ))
          ) : (
            <TableCell key={headCell.id} align={headCell.align} hidden />
          )
        )}
      </TableRow>
    </TableHead>
  );
}
