import { TableHead as TTableHead } from "@/types";
import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";

type Props = {
  headLabel: TTableHead[];
};

export default function OrderTableListHead({ headLabel }: Props) {
  return (
    <TableHead>
      <TableRow>
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
