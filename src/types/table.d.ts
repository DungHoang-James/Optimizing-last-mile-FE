import { TableCellProps } from "@mui/material";

export type TableHead = {
  id: string;
  label: string;
  align: TableCellProps["align"];
  subHead?: TableHead[];
};
