import {
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";

import { useOrders } from "@/hooks";
import type { TableHead as TTableHead } from "@/types";

type Props = {
  headLabel: TTableHead[];
  pageSize: number;
  total: number;
  onSelectAllClick: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
};

export default function OrderTableListHead({
  headLabel,
  pageSize,
  total,
  onSelectAllClick,
}: Props) {
  const {
    state: { numSelected },
  } = useOrders();

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" colSpan={1}>
          <Checkbox
            color="primary"
            indeterminate={
              numSelected > 0 && numSelected !== total && numSelected < pageSize
            }
            checked={
              pageSize > 0 &&
              (numSelected === pageSize || numSelected === total)
            }
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
