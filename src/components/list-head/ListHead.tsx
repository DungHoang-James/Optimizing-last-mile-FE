import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";

type HeadLabel = {
  id: string;
  label?: string;
  alignRight?: boolean;
};

type Props = {
  headLabel: HeadLabel[];
};

export default function ListHead({ headLabel }: Props) {
  return (
    <TableHead>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignRight ? "right" : "left"}
          >
            <TableSortLabel hideSortIcon>{headCell.label}</TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
